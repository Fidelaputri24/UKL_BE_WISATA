import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateWisataDto } from './dto/create-wisata.dto';

import { UpdateWisataDto } from './dto/update-wisata.dto';

@Injectable()
export class WisataService {

  constructor(
    private prisma: PrismaService,
  ) {}

  create(dto: CreateWisataDto) {

    return this.prisma.wisata.create({
      data: dto,
    });
  }

  findAll() {

    return this.prisma.wisata.findMany();
  }

  findOne(id: number) {

    return this.prisma.wisata.findUnique({
      where: { id },
    });
  }

  update(
    id: number,
    dto: UpdateWisataDto,
  ) {

    return this.prisma.wisata.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {

    return this.prisma.wisata.delete({
      where: { id },
    });
  }
}