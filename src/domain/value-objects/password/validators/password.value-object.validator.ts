export interface PasswordValidationStrategy {
  validate(password: string): void;
}

export class PasswordTypeValidation implements PasswordValidationStrategy {
  /**
   * Validates the type of the password.
   *
   * The password should be a non-empty string.
   *
   * @param password - The password to validate.
   * @throws {Error} If the password is not a string or is empty.
   */
  validate(password: string): void {
    const isValidPasswordType = typeof password === 'string';

    if (!isValidPasswordType) {
      throw new Error('Password should be a string');
    }
  }
}

export class PasswordLengthValidation implements PasswordValidationStrategy {
  /**
   * Validates the length of the password.
   *
   * The password should be at least 8 characters and at most 20 characters.
   *
   * @param password - The password to validate.
   * @throws {Error} If the password is not long enough or too long.
   */
  validate(password: string): void {
    const isValidPasswordLength = password.length >= 8 && password.length <= 20;

    if (!isValidPasswordLength) {
      throw new Error('Password must be between 8 and 20 characters');
    }
  }
}

export class PasswordStrengthValidation implements PasswordValidationStrategy {
  /**
   * Validates the strength of the password.
   *
   * The password should contain at least one uppercase letter, one special character and one number.
   *
   * @param password - The password to validate.
   * @throws {Error} If the password is not strong enough.
   */
  validate(password: string): void {
    // Regular expression for validating a password strength.
    // The password should contain at least one uppercase letter, one special character and one number.
    const isStrongPassword =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

    // Test the password against the regular expression.
    const isStrong = isStrongPassword.test(password);

    // If the password is not strong enough, throw an error.
    if (!isStrong) {
      throw new Error(
        'Password must contain at least one uppercase letter, one special character and one number',
      );
    }
  }
}

export class PasswordValueObjectValidator {
  private strategies: PasswordValidationStrategy[];

  constructor() {
    this.strategies = [
      new PasswordTypeValidation(),
      new PasswordLengthValidation(),
      new PasswordStrengthValidation(),
    ];
  }

  /**
   * Validates the given password.
   *
   * The password is validated against all the strategies registered in the validator.
   * If any of the strategies throws an error, the error is propagated.
   *
   * @param password - The password to validate.
   * @throws {Error} If the password is not valid.
   */
  validate(password: string): void {
    this.strategies.forEach((strategy) => strategy.validate(password));
  }
}

export class PasswordValueObjectValidatorFactory {
  static create(): PasswordValueObjectValidator {
    return new PasswordValueObjectValidator();
  }
}
