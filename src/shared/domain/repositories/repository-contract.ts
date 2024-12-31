export interface RepositoryContract<T> {
  insert(entity: T): Promise<void>;
  update(id: string, entity: T): Promise<void>;
  findById(id: string): Promise<T>;
  findAll(): Promise<T[]>;
  delete(id: string): Promise<void>;
}
