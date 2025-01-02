import { UserRepositoryInterface } from '@src/domain/repositories/user.repository';
import { UserOutputDto } from '../dto/user-output.dto';
import { UpdateUserValidatorFactory } from './validators/update-user.validator';
import { NotFoundError } from '@src/shared/domain/errors/not-found.error';

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(input: UpdateUserInput): Promise<UpdateUserOutput> {
    const validator = UpdateUserValidatorFactory.create();

    validator.validate(input);

    const user = await this.userRepository.findById(input.id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    user.update(input.name);

    await this.userRepository.update(input.id, user);

    return user.toJSON();
  }
}

export type UpdateUserInput = {
  id: string;
  name: string;
};

export type UpdateUserOutput = UserOutputDto;
