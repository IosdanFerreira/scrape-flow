import { UserInMemoryRepository } from '@src/infra/repositories/user/in-memory/user-in-memory.repository';
import { GetUserByEmailUseCase } from '../../get-user-by-email.use-case';
import { UserEntity } from '@src/domain/entities/user/user.entity';
import { UserDataBuilder } from '@src/domain/entities/user/testing/helpers/user-data-builder';
import { BadRequestError } from '@src/shared/domain/errors/bad-request.error';

describe('GetUserByEmailUseCase unit tests', () => {
  let sut: GetUserByEmailUseCase;
  let userRepository: UserInMemoryRepository;

  beforeEach(() => {
    userRepository = new UserInMemoryRepository();
    sut = new GetUserByEmailUseCase(userRepository);
  });

  it('Should get a user by email', async () => {
    const items = [UserEntity.create(UserDataBuilder({}))];

    userRepository.items = items;

    const input = {
      email: items[0].email.getEmail(),
    };

    const output = await sut.execute(input);

    expect(output.email).toBe(userRepository.items[0].email.getEmail());
  });

  it('Should throw an error when email not provided', async () => {
    const input = {
      email: null,
    };

    await expect(() => sut.execute(input)).rejects.toThrow(
      new BadRequestError('Email is required'),
    );
  });

  it('Should throw an error when email not is founded', async () => {
    const items = [UserEntity.create(UserDataBuilder({}))];

    userRepository.items = items;

    const input = {
      email: 'test@gmail.com',
    };

    await expect(() => sut.execute(input)).rejects.toThrow(
      new BadRequestError('User not found'),
    );
  });
});
