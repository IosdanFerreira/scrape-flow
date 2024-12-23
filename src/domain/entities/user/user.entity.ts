import { EmailValueObject } from 'src/domain/value-objects/email/email.value-object';
import { PasswordValueObject } from 'src/domain/value-objects/password/password.value-object';
import { Entity } from 'src/shared/domain/entities/Entity';

type UserProps = {
  name: string;
  email: EmailValueObject;
  password: PasswordValueObject;
  createdAt: Date;
  updatedAt: Date;
};

export class UserEntity extends Entity<UserProps> {
  constructor(props: UserProps, id?: string) {
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
   * Sets the user's name.
   *
   * @param name - The name to be set for the user.
   */
  set name(name: string) {
    this.props.name = name;
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
   * Sets the user's email.
   *
   * @param email - The email to be set for the user.
   */
  set email(email: EmailValueObject) {
    this.props.email = email;
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
   * Sets the user's password.
   *
   * @param password - The password to be set for the user as a `PasswordValueObject`.
   */
  set password(password: PasswordValueObject) {
    this.props.password = password;
  }

  /**
   * Retrieves the user's creation date.
   *
   * @returns The user's creation date as a `Date`.
   */
  get createdAt(): Date {
    return this.props.createdAt;
  }

  /**
   * Retrieves the user's last update date.
   *
   * @returns The user's last update date as a `Date`.
   */
  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
