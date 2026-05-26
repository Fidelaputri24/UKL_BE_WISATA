import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { JwtService } from '@nestjs/jwt';

import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(
    email: string,
    password: string,
  ) {

    const user =
      await this.prisma.user.findUnique({
        where: { email },
      });

    if (!user) {
      throw new UnauthorizedException(
        'Email tidak ditemukan',
      );
    }

    const passwordValid =
      await bcrypt.compare(
        password,
        user.password,
      );

    if (!passwordValid) {
      throw new UnauthorizedException(
        'Password salah',
      );
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      message: 'Login berhasil',
      access_token:
        this.jwtService.sign(payload),
    };
  }
}