import { EmailValueObject } from 'src/domain/value-objects/email/email.value-object';
import { PasswordValueObject } from 'src/domain/value-objects/password/password.value-object';
import { Entity } from 'src/shared/domain/entities/Entity';

type UserEntityProps = {
  name: string;
  email: EmailValueObject;
  password: PasswordValueObject;
  createdAt?: Date;
  updatedAt?: Date;
};

export class UserEntity extends Entity<UserEntityProps> {
  private constructor(props: UserEntityProps, id?: string) {
    super(id, props);
  }

  /**
   * Retrieves the user's name.
   *
   * @returns The user's name as a string.
   */
  get name(): string {
    return this.props.name;
  }

  /**
   * Retrieves the user's email.
   *
   * @returns The user's email as an `EmailValueObject`.
   */
  get email(): EmailValueObject {
    return this.props.email;
  }

  /**
   * Retrieves the user's password.
   *
   * @returns The user's password as a `PasswordValueObject`.
   */
  get password(): PasswordValueObject {
    return this.props.password;
  }

  /**
   * Retrieves the user's creation date.
   *
   * @returns The user's creation date as a `Date`.
   */
  get createdAt(): Date {
    return new Date(this.props.createdAt);
  }

  /**
   * Retrieves the user's last update date.
   *
   * @returns The user's last update date as a `Date`.
   */
  get updatedAt(): Date {
    return new Date(this.props.updatedAt);
  }

  public static create(props: UserEntityProps, id?: string): UserEntity {
    return new UserEntity(props, id);
  }
}
