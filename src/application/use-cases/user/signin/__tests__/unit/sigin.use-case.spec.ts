import { SignInUseCase } from '../../signin.use-case';
import { HashAdapterInterface } from '@src/shared/application/providers/hash-provider';
import { UserInMemoryRepository } from '@src/infra/repositories/user/in-memory/user-in-memory.repository';
import { BcryptHashAdapter } from '@src/infra/adapters/hash-provider/bcrypt-hash.adapter';
import { UserEntity } from '@src/domain/entities/user/user.entity';
import { UserDataBuilder } from '@src/domain/entities/user/testing/helpers/user-data-builder';
import { EmailValueObject } from '@src/domain/value-objects/email/email.value-object';
import { PasswordValueObject } from '@src/domain/value-objects/password/password.value-object';
import { BadRequestError } from '@src/shared/domain/errors/bad-request.error';
import { NotFoundError } from '@src/shared/domain/errors/not-found.error';

describe('Signin use case unit tests', () => {
  let sut: SignInUseCase;
  let userRepository: UserInMemoryRepository;
  let hashAdapter: HashAdapterInterface;

  beforeEach(() => {
    userRepository = new UserInMemoryRepository();
    hashAdapter = new BcryptHashAdapter();
    sut = new SignInUseCase(userRepository, hashAdapter);
  });

  it('Should signin user', async () => {
    const input = {
      email: 'john@example.com',
      password: 'Tests@123',
    };

    const hashedPassword = await hashAdapter.generateHash(input.password);

    const items: UserEntity[] = [
      UserEntity.create(
        UserDataBuilder({
          email: EmailValueObject.create(input.email),
          password: PasswordValueObject.create(hashedPassword),
        }),
      ),
    ];

    userRepository.items = items;

    const output = await sut.execute({
      email: input.email,
      password: input.password,
    });

    expect(output.id).toBeDefined();
    expect(output.name).toStrictEqual(items[0].name.getName());
    expect(output.email).toStrictEqual(items[0].email.getEmail());
    expect(output.createdAt).toBeInstanceOf(Date);
  });

  it('Should throw error when email not provider', async () => {
    const input = {
      email: '',
      password: '12345678',
    };

    expect(sut.execute(input)).rejects.toThrow(
      new BadRequestError('Email is required'),
    );
  });

  it('Should throw error when password not provider', async () => {
    const input = {
      email: 'test@gmail.com',
      password: '',
    };

    expect(sut.execute(input)).rejects.toThrow(
      new BadRequestError('Password is required'),
    );
  });

  it('Should throw error when user not found', async () => {
    const input = {
      email: 'test@gmail.com',
      password: '12345678',
    };

    expect(() => sut.execute(input)).rejects.toThrow(
      new NotFoundError('User not found'),
    );
  });

  it('Should throw error when hashPassword no matches', async () => {
    const hashPassword = await hashAdapter.generateHash('1234');

    const input = {
      email: EmailValueObject.create('test@gmail.com'),
      password: PasswordValueObject.create(hashPassword),
    };

    const Items = [UserEntity.create(UserDataBuilder(input))];

    userRepository.items = Items;

    expect(
      sut.execute({ email: input.email.getEmail(), password: '123' }),
    ).rejects.toThrow(new Error('Email or password is invalid'));
  });
});
