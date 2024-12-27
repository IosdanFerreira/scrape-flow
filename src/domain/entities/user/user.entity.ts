import { NameValueObject } from '@src/domain/value-objects/name/name.value-object';
import { EmailValueObject } from '@src/domain/value-objects/email/email.value-object';
import { PasswordValueObject } from '@src/domain/value-objects/password/password.value-object';
import { Entity } from '@src/shared/domain/entities/Entity';

type UserEntityProps = {
  name: NameValueObject;
  email: EmailValueObject;
  password: PasswordValueObject;
  createdAt?: Date;
};

export class UserEntity extends Entity<UserEntityProps> {
  private constructor(props: UserEntityProps, id?: string) {
    super(id, props);
  }

  /**
   * Creates a new instance of the UserEntity.
   *
   * @param props - The properties of the user entity.
   * @param id - The optional identifier for the user entity.
   * @returns A new instance of the UserEntity.
   */
  public static create(props: UserEntityProps, id?: string): UserEntity {
    // Create a new UserEntity with the provided properties and optional id
    // Set the createdAt property to the current date if not provided
    return new UserEntity(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
  }

  /**
   * Retrieves the user's name.
   *
   * @returns The user's name as a string.
   */
  get name(): NameValueObject {
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
}
