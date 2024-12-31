import { SignupInput } from '../signup.use-case';

export interface SignupValidationStrategy {
  validate(input: SignupInput): void;
}

export class SignupNameValidation implements SignupValidationStrategy {
  validate(input: SignupInput): void {
    if (!input.name) {
      throw new Error('Name is required');
    }

    if (typeof input.name !== 'string') {
      throw new Error('Name must be a string');
    }
  }
}

export class SignupEmailValidation implements SignupValidationStrategy {
  validate(input: SignupInput): void {
    if (!input.email) {
      throw new Error('Email is required');
    }

    if (typeof input.email !== 'string') {
      throw new Error('Email must be a string');
    }
  }
}

export class SignupPasswordValidation implements SignupValidationStrategy {
  validate(input: SignupInput): void {
    if (!input.password) {
      throw new Error('Password is required');
    }

    if (typeof input.password !== 'string') {
      throw new Error('Password must be a string');
    }
  }
}

export class SignupValidator implements SignupValidationStrategy {
  strategies: SignupValidationStrategy[] = [];

  constructor() {
    this.strategies = [
      new SignupNameValidation(),
      new SignupEmailValidation(),
      new SignupPasswordValidation(),
    ];
  }

  validate(input: any): void {
    this.strategies.forEach((strategy) => strategy.validate(input));
  }
}

export class SignupValidatorFactory {
  static create(): SignupValidator {
    return new SignupValidator();
  }
}
