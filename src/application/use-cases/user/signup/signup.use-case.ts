import { UserEntity } from '@src/domain/entities/user/user.entity';
import { UserRepositoryInterface } from '@src/domain/repositories/user.repository';
import { EmailValueObject } from '@src/domain/value-objects/email/email.value-object';
import { NameValueObject } from '@src/domain/value-objects/name/name.value-object';
import { PasswordValueObject } from '@src/domain/value-objects/password/password.value-object';
import { HashAdapterInterface } from '@src/shared/application/providers/hash-provider';
import { SignupValidatorFactory } from './validators/signup.validator';

export class SignUpUseCase {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly hashAdapter: HashAdapterInterface,
  ) {}

  /**
   * Signs up a new user.
   *
   * @throws {Error} - If any of the params are missing
   * @throws {Error} - If the email already exists
   *
   * @param {SignupInput} input - The input data for the user
   * @returns {Promise<SignupOutput>} - The created user
   */
  async execute(input: SignupInput): Promise<SignupOutput> {
    // Check if all the required params are present
    const validator = SignupValidatorFactory.create();

    validator.validate(input);

    // Check if the email already exists
    await this.userRepository.emailExist(input.email);

    // Hash the password
    const hashedPassword = await this.hashAdapter.generateHash(input.password);

    // Create the user entity
    const user = UserEntity.create({
      name: NameValueObject.create(input.name),
      email: EmailValueObject.create(input.email),
      password: PasswordValueObject.create(hashedPassword),
    });

    // Insert the user into the database
    await this.userRepository.insert(user);

    // Return the created user
    return user.toJSON();
  }
}

export type SignupInput = {
  name: string;
  email: string;
  password: string;
};

export type SignupOutput = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
};
