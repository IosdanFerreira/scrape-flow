import { PasswordValueObject } from '../../password.value-object';

describe('Password Value Object unit tests', () => {
  it('Should create a valid email', () => {
    const input = 'Test@123';

    const output = PasswordValueObject.create(input);

    expect(output.getPassword()).toBe(input);
  });

  it('Should throw an error when password is not a string', () => {
    expect(() => PasswordValueObject.create(null)).toThrow(
      new Error('Password should be a string'),
    );

    expect(() => PasswordValueObject.create(12345678 as any)).toThrow(
      new Error('Password should be a string'),
    );
  });

  it('Should throw an error when password is empty', () => {
    expect(() => PasswordValueObject.create('')).toThrow(
      new Error('Password must be between 8 and 20 characters'),
    );
  });

  it('Should throw an error when password is not strong enough', () => {
    expect(() => PasswordValueObject.create('12345678')).toThrow(
      new Error(
        'Password must contain at least one uppercase letter, one special character and one number',
      ),
    );

    expect(() => PasswordValueObject.create('Test@test')).toThrow(
      new Error(
        'Password must contain at least one uppercase letter, one special character and one number',
      ),
    );

    expect(() => PasswordValueObject.create('Test1test')).toThrow(
      new Error(
        'Password must contain at least one uppercase letter, one special character and one number',
      ),
    );
  });

  it('Should return a password when the value is encrypted', () => {
    const input =
      '$2a$10$ZPBIz2uzwJSrujtgcCzViuIB23oPj3WHV/gZjen3J0D8AcbtWAbs2';

    const output = PasswordValueObject.create(input);

    expect(output.getPassword()).toBe(input);
  });
});
