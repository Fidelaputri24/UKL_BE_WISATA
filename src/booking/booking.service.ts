import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService }
from '../prisma/prisma.service';

import { CreateBookingDto }
from './dto/create-booking.dto';

@Injectable()

export class BookingService {

  constructor(
    private prisma: PrismaService,
  ) {}

  async create(
    dto: CreateBookingDto,
  ) {

    const wisata =
      await this.prisma.wisata.findUnique({

        where: {
          id: dto.wisataId,
        },
      });

    if (!wisata) {

      throw new NotFoundException(
        'Wisata tidak ditemukan',
      );
    }

    const totalPrice =
      wisata.price *
      dto.totalTicket;

    return this.prisma.booking.create({

      data: {

        customerName:
          dto.customerName,

        customerEmail:
          dto.customerEmail,

        customerPhone:
          dto.customerPhone,

        wisataId:
          dto.wisataId,

        totalTicket:
          dto.totalTicket,

        totalPrice,

        visitDate:
          new Date(dto.visitDate),
        
      },

      include: {
        wisata: true,
      },
    });
  }

  findAll() {

    return this.prisma.booking.findMany({

      include: {
        wisata: true,
      },
    });
  }

  findOne(id: number) {

    return this.prisma.booking.findUnique({

      where: { id },

      include: {
        wisata: true,
      },
    });
  }

  updateStatus(
    id: number,
    status: string,
  ) {

    return this.prisma.booking.update({

      where: { id },

      data: {
        status: status as any,
      },
    });
  }

  remove(id: number) {

    return this.prisma.booking.delete({

      where: { id },
    });
  }

  
uploadPayment(

  id: number,

  data: {
    paymentMethod: string;

    paymentProof: string;
  },
) {

  return this.prisma.booking.update({

    where: { id },

    data: {

      paymentMethod:
        data.paymentMethod,

      paymentProof:
        data.paymentProof,

    },
  });
}
}