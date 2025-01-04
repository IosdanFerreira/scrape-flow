import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './shared/infra/database/database.module';
import { EnvironmentConfigModule } from './infra/config/environment-config/environment-config.module';
import { EnvironmentConfigService } from './infra/config/environment-config/environment-config.service';

@Module({
  imports: [EnvironmentConfigModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService, EnvironmentConfigService],
})
export class AppModule {}
