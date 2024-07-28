import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserRequest } from './dto/create-user.request';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async createUser(data: CreateUserRequest) {
    console.log(data);
    try {
      return await this.prismaService.user.create({
        data: {
          email: data.email,
          password: await bcrypt.hash(
            data.password,
            this.configService.get<number>('HASH_SALT'),
          ),
        },
        select: { id: true, email: true },
      });
    } catch (err) {
      console.log(err);
      if (err.code === 'P2002') {
        throw new UnprocessableEntityException('Email already taken');
      }
      throw err;
    }
  }

  async getUser(filter: Prisma.UserWhereUniqueInput, returnPassword = false) {
    return await this.prismaService.user.findUniqueOrThrow({
      where: filter,
      select: { id: true, email: true, password: returnPassword },
    });
  }
}
