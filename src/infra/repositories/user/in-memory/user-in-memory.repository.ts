import { UserEntity } from '@src/domain/entities/user/user.entity';
import { UserRepositoryInterface } from '@src/domain/repositories/user.repository';
import { NotFoundError } from '@src/shared/domain/errors/not-found.error';
import { InMemoryRepository } from '@src/shared/infra/repositories/in-memory.repository';

export class UserInMemoryRepository
  extends InMemoryRepository<UserEntity>
  implements UserRepositoryInterface
{
  async findByEmail(email: string): Promise<UserEntity> {
    const foundedUser = this.items.find(
      (user) => user.email.getEmail() === email,
    );

    if (!foundedUser) {
      throw new NotFoundError('User not found');
    }

    return foundedUser;
  }

  async emailExist(email: string): Promise<void> {
    const foundedUser = this.items.find(
      (user) => user.email.getEmail() === email,
    );

    if (foundedUser) {
      throw new Error('Email already exist');
    }
  }
}
