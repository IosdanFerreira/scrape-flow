import { UserEntity } from '../entities/user/user.entity';

export interface UserRepositoryInterface {
  findByEmail(email: string): Promise<UserEntity>;
  insert(user: UserEntity): Promise<void>;
  findById(id: string): Promise<UserEntity>;
  update(user: UserEntity): Promise<void>;
  delete(id: string): Promise<void>;
}
