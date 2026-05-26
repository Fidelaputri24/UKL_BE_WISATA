import { IsString } from 'class-validator';

export class PaymentBookingDto {

  @IsString()
  paymentMethod!: string;
}