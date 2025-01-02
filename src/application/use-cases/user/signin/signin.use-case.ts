import { UserRepositoryInterface } from '@src/domain/repositories/user.repository';
import { HashAdapterInterface } from '@src/shared/application/providers/hash-provider';
import { BadRequestError } from '@src/shared/domain/errors/bad-request.error';
import { UserOutputDto } from '../dto/user-output.dto';

export class SignInUseCase {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly hashAdapter: HashAdapterInterface,
  ) {}

  /**
   * Executes the sign-in process for a user.
   *
   * @param {SignInInput} input - The input data containing email and password.
   * @returns {Promise<SignInOutput>} - The signed-in user's data.
   * @throws {BadRequestError} - If email or password is missing or invalid.
   */
  async execute(input: SignInInput): Promise<SignInOutput> {
    // Validate that the email is provided
    if (!input.email) {
      throw new BadRequestError('Email is required');
    }

    // Validate that the password is provided
    if (!input.password) {
      throw new BadRequestError('Password is required');
    }

    // Check if a user with the provided email exists
    const userExist = await this.userRepository.findByEmail(input.email);

    // If no user is found, throw an error
    if (!userExist) {
      throw new BadRequestError('Email or password is invalid');
    }

    // Compare the provided password with the stored hashed password
    const hashPasswordMatches = await this.hashAdapter.compareHash(
      input.password,
      userExist.password.getPassword(),
    );

    // If the password does not match, throw an error
    if (!hashPasswordMatches) {
      throw new BadRequestError('Email or password is invalid');
    }

    // Return the user data in JSON format
    return userExist.toJSON();
  }
}

export type SignInInput = {
  email: string;
  password: string;
};

export type SignInOutput = UserOutputDto;
