import { User } from '@prisma/client';
import { UserEntity } from '@src/domain/entities/user/user.entity';
import { EmailValueObject } from '@src/domain/value-objects/email/email.value-object';
import { NameValueObject } from '@src/domain/value-objects/name/name.value-object';
import { PasswordValueObject } from '@src/domain/value-objects/password/password.value-object';

export class UserModelMapper {
  static toEntity(model: User) {
    const data = {
      name: NameValueObject.create(model.name),
      email: EmailValueObject.create(model.email),
      password: PasswordValueObject.create(model.password),
      createdAt: model.createdAt,
    };

    try {
      return UserEntity.create({ ...data }, model.id);
    } catch {
      throw new Error('An entity not be loaded');
    }
  }
}
