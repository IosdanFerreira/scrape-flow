import { SignUpUseCase } from '../../signup.use-case';

describe('SignUpUseCase unit tests', () => {
  let sut: SignUpUseCase;

  beforeEach(() => {
    sut = new SignUpUseCase();
  });

  it('Should throw an error when name is empty', () => {
    const input = {
      name: '',
      email: 'john@example.com',
      password: '12345678',
    };

    expect(() => sut.execute(input)).rejects.toThrow(
      new Error('Invalid params'),
    );
  });

  it('Should throw an error when email is empty', () => {
    const input = {
      name: 'Test',
      email: '',
      password: '12345678',
    };

    expect(() => sut.execute(input)).rejects.toThrow(
      new Error('Invalid params'),
    );
  });

  it('Should throw an error when password is empty', () => {
    const input = {
      name: 'Test',
      email: 'john@example.com',
      password: '',
    };

    expect(() => sut.execute(input)).rejects.toThrow(
      new Error('Invalid params'),
    );
  });

  it('Should create a new user', () => {
    const input = {
      name: 'Test',
      email: 'john@example.com',
      password: '12345678',
    };

    const output = sut.execute(input);

    expect(output).toBeDefined();
  });
});
