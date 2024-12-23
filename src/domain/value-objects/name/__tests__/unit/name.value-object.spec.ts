import { NameValueObject } from '../../name.value-object';

describe('Name Value Object unit tests', () => {
  it('Should create a valid email', () => {
    const input = 'Name Test';

    const output = NameValueObject.create(input);

    expect(output.getName()).toBe(input);
  });

  it('Should throw a error when name is not a string', () => {
    expect(() => NameValueObject.create(12345678 as any)).toThrow(
      new Error('Name should be a string'),
    );

    expect(() => NameValueObject.create(null)).toThrow(
      new Error('Name should be a string'),
    );
  });

  it('Should throw a error when name is just a string', () => {
    expect(() => NameValueObject.create('test')).toThrow(
      new Error('Name should be in the format \"Name Surname\"'),
    );

    expect(() => NameValueObject.create('NameSurname')).toThrow(
      new Error('Name should be in the format \"Name Surname\"'),
    );

    expect(() => NameValueObject.create('Name-Surname')).toThrow(
      new Error('Name should be in the format \"Name Surname\"'),
    );

    expect(() => NameValueObject.create('Name_Surname')).toThrow(
      new Error('Name should be in the format \"Name Surname\"'),
    );
  });
});
