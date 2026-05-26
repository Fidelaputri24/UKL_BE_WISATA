import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule} from './prisma/prisma.module';
import { WisataModule } from './wisata/wisata.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({

      rootPath: join(
        __dirname,
        '..',
        'uploads',
      ),
      serveRoot: '/uploads',
    }),
    AuthModule, 
    UserModule, 
    PrismaModule, 
    WisataModule, 
    BookingModule
  ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
