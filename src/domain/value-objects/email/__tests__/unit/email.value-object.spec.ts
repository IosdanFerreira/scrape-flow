import { EmailValueObject } from '../../email.value-object';

describe('Email Value Object unit tests', () => {
  it('Should create a valid email', () => {
    const input = 'test@gmail.com';

    const output = EmailValueObject.create(input);

    expect(output.getEmail()).toBe(input);
  });

  it('Should return true when email is valid', () => {
    const input = 'test@gmail.com';

    const output = EmailValueObject.emailIsValid(input);

    expect(output).toBeTruthy();
  });

  it('Should return false when email is invalid', () => {
    const input = 'testgmail.com';

    const output = EmailValueObject.emailIsValid(input);

    expect(output).toBeFalsy();
  });

  it('Should throw an error when email is empty', () => {
    expect(() => EmailValueObject.create('')).toThrow(
      new Error('Invalid email'),
    );
  });

  it('Should throw an error when email is null', () => {
    expect(() => EmailValueObject.create(null)).toThrow(
      new Error('Invalid email'),
    );
  });

  it('Should throw an error when email is invalid', () => {
    const input = 'test';

    expect(() => EmailValueObject.create(input)).toThrow(
      new Error('Invalid email'),
    );
  });

  it('Should recognize two equal emails as the sames', () => {
    const input1 = EmailValueObject.create('test@gmail.com');
    const input2 = EmailValueObject.create('test@gmail.com');

    expect(input1.equals(input2)).toBeTruthy();
  });

  it('Should recognize two different emails as not equals', () => {
    const input1 = EmailValueObject.create('test@gmail.com');
    const input2 = EmailValueObject.create('test2@gmail.com');

    expect(input1.equals(input2)).toBeFalsy();
  });
});
