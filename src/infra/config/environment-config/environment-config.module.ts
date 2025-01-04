import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { DynamicModule, Module } from '@nestjs/common';
import { EnvironmentConfigService } from './environment-config.service';
import { join } from 'node:path';

@Module({
  imports: [ConfigModule],
  providers: [EnvironmentConfigService],
  exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule extends ConfigModule {
  static forRoot(options?: ConfigModuleOptions): Promise<DynamicModule> {
    return super.forRoot({
      ...options,
      envFilePath: [
        join(__dirname, `../../../../.env.${process.env.NODE_ENV}`),
      ],
    });
  }
}
