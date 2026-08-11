import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { UserDto } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async Create(user: UserDto) {
    const email = user.email;
    const isEmailExist = await this.prisma.user.findFirst({ where: { email } });

    if (isEmailExist) {
      throw new ConflictException('User already Exist');
    }

    return this.prisma.user.create({ data: user });
  }

  async FindOne(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async FindAll() {
    return await this.prisma.user.findMany();
  }
}
