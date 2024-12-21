export class SignUpUseCase {
  async execute(input: SignupInput): Promise<any> {
    if (!input.name || !input.email || !input.password) {
      throw new Error('Invalid params');
    }
  }
}

export type SignupInput = {
  name: string;
  email: string;
  password: string;
};

export type SignupOutput = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
};
