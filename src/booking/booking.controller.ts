import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BookingService }from './booking.service';
import { CreateBookingDto }from './dto/create-booking.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard }from '../auth/guards/jwt.auth.guard';
import { RolesGuard }from '../auth/guards/roles.guard';
import { Roles }from '../auth/decorators/roles.decorators';
import { FileInterceptor }from '@nestjs/platform-express';
import { diskStorage }from 'multer';
import { extname }from 'path';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Booking')
@ApiBearerAuth() 
@Controller('booking')
export class BookingController {

  constructor(
    private readonly bookingService:
    BookingService,
  ) {}

  @ApiOperation({
    summary: 'Membuat booking wisata',
  })
  @Post()
  create(

    @Body()
    dto: CreateBookingDto,
  ) {

    return this.bookingService.create(
      dto,
    );
  }


  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles('ADMIN')

  @ApiOperation({
    summary: 'menampilkan semua booking',
  })
  @Get()
  findAll() {

    return this.bookingService.findAll();
  }

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )


  @Roles('ADMIN')

  @ApiOperation({
    summary: 'Menampilkan booking berdasarkan id',
  })
  @Get(':id')
  findOne(

    @Param('id', ParseIntPipe)
    id: number,
  ) {

    return this.bookingService.findOne(id);
  }

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles('ADMIN')

  @ApiBody({
  schema: {
    type: 'object',
    properties: {
      status: {
        type: 'string',
        example: 'SUCCESS',
      },
    },
  },
})
  @Put(':id/status')
  updateStatus(

    @Param('id', ParseIntPipe)
    id: number,

    @Body('status')
    status: string,
  ) {

    return this.bookingService.updateStatus(
      id,
      status,
    );
  }

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles('ADMIN')

  @ApiOperation({
  summary: 'Menghapus booking',
  })
  @Delete(':id')
  remove(

    @Param('id', ParseIntPipe)
    id: number,
  ) {

    return this.bookingService.remove(id);
  }

@ApiOperation({
  summary: 'Upload bukti pembayaran',
})

@ApiConsumes('multipart/form-data')

@ApiBody({
  schema: {
    type: 'object',
    properties: {
      paymentMethod: {
        type: 'string',
        example: 'Transfer Bank',
      },
      paymentProof: {
        type: 'string',
        format: 'binary',
      },
    },
  },
})
  @Put(':id/payment')
  @UseInterceptors(

  FileInterceptor('paymentProof', {

    storage: diskStorage({

      destination:
        './uploads/payment',

      filename: (
        req,
        file,
        callback,
      ) => {

        const uniqueName =
          Date.now() +
          extname(
            file.originalname,
          );

        callback(
          null,
          uniqueName,
        );
      },
    }),
  }),
)

uploadPayment(

  @Param('id', ParseIntPipe)
  id: number,

  @UploadedFile()
  file: Express.Multer.File,

  @Body()
  body: any,
) {

  return this.bookingService.uploadPayment(

    id,

    {
      paymentMethod:
        body.paymentMethod,

      paymentProof:
        file?.filename,
    },
  );
}
}