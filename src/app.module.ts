import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/infra/auth.module';
import { DatabaseModule } from './shared/infra/database/database.module';
import { EnvConfigModule } from './shared/infra/modules/env-config/env-config.module';
import { JwtConfigModule } from './shared/infra/modules/jwt-config/jwt-config.module';
import { Module } from '@nestjs/common';
import { SharedModule } from './shared/infra/modules/shared/shared.module';
import { UserModule } from './modules/user/infra/user.module';

@Module({
  imports: [
    DatabaseModule,
    SharedModule,
    EnvConfigModule,
    JwtConfigModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
