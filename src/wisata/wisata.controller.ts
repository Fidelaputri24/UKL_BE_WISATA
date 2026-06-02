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
  UseGuards,
} from '@nestjs/common';
import { WisataService } from './wisata.service';
import { CreateWisataDto } from './dto/create-wisata.dto';
import { UpdateWisataDto } from './dto/update-wisata.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard'
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorators';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Wisata')
@Controller('wisata')
export class WisataController {

  constructor(
    private readonly wisataService: WisataService,
  ) {}

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )

  @Roles('ADMIN')

  @ApiOperation({
  summary: 'Menambahkan wisata baru',
})

@ApiConsumes('multipart/form-data')

@ApiBody({
  schema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        example: 'Jatim Park 1',
      },
      description: {
        type: 'string',
        example: 'Wisata keluarga',
      },
      location: {
        type: 'string',
        example: 'Kota Batu',
      },
      price: {
        type: 'number',
        example: 150000,
      },
      image: {
        type: 'string',
        format: 'binary',
      },
    },
  },
})
  @Post()

  @UseInterceptors(
    FileInterceptor('image', {

      storage: diskStorage({

        destination: './uploads/wisata',

        filename: (
          req,
          file,
          callback,
        ) => {

          const uniqueName =
            Date.now() +
            extname(file.originalname);

          callback(
            null,
            uniqueName,
          );
      },
    }),
  }),
)

create(

  @UploadedFile()
  file: Express.Multer.File,

  @Body()
  body: any,
) {

  console.log('===== CREATE =====');
  console.log('FILE =', file);
  console.log('BODY =', body);

  return this.wisataService.create({
    name: body.name,
    description: body.description,
    location: body.location,
    price: Number(body.price),
    image: file?.filename,
  });
}
  @ApiOperation({
    summary: 'Menampilkan semua wisata',
  })
  @Get()
  findAll() {

    return this.wisataService.findAll();
  }

  @ApiOperation({
    summary: 'Menampilkan detail wisata berdasarkan ID',
  })
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {

    return this.wisataService.findOne(id);
  }

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles('ADMIN')

  @ApiOperation({
  summary: 'Mengubah data wisata',
})

@ApiConsumes('multipart/form-data')

@ApiBody({
  schema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        example: 'Jatim Park 1',
      },
      description: {
        type: 'string',
        example: 'Wisata keluarga',
      },
      location: {
        type: 'string',
        example: 'Kota Batu',
      },
      price: {
        type: 'number',
        example: 150000,
      },
      image: {
        type: 'string',
        format: 'binary',
      },
    },
  },
})
  @Put(':id')

  @UseInterceptors(
    FileInterceptor('image', {

      storage: diskStorage({

        destination: './uploads/wisata',

        filename: (
          req,
          file,
          callback,
        ) => {

          const uniqueName =
            Date.now() +
            extname(file.originalname);

          callback(
            null,
            uniqueName,
        );
      },
    }),
  }),
)

update(

  @Param('id', ParseIntPipe)
  id: number,

  @UploadedFile()
  file: Express.Multer.File,

  @Body()
  body: any,
) {

  console.log('===== UPDATE =====');
  console.log('FILE =', file);
  console.log('BODY =', body);

  return this.wisataService.update(
    id,
    {
      name: body.name,
      description: body.description,
      location: body.location,
      price: Number(body.price),
      image: file?.filename,
    },
  );
}

  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles('ADMIN')
  
  @ApiOperation({
  summary: 'Menghapus wisata',
})
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {

    return this.wisataService.remove(id);
  }
}



