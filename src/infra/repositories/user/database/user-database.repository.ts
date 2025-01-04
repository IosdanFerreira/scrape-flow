import { Injectable } from '@nestjs/common';
import { UserEntity } from '@src/domain/entities/user/user.entity';
import { UserRepositoryInterface } from '@src/domain/repositories/user.repository';
import { PrismaService } from '@src/shared/infra/database/prisma/prisma.service';
import { UserModelMapper } from '../models/user-model.mapper';
import { NotFoundError } from '@src/shared/domain/errors/not-found.error';

Injectable();
export class UserDatabaseRepository implements UserRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<UserEntity> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

      return UserModelMapper.toEntity(user);
    } catch {
      throw new NotFoundError('User not found');
    }
  }

  async emailExist(email: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      throw new Error('Email already exist');
    }
  }

  async insert(entity: UserEntity): Promise<void> {
    await this.prisma.user.create({
      data: entity.toJSON(),
    });
  }

  async update(id: string, entity: UserEntity): Promise<void> {
    const user = await this._get(id);

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: entity.toJSON(),
    });
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this._get(id);

    return user;
  }

  async delete(id: string): Promise<void> {
    const user = await this._get(id);

    await this.prisma.user.delete({
      where: {
        id: user.id,
      },
    });
  }

  protected async _get(id: string): Promise<UserEntity> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

      return UserModelMapper.toEntity(user);
    } catch {
      throw new NotFoundError('UserModel not found');
    }
  }
}
