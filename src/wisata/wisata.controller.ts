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

  @Get()
  findAll() {

    return this.wisataService.findAll();
  }

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

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {

    return this.wisataService.remove(id);
  }
}



