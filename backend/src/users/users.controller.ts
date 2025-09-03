import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { JwtUtils } from '../utils/jwt.utils';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import {
  CurrentUserResponse,
  SignInResponse,
  UserSignUpResponse,
} from './types/user.types';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtUtils: JwtUtils,
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserSignUpResponse> {
    const user = await this.usersService.create(createUserDto);

    if (!user._id || !user.email || !user.name) {
      throw new Error('User creation failed - missing required fields');
    }

    return {
      message: 'User created successfully',
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
      },
    };
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() signInDto: SignInDto, @Res() res: Response) {
    const result: SignInResponse = await this.usersService.signIn(signInDto);

    res.cookie('jwt', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: this.jwtUtils.getExpirationTimeMs(),
    });

    return res.json({
      message: result.message,
      token: result.token,
    });
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  async getCurrentUser(@Req() req: Request): Promise<CurrentUserResponse> {
    const token = req.cookies?.jwt as string | undefined;

    if (!token) {
      throw new UnauthorizedException('No authentication token provided');
    }

    return await this.usersService.getCurrentUser(token);
  }
}
