import { EmailValueObject } from 'src/domain/value-objects/email/email.value-object';
import { Entity } from 'src/shared/domain/entities/Entity';

export class UserEntity extends Entity<UserProps> {
  constructor(props: UserProps, id?: string) {
    // Chama o construtor da classe pai (`Entity`) para inicializar as propriedades e o ID.
    super(id, props);
  }
}

type UserProps = {
  name: string;
  email: EmailValueObject;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};
