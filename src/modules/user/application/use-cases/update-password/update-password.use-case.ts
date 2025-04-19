import { BadRequestError, NotFoundError } from '@src/shared/domain/errors';

import { HashProviderInterface } from '@src/shared/application/interfaces';
import { Password } from '@src/shared/domain/value-objects/password/password.value-object';
import { UserOutputDto } from '../_dto/user-output.dto';
import { UserRepositoryInterface } from '@src/modules/user/domain/repositories/user.repository';
import { ValidatorStrategyInterface } from '@src/shared/domain/interfaces';

export class UpdatePasswordUseCase {
  /**
   * Caso de uso de atualização de senha do usuário.
   *
   * @param userRepository - Reposit rio de usu rio
   * @param hashProvider - Provider de hash de senhas
   * @param validator - Validador de entrada
   */
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly hashProvider: HashProviderInterface,
    private readonly validator: ValidatorStrategyInterface<UpdatePasswordInput>,
  ) {}

  /**
   * Atualiza a senha do usuário.
   *
   * @param input - Dados de entrada contendo o ID do usuário, senha antiga e nova senha.
   * @returns Uma promessa com o objeto de saída do usuário após a atualização da senha.
   * @throws Lança um erro se o usuário não for encontrado ou se as senhas não corresponderem.
   */
  async execute(input: UpdatePasswordInput): Promise<UpdatePasswordOutput> {
    // Valida o input do usuário
    this.validator.validate(input);

    // Verifica se o usuário existe no banco de dados
    const userExist = await this.userRepository.findByID(input.id);

    // Lança erro se o usuário não for encontrado
    if (!userExist) {
      throw new NotFoundError('Erro ao atualizar senha', [
        { property: 'id', message: 'Usuário nao encontrado' },
      ]);
    }

    // Compara a senha antiga fornecida com a senha armazenada
    const checkOldPassword = await this.hashProvider.compareHash(
      input.oldPassword,
      userExist.password,
    );

    // Lança erro se as senhas não corresponderem
    if (!checkOldPassword) {
      throw new BadRequestError('Erro ao atualizar senha', [
        { property: 'password', message: 'Senha inválida' },
      ]);
    }

    // Gera o hash da nova senha
    const newHashPassword = await this.hashProvider.generateHash(
      input.newPassword,
      6,
    );

    // Atualiza a senha do usuário
    userExist.updatePassword(Password.create(newHashPassword));

    // Atualiza o usuário no banco de dados
    await this.userRepository.update(input.id, userExist);

    // Retorna os dados do usuário após a atualização
    return userExist.toJSON();
  }
}

export type UpdatePasswordInput = {
  id: string;
  oldPassword: string;
  newPassword: string;
};

export type UpdatePasswordOutput = UserOutputDto;
