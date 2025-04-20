import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';

import { BadRequestError } from './shared/domain/errors';
import { BadRequestErrorFilter } from './shared/infra/exception-filters/bad-request-error.filter';
import { ConflictErrorFilter } from './shared/infra/exception-filters/conflict-error.filter';
import { InvalidParamErrorErrorFilter } from './shared/infra/exception-filters/invalid-param-error.filter';
import { NotFoundErrorFilter } from './shared/infra/exception-filters/not-found-error.filter';
import { Reflector } from '@nestjs/core';
import { UnauthorizedErrorFilter } from './shared/infra/exception-filters/unauthorized-error.filter';
import { WrapperDataInterceptor } from './shared/infra/interceptors/wrapper-data.interceptor';

export function applyGlobalConfig(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));

        return new BadRequestError(
          'Erro na validação dos parâmetros enviados',
          [...result],
        );
      },
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(
    new WrapperDataInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );

  app.useGlobalFilters(
    new ConflictErrorFilter(),
    new NotFoundErrorFilter(),
    new BadRequestErrorFilter(),
    new UnauthorizedErrorFilter(),
    new InvalidParamErrorErrorFilter(),
  );
}
