import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiBody,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({
    summary: 'Login user',
    description: 'Login menggunakan email dan password',
  })

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'user@gmail.com',
        },
        password: {
          type: 'string',
          example: '123456',
        },
      },
    },
  })

  @Post('login')
  login(
    @Body() body: any,
  ) {
    return this.authService.login(
      body.email,
      body.password,
    );
  }
}