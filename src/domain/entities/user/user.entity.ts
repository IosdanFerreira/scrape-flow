import { NameValueObject } from '@src/domain/value-objects/name/name.value-object';
import { EmailValueObject } from '@src/domain/value-objects/email/email.value-object';
import { PasswordValueObject } from '@src/domain/value-objects/password/password.value-object';
import { Entity } from '@src/shared/domain/entities/Entity';
import { UserValidatorFactory } from './validators/user.entity.validator';

export type UserEntityProps = {
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
    this.validate(props);

    return new UserEntity(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
  }

  /**
   * Validates the user entity properties.
   *
   * This method uses the UserValidator to validate the given properties of the user entity.
   * It throws an error if any of the properties are invalid.
   *
   * @param props - The properties of the user entity to validate.
   * @throws {Error} If the properties are not valid.
   */
  static validate(props: UserEntityProps): void {
    // Create an instance of the UserValidator.
    const validator = UserValidatorFactory.create();

    // Validate the given user entity properties.
    validator.validate(props);
  }

  /**
   * Updates the user entity.
   *
   * @param newName - The new name to update the user entity with.
   */
  update(newName: string) {
    // Validate the new props before updating the user entity.
    UserEntity.validate({
      ...this.props,
      name: NameValueObject.create(newName),
    });

    // Update the user entity.
    this.name = NameValueObject.create(newName);
  }

  /**
   * Updates the user's password.
   *
   * @param newPassword - The new password to update the user entity with.
   * @throws {Error} If the password is invalid or not strong enough.
   */
  updatePassword(newPassword: string) {
    // Validate the new password before updating the user entity.
    UserEntity.validate({
      ...this.props,
      password: PasswordValueObject.create(newPassword),
    });

    // Update the user's password.
    this.password = PasswordValueObject.create(newPassword);
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
   * Updates the user's name.
   *
   * @param name - The new name to update the user entity with.
   */
  private set name(name: NameValueObject) {
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
   * @param password - The new password to update the user entity with.
   */
  private set password(password: PasswordValueObject) {
    this.props.password = password;
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
   * Converts the user entity to a JSON representation.
   *
   * @returns An object containing the user entity's id, name, email, password, and creation date.
   */
  toJSON() {
    return {
      id: this.getId(),
      name: this.name.getName(),
      email: this.email.getEmail(),
      createdAt: this.createdAt,
    };
  }
}
