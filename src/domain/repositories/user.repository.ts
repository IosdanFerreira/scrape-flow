import { RepositoryContract } from '@src/shared/domain/repositories/repository-contract';
import { UserEntity } from '../entities/user/user.entity';

export interface UserRepositoryInterface
  extends Omit<RepositoryContract<UserEntity>, 'findAll'> {
  findByEmail(email: string): Promise<UserEntity>;
  emailExist(email: string): Promise<void>;
}
