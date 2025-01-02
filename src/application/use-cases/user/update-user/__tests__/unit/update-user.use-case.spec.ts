import { UpdateUserUseCase } from '../../update-user.use-case';
import { UserInMemoryRepository } from '@src/infra/repositories/user/in-memory/user-in-memory.repository';
import { UserEntity } from '@src/domain/entities/user/user.entity';
import { UserDataBuilder } from '@src/domain/entities/user/testing/helpers/user-data-builder';
import { NotFoundError } from '@src/shared/domain/errors/not-found.error';
import { BadRequestError } from '@src/shared/domain/errors/bad-request.error';

describe('UpdateUserUseCase unit tests', () => {
  let sut: UpdateUserUseCase;
  let userRepository: UserInMemoryRepository;

  beforeEach(() => {
    userRepository = new UserInMemoryRepository();
    sut = new UpdateUserUseCase(userRepository);
  });

  it('Should update a user', async () => {
    const findByIdSpy = jest.spyOn(userRepository, 'findById');
    const updateSpy = jest.spyOn(userRepository, 'update');
    const items = [UserEntity.create(UserDataBuilder({}))];

    userRepository.items = items;

    const input = {
      id: userRepository.items[0].getId(),
      name: 'New Name',
    };

    const output = await sut.execute(input);

    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(userRepository.items[0].name.getName()).toStrictEqual(input.name);
    expect(typeof output).toBe('object');
  });

  it('Should throw error when user not found by ID', async () => {
    const input = { id: 'wrong_id', name: 'test' };

    await expect(() => sut.execute(input)).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should throw error when name param not provider', async () => {
    const user = [UserEntity.create(UserDataBuilder({}))];
    userRepository.items = user;

    const input = {
      id: userRepository.items[0].getId(),
      name: '',
    };

    await expect(() => sut.execute(input)).rejects.toThrow(
      new BadRequestError('Name is required'),
    );
  });
});
