import {
  IsDateString,
  IsEmail,
  IsInt,
  IsString,
} from 'class-validator';

export class CreateBookingDto {

  @IsString()
  customerName!: string;

  @IsEmail()
  customerEmail!: string;

  @IsString()
  customerPhone!: string;

  @IsInt()
  wisataId!: number;

  @IsInt()
  totalTicket!: number;

  @IsDateString()
  visitDate!: string;
}