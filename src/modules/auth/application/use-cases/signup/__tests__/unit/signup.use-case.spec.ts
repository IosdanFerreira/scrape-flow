import { BcryptHashAdapter } from '@src/infra/adapters/hash-provider/bcrypt-hash.adapter';
import { HashAdapterInterface } from '@src/shared/application/interfaces/hash-provider.interface';
import { SignUpUseCase } from '../../signup.use-case';
import { UserInMemoryRepository } from '@src/infra/repositories/user/in-memory/user-in-memory.repository';

describe('SignUpUseCase unit tests', () => {
  let sut: SignUpUseCase;
  let userRepository: UserInMemoryRepository;
  let hashAdapter: HashAdapterInterface;

  beforeEach(() => {
    userRepository = new UserInMemoryRepository();
    hashAdapter = new BcryptHashAdapter();
    sut = new SignUpUseCase(userRepository, hashAdapter);
  });

  it('Should create a new user', async () => {
    const input = {
      name: 'Test Test',
      email: 'john@example.com',
      password: '12345678',
    };

    const emailExistSpy = jest.spyOn(userRepository, 'emailExist');
    const generateHashSpy = jest.spyOn(hashAdapter, 'generateHash');
    const insertSpy = jest.spyOn(userRepository, 'insert');

    const output = await sut.execute(input);

    expect(emailExistSpy).toHaveBeenCalledTimes(1);
    expect(generateHashSpy).toHaveBeenCalledTimes(1);
    expect(insertSpy).toHaveBeenCalledTimes(1);
    expect(output.id).toBeDefined();
    expect(output.name).toBe(input.name);
    expect(output.email).toBe(input.email);
  });

  it('Should throw an error when name is empty', () => {
    const input = {
      name: '',
      email: 'john@example.com',
      password: '12345678',
    };

    expect(() => sut.execute(input)).rejects.toThrow(
      new Error('Name is required'),
    );
  });

  it('Should throw an error when name is not a string', () => {
    const input = {
      name: 12345678 as any,
      email: 'john@example.com',
      password: '12345678',
    };

    expect(() => sut.execute(input)).rejects.toThrow(
      new Error('Name must be a string'),
    );
  });

  it('Should throw an error when email is empty', () => {
    const input = {
      name: 'Test Test',
      email: '',
      password: '12345678',
    };

    expect(() => sut.execute(input)).rejects.toThrow(
      new Error('Email is required'),
    );
  });

  it('Should throw an error when email is not a string', () => {
    const input = {
      name: 'Test Test',
      email: 12345678 as any,
      password: '12345678',
    };

    expect(() => sut.execute(input)).rejects.toThrow(
      new Error('Email must be a string'),
    );
  });

  it('Should throw an error when password is empty', () => {
    const input = {
      name: 'Test Test',
      email: 'john@example.com',
      password: '',
    };

    expect(() => sut.execute(input)).rejects.toThrow(
      new Error('Password is required'),
    );
  });

  it('Should throw an error when password is not a string', () => {
    const input = {
      name: 'Test',
      email: 'john@example.com',
      password: 12345678 as any,
    };

    expect(() => sut.execute(input)).rejects.toThrow(
      new Error('Password must be a string'),
    );
  });
});
