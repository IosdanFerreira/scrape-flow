import { BadRequestError } from '@src/shared/domain/errors/bad-request.error';
import {
  UserValidator,
  UserValidatorFactory,
} from '../../user.entity.validator';
import { EmailValueObject } from '@src/domain/value-objects/email/email.value-object';
import { PasswordValueObject } from '@src/domain/value-objects/password/password.value-object';
import { NameValueObject } from '@src/domain/value-objects/name/name.value-object';

describe('UserEntityValidator unit tests', () => {
  let sut: UserValidator;

  beforeEach(() => {
    sut = UserValidatorFactory.create();
  });

  describe('Name field', () => {
    it('Should throw an error when name is null', () => {
      const input = {
        name: null as any,
        email: EmailValueObject.create('Test@gmail.com'),
        password: PasswordValueObject.create('Test@12345'),
      };

      expect(() => sut.validate(input)).toThrow(
        new BadRequestError('Name is required'),
      );
    });

    it('Should throw an error when name is undefined', () => {
      const input = {
        name: undefined as any,
        email: EmailValueObject.create('Test@gmail.com'),
        password: PasswordValueObject.create('Test@12345'),
      };

      expect(() => sut.validate(input)).toThrow(
        new BadRequestError('Name is required'),
      );
    });

    it('Should throw an error when name is not a instance of NameValueObject', () => {
      const input = {
        name: 123456789 as any,
        email: EmailValueObject.create('Test@gmail.com'),
        password: PasswordValueObject.create('Test@12345'),
      };

      expect(() => sut.validate(input)).toThrow(
        new BadRequestError('Name must be an instance of NameValueObject'),
      );
    });

    it('Should throw an error when name is is empty', () => {
      const input = {
        name: '' as any,
        email: EmailValueObject.create('Test@gmail.com'),
        password: PasswordValueObject.create('Test@12345'),
      };

      expect(() => sut.validate(input)).toThrow(
        new BadRequestError('Name is required'),
      );
    });
  });

  describe('Email field', () => {
    it('Should throw an error when email is null', () => {
      const input = {
        name: NameValueObject.create('Test Test'),
        email: null as any,
        password: PasswordValueObject.create('Test@12345'),
      };

      expect(() => sut.validate(input)).toThrow(
        new BadRequestError('Email is required'),
      );
    });

    it('Should throw an error when email is undefined', () => {
      const input = {
        name: NameValueObject.create('Test Test'),
        email: undefined as any,
        password: PasswordValueObject.create('Test@12345'),
      };

      expect(() => sut.validate(input)).toThrow(
        new BadRequestError('Email is required'),
      );
    });

    it('Should throw an error when name is not a instance of EmailValueObject', () => {
      const input = {
        name: NameValueObject.create('Test Test'),
        email: 12345 as any,
        password: PasswordValueObject.create('Test@12345'),
      };

      expect(() => sut.validate(input)).toThrow(
        new BadRequestError('Email must be an instance of EmailValueObject'),
      );
    });

    it('Should throw an error when name is is empty', () => {
      const input = {
        name: NameValueObject.create('Test Test'),
        email: '' as any,
        password: PasswordValueObject.create('Test@12345'),
      };

      expect(() => sut.validate(input)).toThrow(
        new BadRequestError('Email is required'),
      );
    });
  });

  describe('Password field', () => {
    it('Should throw an error when password is null', () => {
      const input = {
        name: NameValueObject.create('Test Test'),
        email: EmailValueObject.create('Test@gmail.com'),
        password: null as any,
      };

      expect(() => sut.validate(input)).toThrow(
        new BadRequestError('Password is required'),
      );
    });

    it('Should throw an error when password is undefined', () => {
      const input = {
        name: NameValueObject.create('Test Test'),
        email: EmailValueObject.create('Test@gmail.com'),
        password: undefined as any,
      };

      expect(() => sut.validate(input)).toThrow(
        new BadRequestError('Password is required'),
      );
    });

    it('Should throw an error when password is not a instance of PasswordValueObject', () => {
      const input = {
        name: NameValueObject.create('Test Test'),
        email: EmailValueObject.create('Test@gmail.com'),
        password: 123456 as any,
      };

      expect(() => sut.validate(input)).toThrow(
        new BadRequestError(
          'Password must be an instance of PasswordValueObject',
        ),
      );
    });

    it('Should throw an error when password is is empty', () => {
      const input = {
        name: NameValueObject.create('Test Test'),
        email: EmailValueObject.create('Test@gmail.com'),
        password: '' as any,
      };

      expect(() => sut.validate(input)).toThrow(
        new BadRequestError('Password is required'),
      );
    });
  });

  it('Should throw an error when User props is null or undefined', () => {
    expect(() => sut.validate(null as any)).toThrow(
      new BadRequestError('User props is required'),
    );

    expect(() => sut.validate(undefined as any)).toThrow(
      new BadRequestError('User props is required'),
    );
  });
});
