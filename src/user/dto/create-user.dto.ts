import {
  IsEmail,
  IsEnum,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {

  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;

  @IsEnum(['ADMIN', 'USER'])
  role!: 'ADMIN' | 'USER';
}