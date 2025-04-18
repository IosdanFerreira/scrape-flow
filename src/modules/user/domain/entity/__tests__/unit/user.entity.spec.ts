import { Email } from '@src/shared/domain/value-objects/email/email.value-object';
import { InvalidParamError } from '@src/shared/domain/errors/invalid-param.error';
import { Name } from '@src/shared/domain/value-objects/name/name.value-object';
import { Password } from '@src/shared/domain/value-objects/password/password.value-object';
import { UserEntity } from '../../user.entity';

describe('UserEntity', () => {
  let sut: UserEntity;

  beforeEach(() => {
    sut = UserEntity.create({
      name: Name.create('John Doe'),
      email: Email.create('john.doe@example.com'),
      password: Password.create('Password123!'),
      createdAt: new Date(),
    });
  });

  it('should create a user entity with valid props', () => {
    expect(sut).toBeDefined();
    expect(sut.name).toStrictEqual('John Doe');
    expect(sut.email).toStrictEqual('john.doe@example.com');
    expect(sut.password).toStrictEqual('Password123!');
  });

  describe('Name prop tests', () => {
    it('should update the user name', () => {
      const newName = Name.create('Jane Doe');
      sut.updateUser({ name: newName });

      expect(sut.name).toStrictEqual('Jane Doe');
    });

    it('should throw error when name is empty, but is a Name value object', () => {
      expect(() => {
        UserEntity.create({
          name: Name.create(''),
          email: Email.create('john.doe@example.com'),
          password: Password.create('Password123!'),
          createdAt: new Date(),
        });
      }).toThrow(new InvalidParamError('Nome é obrigatório'));
    });

    it('should throw error when name is invalid, but is a Name value object', () => {
      expect(() => {
        UserEntity.create({
          name: Name.create('In'),
          email: Email.create('john.doe@example.com'),
          password: Password.create('Password123!'),
          createdAt: new Date(),
        });
      }).toThrow(
        new InvalidParamError(
          'Nome inválido, deve conter pelo menos 3 caracteres e a primeira letra maiúscula',
        ),
      );
    });

    it('should throw error when name is empty, but is not a Name value object', () => {
      expect(() => {
        UserEntity.create({
          name: '' as any,
          email: Email.create('john.doe@example.com'),
          password: Password.create('Password123!'),
          createdAt: new Date(),
        });
      }).toThrow(new InvalidParamError('Nome é obrigatório'));
    });

    it('should throw error when name is a number', () => {
      expect(() => {
        UserEntity.create({
          name: 123 as any,
          email: Email.create('john.doe@example.com'),
          password: Password.create('Password123!'),
          createdAt: new Date(),
        });
      }).toThrow(new InvalidParamError('Nome deve ser uma instância de Name'));
    });

    it('should throw error when name is undefined', () => {
      expect(() => {
        UserEntity.create({
          name: undefined as any,
          email: Email.create('john.doe@example.com'),
          password: Password.create('Password123!'),
          createdAt: new Date(),
        });
      }).toThrow(new InvalidParamError('Nome é obrigatório'));
    });

    it('should throw error when name is invalid, but is not a Name value object ', () => {
      expect(() => {
        UserEntity.create({
          name: 'invalid' as any,
          email: Email.create('john.doe@example.com'),
          password: Password.create('Password123!'),
          createdAt: new Date(),
        });
      }).toThrow(new InvalidParamError('Nome deve ser uma instância de Name'));
    });

    it('should throw error when name is null', () => {
      expect(() => {
        UserEntity.create({
          name: null as any,
          email: Email.create('john.doe@example.com'),
          password: Password.create('Password123!'),
          createdAt: new Date(),
        });
      }).toThrow(new InvalidParamError('Nome é obrigatório'));
    });
  });

  describe('Email prop tests', () => {
    it('should update the user email', () => {
      const newEmail = Email.create('jane.doe@example.com');
      sut.updateUser({ email: newEmail });

      expect(sut.email).toStrictEqual('jane.doe@example.com');
    });

    it('should throw error when email is empty, but is a Email value object', () => {
      expect(() => {
        UserEntity.create({
          name: Name.create('John Doe'),
          email: Email.create(''),
          password: Password.create('Password123!'),
          createdAt: new Date(),
        });
      }).toThrow(new InvalidParamError('Email é obrigatório'));
    });

    it('should throw error when email is invalid, but is a Email value object', () => {
      expect(() => {
        UserEntity.create({
          name: Name.create('John Doe'),
          email: Email.create('john.doe.com'),
          password: Password.create('Password123!'),
          createdAt: new Date(),
        });
      }).toThrow(new InvalidParamError('Email com formato inválido'));
    });

    it('should throw error when email is a empty string', () => {
      expect(() => {
        UserEntity.create({
          name: Name.create('John Doe'),
          email: '' as any,
          password: Password.create('Password123!'),
          createdAt: new Date(),
        });
      }).toThrow(new InvalidParamError('Email é obrigatório'));
    });

    it('should throw error when email is a number', () => {
      expect(() => {
        UserEntity.create({
          name: Name.create('John Doe'),
          email: 123 as any,
          password: Password.create('Password123!'),
          createdAt: new Date(),
        });
      }).toThrow(
        new InvalidParamError('Email deve ser uma instância de Email'),
      );
    });

    it('should throw error when email is undefined', () => {
      expect(() => {
        UserEntity.create({
          name: Name.create('John Doe'),
          email: undefined,
          password: Password.create('Password123!'),
          createdAt: new Date(),
        });
      }).toThrow(new InvalidParamError('Email é obrigatório'));
    });

    it('should throw error when email is invalid, but is not a Email value object ', () => {
      expect(() => {
        UserEntity.create({
          name: Name.create('John Doe'),
          email: 'john.doe@example.com' as any,
          password: Password.create('Password123!'),
          createdAt: new Date(),
        });
      }).toThrow(
        new InvalidParamError('Email deve ser uma instância de Email'),
      );
    });

    it('should throw error when email is null', () => {
      expect(() => {
        UserEntity.create({
          name: Name.create('John Doe'),
          email: null as any,
          password: Password.create('Password123!'),
          createdAt: new Date(),
        });
      }).toThrow(new InvalidParamError('Email é obrigatório'));
    });
  });

  describe('Password prop tests', () => {
    it('should update the user password', () => {
      const newPassword = Password.create('NewPassword12!@');
      sut.updatePassword(newPassword);

      expect(sut.password).toStrictEqual('NewPassword12!@');
    });

    it('should throw error when password is empty, but is a Password value object', () => {
      expect(() => {
        UserEntity.create({
          name: Name.create('John Doe'),
          email: Email.create('johndoe@example.com'),
          password: Password.create(''),
          createdAt: new Date(),
        });
      }).toThrow(new InvalidParamError('Senha é obrigatório'));
    });

    it('should throw error when password is invalid, but is a Password value object', () => {
      expect(() => {
        UserEntity.create({
          name: Name.create('John Doe'),
          email: Email.create('johndoe@example.com'),
          password: Password.create('invalid'),
          createdAt: new Date(),
        });
      }).toThrow(
        new InvalidParamError(
          'A senha de conter pelo menos uma letra maiúscula, uma letra minúscula, um número, caractere especial e ter pelo menos 8 caracteres',
        ),
      );
    });

    it('should throw error when password is a empty string', () => {
      expect(() => {
        UserEntity.create({
          name: Name.create('John Doe'),
          email: Email.create('johndoe@example.com'),
          password: '' as any,
          createdAt: new Date(),
        });
      }).toThrow(new InvalidParamError('Senha é obrigatório'));
    });

    it('should throw error when password is a number', () => {
      expect(() => {
        UserEntity.create({
          name: Name.create('John Doe'),
          email: Email.create('johndoe@example.com'),
          password: 12345678 as any,
          createdAt: new Date(),
        });
      }).toThrow(
        new InvalidParamError('Senha deve ser uma instância de Password'),
      );
    });

    it('should throw error when password is undefined', () => {
      expect(() => {
        UserEntity.create({
          name: Name.create('John Doe'),
          email: Email.create('johndoe@example.com'),
          password: undefined as any,
          createdAt: new Date(),
        });
      }).toThrow(new InvalidParamError('Senha é obrigatório'));
    });

    it('should throw error when password is invalid, but is not a Password value object ', () => {
      expect(() => {
        UserEntity.create({
          name: Name.create('John Doe'),
          email: Email.create('johndoe@example.com'),
          password: 'Invalid12!@' as any,
          createdAt: new Date(),
        });
      }).toThrow(
        new InvalidParamError('Senha deve ser uma instância de Password'),
      );
    });

    it('should throw error when password is null', () => {
      expect(() => {
        UserEntity.create({
          name: Name.create('John Doe'),
          email: Email.create('johndoe@example.com'),
          password: null as any,
          createdAt: new Date(),
        });
      }).toThrow(new InvalidParamError('Senha é obrigatório'));
    });
  });

  it('should not change the createdAt date when updating user', () => {
    const originalCreatedAt = sut.createdAt;
    sut.updateUser({ name: Name.create('Updated Name') });

    expect(sut.createdAt).toStrictEqual(originalCreatedAt);
  });

  it('should return a correct JSON representation', () => {
    const userJson = sut.toJSON();

    const output = {
      id: sut.id,
      name: userJson.name,
      email: userJson.email,
      password: userJson.password,
      createdAt: sut.createdAt,
    };

    expect(userJson).toEqual(output);
  });
});
