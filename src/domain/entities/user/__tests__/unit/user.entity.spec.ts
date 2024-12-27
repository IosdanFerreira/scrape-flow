import { UserDataBuilder } from '../../testing/helpers/user-data-builder';
import { UserEntity } from '../../user.entity';

describe('UserEntity unit tests', () => {
  it('Should create a valid user', () => {
    const input = UserDataBuilder({});

    const output = UserEntity.create(input);

    expect(output.name.getName()).toBe(input.name.getName());
    expect(output.email.getEmail()).toStrictEqual(input.email.getEmail());
    expect(output.password.getPassword()).toStrictEqual(input.password.getPassword());
  });
});
