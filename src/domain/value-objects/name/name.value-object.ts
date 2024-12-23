export class NameValueObject {
  private readonly name: string;

  private constructor(name: string) {
    this.name = name;
  }

  /**
   * Creates a new instance of the name value object.
   *
   * @param name - The name to create the value object for.
   * @returns A new instance of the name value object.
   * @throws {Error} If the name is invalid.
   */
  public static create(name: string): NameValueObject {
    // Validate the name type.
    this.validateNameType(name);
    // Validate the name structure.
    this.validateNameStructure(name);

    // Return a new instance of the name value object.
    return new NameValueObject(name);
  }

  /**
   * Retrieves the name value.
   *
   * @returns The name value as a string.
   */
  getName(): string {
    return this.name;
  }

  /**
   * Validates the type of the name.
   *
   * @param name - The name to validate.
   * @throws {Error} If the name is not a string.
   */
  private static validateNameType(name: string): void {
    const isValidNameType = typeof name === 'string';

    if (!isValidNameType) {
      throw new Error('Name should be a string');
    }
  }

  /**
   * Validates the structure of the name.
   *
   * The name should be in the format "Name Surname".
   *
   * @param name - The name to validate.
   * @throws {Error} If the name is not in the correct format.
   */
  private static validateNameStructure(name: string): void {
    // The regular expression to validate the name structure.
    const isValidNameRegex = /^[A-Za-z]{3,} [A-Za-z]{3,}$/;

    // The name is valid if it matches the regular expression.
    const isValidName = isValidNameRegex.test(name);

    // If the name is not valid, throw an error.
    if (!isValidName) {
      throw new Error('Name should be in the format "Name Surname"');
    }
  }
}
