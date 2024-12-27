import { PasswordValueObjectValidatorFactory } from './validators/password.value-object.validator';

export const encryptedPasswordRegex =
  /^\$2[aby]?\$\d{2}\$[./A-Za-z0-9]{22}[./A-Za-z0-9]{31}$/;

export class PasswordValueObject {
  private readonly password: string;

  private constructor(password: string) {
    this.password = password;
  }

  /**
   * Retrieves the password value.
   *
   * @returns The password value as a string.
   */
  getPassword(): string {
    return this.password;
  }

  /**
   * Validates the given password.
   *
   * The password is validated against all the strategies registered in the
   * validator. If any of the strategies throws an error, the error is propagated.
   *
   * @param password - The password to validate.
   * @throws {Error} If the password is not valid.
   */
  static validatePassword(password: string): void {
    const validator = PasswordValueObjectValidatorFactory.create();

    validator.validate(password);
  }

  /**
   * Creates a new instance of the password value object.
   *
   * @param password - The password to create the value object for.
   * @throws {Error} If the password is invalid or not strong enough.
   */
  public static create(password: string): PasswordValueObject {
    // Test if the provided password is encrypted.
    const isEncrypted = encryptedPasswordRegex.test(password);

    // If the password is not encrypted, validate its type, length, and strength.
    if (!isEncrypted) {
      this.validatePassword(password);
    }

    return new PasswordValueObject(password);
  }
}
