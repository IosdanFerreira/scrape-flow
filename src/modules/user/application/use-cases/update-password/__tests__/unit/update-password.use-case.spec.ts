import {
  UpdatePasswordInput,
  UpdatePasswordUseCase,
} from '../../update-password.use-case';

import { BadRequestError } from '@src/shared/domain/errors/bad-request.error';
import { BcryptHashAdapter } from '@src/infra/adapters/hash-provider/bcrypt-hash.adapter';
import { HashAdapterInterface } from '@src/shared/application/interfaces/hash-provider.interface';
import { SignUpUseCase } from '../../../signup/signup.use-case';
import { UserDataBuilder } from '@src/domain/entities/user/testing/helpers/user-data-builder';
import { UserEntity } from '@src/modules/user/domain/user.entity';
import { UserInMemoryRepository } from '@src/infra/repositories/user/in-memory/user-in-memory.repository';

describe('UpdatePasswordUseCase unit tests', () => {
  let sut: UpdatePasswordUseCase;
  let userRepository: UserInMemoryRepository;
  let hashAdapter: HashAdapterInterface;

  beforeEach(() => {
    userRepository = new UserInMemoryRepository();
    hashAdapter = new BcryptHashAdapter();
    sut = new UpdatePasswordUseCase(userRepository, hashAdapter);
  });

  it('Should throw error when ID is not provided', async () => {
    const items = [UserEntity.create(UserDataBuilder({}))];

    userRepository.items = items;

    const input = {
      id: '',
      newPassword: '123456789',
      oldPassword: userRepository.items[0].password.getPassword(),
    };

    await expect(() => sut.execute(input)).rejects.toThrow(
      new BadRequestError('ID is required'),
    );
  });

  it('Should throw error when new password is not provided', async () => {
    const items = [UserEntity.create(UserDataBuilder({}))];

    userRepository.items = items;

    const input = {
      id: userRepository.items[0].getId(),
      newPassword: '',
      oldPassword: userRepository.items[0].password.getPassword(),
    };

    await expect(() => sut.execute(input)).rejects.toThrow(
      new BadRequestError('New password is required'),
    );
  });

  it('Should throw error when old password is not provided', async () => {
    const items = [UserEntity.create(UserDataBuilder({}))];

    userRepository.items = items;

    const input = {
      id: userRepository.items[0].getId(),
      newPassword: '12345678',
      oldPassword: '',
    };

    await expect(() => sut.execute(input)).rejects.toThrow(
      new BadRequestError('Old password is required'),
    );
  });

  it('Should update password', async () => {
    const findByIdSpy = jest.spyOn(userRepository, 'findById');
    const compareHashSpy = jest.spyOn(hashAdapter, 'compareHash');
    const generateHashSpy = jest.spyOn(hashAdapter, 'generateHash');
    const updateSpy = jest.spyOn(userRepository, 'update');

    const signup = new SignUpUseCase(userRepository, hashAdapter);

    const input = {
      name: 'Test Test',
      email: 'john@example.com',
      password: 'old-password',
    };

    await signup.execute(input);

    const updatePasswordInput: UpdatePasswordInput = {
      id: userRepository.items[0].getId(),
      newPassword: 'new-password',
      oldPassword: input.password,
    };

    await sut.execute(updatePasswordInput);

    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(compareHashSpy).toHaveBeenCalledTimes(1);
    expect(generateHashSpy).toHaveBeenCalledTimes(2);
    expect(updateSpy).toHaveBeenCalledTimes(1);
  });
});
