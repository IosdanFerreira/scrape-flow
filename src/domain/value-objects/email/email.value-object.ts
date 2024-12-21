export class EmailValueObject {
  private readonly email: string;

  private constructor(value: string) {
    this.email = value;
  }

  /**
   * Creates a new instance of the email value object.
   *
   * @param email - The email address to create the value object for.
   * @returns A new instance of the email value object.
   * @throws {Error} If the email address is invalid.
   */
  public static create(email: string): EmailValueObject {
    if (!this.emailIsValid(email)) {
      throw new Error('Invalid email');
    }
    return new EmailValueObject(email);
  }

  /**
   * Retrieves the email value.
   *
   * @returns The email address as a string.
   */
  getEmail(): string {
    return this.email;
  }

  /**
   * Checks if the given email address is equal to the email address of this value object.
   *
   * @param otherEmail - The email address to compare with.
   * @returns True if the two email addresses are equal, false otherwise.
   */
  equals(other: EmailValueObject): boolean {
    return this.email === other.getEmail();
  }

  /**
   * Validates the given email address.
   *
   * @param value - The email address to validate.
   * @returns True if the email address is valid, false otherwise.
   */
  static emailIsValid(email: string): boolean {
    // Regular expression for validating an email address format.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the email address against the regular expression.
    return emailRegex.test(email) && email.length < 255;
  }
}
