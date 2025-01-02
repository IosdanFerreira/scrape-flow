import { HashAdapterInterface } from '@src/shared/application/providers/hash-provider';
import { compare, hash } from 'bcryptjs';

export class BcryptHashAdapter implements HashAdapterInterface {
  async generateHash(password: string): Promise<string> {
    return hash(password, 10);
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}
