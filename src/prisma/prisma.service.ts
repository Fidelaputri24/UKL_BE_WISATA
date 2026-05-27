import {
  Injectable,
  OnModuleInit,
} from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit
{
  async onModuleInit() {
    console.log('RAW DB URL:', JSON.stringify(process.env.DATABASE_URL));
    await this.$connect();
  }
}