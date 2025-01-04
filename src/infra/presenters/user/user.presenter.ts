import { Transform } from 'class-transformer';

export class UserPresenter {
  id: string;
  name: string;
  email: string;
  @Transform(({ value }) => value.toString())
  createdAt: Date;
  @Transform(({ value }) => value.toString())
  updatedAt: Date;

  constructor(user: UserPresenter) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
