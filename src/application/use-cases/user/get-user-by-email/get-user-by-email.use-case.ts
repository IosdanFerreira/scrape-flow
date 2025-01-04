import { UserRepositoryInterface } from '@src/domain/repositories/user.repository';
import { UserOutputDto } from '../dto/user-output.dto';
import { BadRequestError } from '@src/shared/domain/errors/bad-request.error';

export class GetUserByEmailUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(input: GetUserByEmailInput): Promise<GetUserByEmailOutput> {
    if (!input.email) {
      throw new BadRequestError('Email is required');
    }

    const user = await this.userRepository.findByEmail(input.email);

    return user.toJSON();
  }
}

export type GetUserByEmailInput = {
  email: string;
};

export type GetUserByEmailOutput = UserOutputDto;
