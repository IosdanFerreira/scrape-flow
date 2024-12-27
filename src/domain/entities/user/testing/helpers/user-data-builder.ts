import { faker } from '@faker-js/faker';
import { NameValueObject } from '@src/domain/value-objects/name/name.value-object';
import { EmailValueObject } from '@src/domain/value-objects/email/email.value-object';
import { encryptedPasswordRegex, PasswordValueObject } from '@src/domain/value-objects/password/password.value-object';
import RandExp from 'randexp';

type Props = {
  name?: NameValueObject;
  email?: EmailValueObject;
  password?: PasswordValueObject;
  createdAt?: Date;
};

export function UserDataBuilder(props: Props) {
  return {
    name: props.name ?? NameValueObject.create(`${faker.person.firstName()} ${faker.person.lastName()}`,),
    email: props.email ?? EmailValueObject.create(faker.internet.email()),
    password: props.password ?? PasswordValueObject.create(new RandExp(encryptedPasswordRegex).gen()),
    createdAt: props.createdAt ?? new Date(),
  };
}
