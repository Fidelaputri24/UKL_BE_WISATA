import {
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateWisataDto {

  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsString()
  location!: string;

  @IsInt()
  price!: number;

  @IsOptional()
  @IsString()
  image?: string;
}
