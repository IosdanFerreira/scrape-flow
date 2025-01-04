import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConfigModule } from '@src/infra/config/environment-config/environment-config.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [EnvironmentConfigModule.forRoot()],
  providers: [ConfigService, PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {
  static forTest(prismaClient: PrismaClient): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: PrismaService,
          useFactory: () => prismaClient as PrismaService,
        },
      ],
    };
  }
}
