import { BadRequestError } from '@src/shared/domain/errors/bad-request.error';
import { UpdateUserInput } from '../update-user.use-case';

export interface UpdateUserStrategy {
  validate(input: any): void;
}

export class UpdateUserNameValidation implements UpdateUserStrategy {
  validate(input: any): void {
    if (!input.name) {
      throw new BadRequestError('Name is required');
    }

    if (typeof input.name !== 'string') {
      throw new BadRequestError('Name must be a string');
    }
  }
}

export class UpdateUserValidator implements UpdateUserStrategy {
  strategies: UpdateUserStrategy[] = [];

  constructor() {
    this.strategies = [new UpdateUserNameValidation()];
  }

  validate(input: UpdateUserInput): void {
    this.strategies.forEach((strategy) => {
      strategy.validate(input);
    });
  }
}

export class UpdateUserValidatorFactory {
  static create(): UpdateUserValidator {
    return new UpdateUserValidator();
  }
}
