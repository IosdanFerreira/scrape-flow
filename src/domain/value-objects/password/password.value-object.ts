const encryptedPasswordRegex =
  /^\$2[aby]?\$\d{2}\$[./A-Za-z0-9]{22}[./A-Za-z0-9]{31}$/;

export class PasswordValueObject {
  private readonly password: string;

  private constructor(password: string) {
    this.password = password;
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

    this.validatePasswordType(password);

    // If the password is not encrypted, validate its type, length, and strength.
    if (!isEncrypted) {
      this.validatePasswordLength(password);
      this.validatePasswordStrength(password);
    }

    return new PasswordValueObject(password);
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
   * Validates the type of the password.
   *
   * @param password - The password to validate.
   * @throws {Error} If the password is not a string.
   */
  private static validatePasswordType(password: string): void {
    const isValidPasswordType = typeof password === 'string';

    if (!isValidPasswordType) {
      throw new Error('Password should be a string');
    }
  }

  /**
   * Validates the length of the password.
   *
   * @param password - The password to validate.
   * @throws {Error} If the password is not between 8 and 20 characters long.
   */
  private static validatePasswordLength(password: string): void {
    const isValidPasswordLength = password.length >= 8 && password.length <= 20;

    if (!isValidPasswordLength) {
      throw new Error('Password must be between 8 and 20 characters');
    }
  }

  /**
   * Validates the strength of the password.
   *
   * The password must contain at least one uppercase letter, one special character and one number.
   *
   * @param password - The password to validate.
   * @throws {Error} If the password is not strong enough.
   */
  private static validatePasswordStrength(password: string): void {
    // Regular expression to test for a strong password.
    // The password must contain at least one uppercase letter, one special character and one number.
    const isStrongPassword =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

    const isStrong = isStrongPassword.test(password);

    if (!isStrong) {
      throw new Error(
        'Password must contain at least one uppercase letter, one special character and one number',
      );
    }
  }
}
