import { UserEntity } from '../entities/user/user.entity';

export interface UserRepositoryInterface {
  findByEmail(email: string): Promise<UserEntity>;
  emailExist(email: string): Promise<boolean>;
}
