export interface CacheTokenInterface {
  saveRefreshToken(
    userId: string,
    token: string,
    expiresIn: number,
  ): Promise<void>;

  getRefreshToken(userId: string, token: string): Promise<string | null>;

  deleteRefreshToken(userId: string, token: string): Promise<void>;

  addToBlacklist(token: string, expiresIn: number): Promise<void>;

  isTokenBlacklisted(token: string): Promise<boolean>;
}
