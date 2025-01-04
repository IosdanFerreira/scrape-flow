import { Injectable } from '@nestjs/common';
import { EnvironmentConfigInterface } from './environment-config.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService implements EnvironmentConfigInterface {
  constructor(private readonly configService: ConfigService) {}

  getAppPort(): number {
    return Number(this.configService.get<number>('PORT'));
  }
  getNodeEnv(): string {
    return this.configService.get<string>('NODE_ENV');
  }
}
