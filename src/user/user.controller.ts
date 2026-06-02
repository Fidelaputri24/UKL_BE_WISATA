import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) {}

  @ApiOperation({
    summary: 'Membuat user baru',
  })
  @Post()
  create(
    @Body() dto: CreateUserDto,
  ) {
    return this.usersService.create(dto);
  }

  @ApiOperation({
    summary: 'Menampilkan semua user',
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({
    summary: 'Menampilkan detail user berdasarkan ID',
  })
  @Get(':id')
  findOne(
    @Param('id') id: number,
  ) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({
    summary: 'Mengubah data user',
  })
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.update(id, dto);
  }

  @ApiOperation({
    summary: 'Menghapus user',
  })
  @Delete(':id')
  remove(
    @Param('id') id: number,
  ) {
    return this.usersService.remove(id);
  }
}