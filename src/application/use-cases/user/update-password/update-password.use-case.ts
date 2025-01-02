import { UserRepositoryInterface } from '@src/domain/repositories/user.repository';
import { UserOutputDto } from '../dto/user-output.dto';
import { HashAdapterInterface } from '@src/shared/application/providers/hash-provider';
import { BadRequestError } from '@src/shared/domain/errors/bad-request.error';

export class UpdatePasswordUseCase {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly hashAdapter: HashAdapterInterface,
  ) {}

  async execute(input: UpdatePasswordInput): Promise<UserOutputDto> {
    if (!input.id) {
      throw new BadRequestError('ID is required');
    }

    if (!input.oldPassword) {
      throw new BadRequestError('Old password is required');
    }

    if (!input.newPassword) {
      throw new BadRequestError('New password is required');
    }

    const userExist = await this.userRepository.findById(input.id);

    const checkOldPassword = await this.hashAdapter.compareHash(
      input.oldPassword,
      userExist.password.getPassword(),
    );

    if (!checkOldPassword) {
      throw new BadRequestError('Old password is invalid');
    }

    const newHashPassword = await this.hashAdapter.generateHash(
      input.newPassword,
    );

    userExist.updatePassword(newHashPassword);

    await this.userRepository.update(input.id, userExist);

    return userExist.toJSON();
  }
}

export type UpdatePasswordInput = {
  id: string;
  oldPassword: string;
  newPassword: string;
};

export type UpdatePasswordOutput = UserOutputDto;
