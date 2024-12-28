import { NameValueObject } from '@src/domain/value-objects/name/name.value-object';
import { UserEntityProps } from '../user.entity';
import { PasswordValueObject } from '@src/domain/value-objects/password/password.value-object';
import { EmailValueObject } from '@src/domain/value-objects/email/email.value-object';

export interface UserEntityValidatorStrategy {
  validate(userProps: UserEntityProps): void;
}

export class UserNameValidation implements UserEntityValidatorStrategy {
  validate(userProps: UserEntityProps): void {
    if (!userProps.name) {
      throw new Error('Name is required');
    }

    if (!(userProps.name instanceof NameValueObject)) {
      throw new Error('Name must be an instance of NameValueObject');
    }
  }
}

export class UserEmailValidation implements UserEntityValidatorStrategy {
  validate(userProps: UserEntityProps): void {
    if (!userProps.email) {
      throw new Error('Email is required');
    }

    if (!(userProps.email instanceof EmailValueObject)) {
      throw new Error('Email must be an instance of EmailValueObject');
    }
  }
}

export class UserPasswordValidation implements UserEntityValidatorStrategy {
  validate(userProps: UserEntityProps): void {
    if (!userProps.password) {
      throw new Error('Password is required');
    }

    if (!(userProps.password instanceof PasswordValueObject)) {
      throw new Error('Password must be an instance of PasswordValueObject');
    }
  }
}

export class UserValidator {
  private strategies: UserEntityValidatorStrategy[];

  constructor() {
    this.strategies = [
      new UserNameValidation(),
      new UserEmailValidation(),
      new UserPasswordValidation(),
    ];
  }
  validate(userProps: UserEntityProps) {
    this.strategies.forEach((strategy) => strategy.validate(userProps));
  }
}

export class UserValidatorFactory {
  static create() {
    return new UserValidator();
  }
}
