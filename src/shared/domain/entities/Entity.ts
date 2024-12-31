import { v4 as uuidv4 } from 'uuid';

/**
 * Classe abstrata base para entidades do sistema.
 * Esta classe fornece uma estrutura comum para objetos que possuem um identificador único (id)
 * e um conjunto de propriedades (props).
 *
 * @template Props - Tipo das propriedades específicas de cada entidade.
 */
export abstract class Entity<Props = any> {
  protected constructor(
    public readonly id: string,
    public readonly props: Props,
  ) {
    this.id = id || uuidv4();
    this.props = props;
  }

  /**
   * Retorna o identificador único da entidade.
   *
   * @returns Um identificador único (string) gerado no momento da criação da entidade.
   */
  getId(): string {
    return this.id;
  }
}
