import { NameValueObject } from '@src/domain/value-objects/name/name.value-object';
import { UserDataBuilder } from '../../testing/helpers/user-data-builder';
import { UserEntity } from '../../user.entity';
import { PasswordValueObject } from '@src/domain/value-objects/password/password.value-object';
import { EmailValueObject } from '@src/domain/value-objects/email/email.value-object';

describe('UserEntity unit tests', () => {
  let validateSpy: jest.SpyInstance;

  beforeEach(() => {
    validateSpy = jest.spyOn(UserEntity, 'validate');
  });

  it('Should create a valid user', () => {
    const input = UserDataBuilder({});

    const output = UserEntity.create(input);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(output.name.getName()).toBe(input.name.getName());
    expect(output.email.getEmail()).toStrictEqual(input.email.getEmail());
    expect(output.password.getPassword()).toStrictEqual(
      input.password.getPassword(),
    );
  });

  it('Should throw an error when name is empty', () => {
    const input = UserDataBuilder({});

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(() =>
      UserEntity.create({ ...input, name: NameValueObject.create('') }),
    ).toThrow(new Error('Name should be in the format "Name Surname"'));
  });

  it('Should throw an error when name have no a instance of NameValueObject', () => {
    const input = {
      name: 'teste',
      email: EmailValueObject.create('Test@gmail.com'),
      password: PasswordValueObject.create('Test@12345'),
    };

    expect(() => UserEntity.create(input as any)).toThrow(
      new Error('Name must be an instance of NameValueObject'),
    );
  });

  it('Should throw an error when name is not a string', () => {
    const input = UserDataBuilder({});

    expect(() =>
      UserEntity.create({ ...input, name: NameValueObject.create(null) }),
    ).toThrow(new Error('Name should be a string'));

    expect(() =>
      UserEntity.create({
        ...input,
        name: NameValueObject.create(1234 as any),
      }),
    ).toThrow(new Error('Name should be a string'));
  });

  it('Should throw an error when User Entity have only name', () => {
    const input = {
      name: NameValueObject.create('Test Test'),
    };

    expect(() => UserEntity.create(input as any)).toThrow(
      new Error('Email is required'),
    );
  });

  it('Should throw an error when User Entity have only password', () => {
    const input = {
      PasswordValueObject: PasswordValueObject.create('Test@12345'),
    };

    expect(() => UserEntity.create(input as any)).toThrow(
      new Error('Name is required'),
    );
  });

  it('Should throw an error when password have no a instance of PasswordValueObject', () => {
    const input = {
      name: NameValueObject.create('Test Test'),
      email: EmailValueObject.create('Test1@gmail.com'),
      password: 'Test@12345',
    };

    expect(() => UserEntity.create(input as any)).toThrow(
      new Error('Password must be an instance of PasswordValueObject'),
    );
  });

  it('Should throw an error when password is empty', () => {
    const input = UserDataBuilder({});

    expect(() =>
      UserEntity.create({ ...input, password: PasswordValueObject.create('') }),
    ).toThrow(new Error('Password must be between 8 and 20 characters'));
  });

  it('Should throw an error when password is not a string', () => {
    const input = UserDataBuilder({});

    expect(() =>
      UserEntity.create({
        ...input,
        password: PasswordValueObject.create(null),
      }),
    ).toThrow(new Error('Password should be a string'));

    expect(() =>
      UserEntity.create({
        ...input,
        password: PasswordValueObject.create(12345678 as any),
      }),
    ).toThrow(new Error('Password should be a string'));
  });

  it('Should throw an error when password is too short', () => {
    const input = UserDataBuilder({});

    expect(() =>
      UserEntity.create({
        ...input,
        password: PasswordValueObject.create('Te1#'),
      }),
    ).toThrow(new Error('Password must be between 8 and 20 characters'));
  });

  it('Should throw an error when password is not strength enough', () => {
    const input = UserDataBuilder({});

    expect(() =>
      UserEntity.create({
        ...input,
        password: PasswordValueObject.create('testeteste'),
      }),
    ).toThrow(
      new Error(
        'Password must contain at least one uppercase letter, one special character and one number',
      ),
    );

    expect(() =>
      UserEntity.create({
        ...input,
        password: PasswordValueObject.create('teste12345'),
      }),
    ).toThrow(
      new Error(
        'Password must contain at least one uppercase letter, one special character and one number',
      ),
    );

    expect(() =>
      UserEntity.create({
        ...input,
        password: PasswordValueObject.create('Teste12345'),
      }),
    ).toThrow(
      new Error(
        'Password must contain at least one uppercase letter, one special character and one number',
      ),
    );

    expect(() =>
      UserEntity.create({
        ...input,
        password: PasswordValueObject.create('Teste@#$#$%$'),
      }),
    ).toThrow(
      new Error(
        'Password must contain at least one uppercase letter, one special character and one number',
      ),
    );

    expect(() =>
      UserEntity.create({
        ...input,
        password: PasswordValueObject.create('1234344@#$#$%$'),
      }),
    ).toThrow(
      new Error(
        'Password must contain at least one uppercase letter, one special character and one number',
      ),
    );
  });

  it('Should throw an error when email is empty', () => {
    const input = UserDataBuilder({});

    expect(() =>
      UserEntity.create({ ...input, email: EmailValueObject.create('') }),
    ).toThrow(new Error('Invalid email'));
  });

  it('Should throw an error when email is null', () => {
    const input = UserDataBuilder({});

    expect(() =>
      UserEntity.create({
        ...input,
        email: EmailValueObject.create(null as any),
      }),
    ).toThrow(new Error('Invalid email'));
  });

  it('Should throw an error when email is invalid', () => {
    const input = UserDataBuilder({});

    expect(() =>
      UserEntity.create({
        ...input,
        email: EmailValueObject.create(12345678 as any),
      }),
    ).toThrow(new Error('Invalid email'));

    expect(() =>
      UserEntity.create({
        ...input,
        email: EmailValueObject.create('Teste'),
      }),
    ).toThrow(new Error('Invalid email'));

    expect(() =>
      UserEntity.create({
        ...input,
        email: EmailValueObject.create('Teste.com'),
      }),
    ).toThrow(new Error('Invalid email'));

    expect(() =>
      UserEntity.create({
        ...input,
        email: EmailValueObject.create('Teste@.com'),
      }),
    ).toThrow(new Error('Invalid email'));
  });

  it('Should throw an error when User Entity have only email', () => {
    const input = {
      email: EmailValueObject.create('Test@gmail.com'),
    };

    expect(() => UserEntity.create(input as any)).toThrow(
      new Error('Name is required'),
    );
  });

  it('Should throw an error when email have no a instance of EmailValueObject', () => {
    const input = {
      name: NameValueObject.create('Test Test'),
      email: 'Test@gmail.com',
      password: PasswordValueObject.create('Test@12345'),
    };

    expect(() => UserEntity.create(input as any)).toThrow(
      new Error('Email must be an instance of EmailValueObject'),
    );
  });
});
