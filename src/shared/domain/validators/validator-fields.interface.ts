export type FieldsErrors = {
  [field: string]: string[];
};

export interface ValidatorFieldsInterface<ValidatedProps> {
  error: FieldsErrors;
  validatedData: ValidatedProps;
  validate(data: any): void;
}
