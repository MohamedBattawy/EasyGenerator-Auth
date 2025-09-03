import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { JwtUtils } from '../utils/jwt.utils';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import {
  ApiUserCreatedResponse,
  ApiUserGetCurrentOperation,
  ApiUserInfoResponse,
  ApiUserLogoutOperation,
  ApiUserLogoutResponse,
  ApiUserSignInResponse,
  ApiUserSigninOperation,
  ApiUserSignupOperation,
} from './dto/swagger-user-info.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtUtils: JwtUtils,
  ) {}

  private getCookieOptions() {
    return {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
    };
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiUserSignupOperation()
  @ApiBody({ type: CreateUserDto })
  @ApiUserCreatedResponse()
  async signup(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.usersService.create(createUserDto);

    if (!user._id) {
      throw new Error('User creation failed - missing user ID');
    }

    res.status(HttpStatus.CREATED).json({
      message: 'User created successfully',
      user: {
        userId: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    });
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiUserSigninOperation()
  @ApiBody({ type: SignInDto })
  @ApiUserSignInResponse()
  async signin(@Body() signInDto: SignInDto, @Res() res: Response) {
    const result = await this.usersService.signIn(signInDto);

    res.cookie('jwt', result.token, {
      ...this.getCookieOptions(),
      maxAge: this.jwtUtils.getExpirationTimeMs(),
    });

    res.status(HttpStatus.OK).json({
      message: result.message,
      token: result.token,
    });
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiUserGetCurrentOperation()
  @ApiUserInfoResponse()
  async getCurrentUser(@Req() req: Request): Promise<any> {
    const token = req.cookies?.jwt as string | undefined;

    if (!token) {
      throw new Error('No authentication token provided. Please login first.');
    }

    return await this.usersService.getCurrentUser(token);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiUserLogoutOperation()
  @ApiUserLogoutResponse()
  async logout(@Req() req: Request, @Res() res: Response) {
    const token = req.cookies?.jwt as string | undefined;

    if (!token) {
      throw new Error('No authentication token provided. Please login first.');
    }

    const result = await this.usersService.logout();

    res.clearCookie('jwt', this.getCookieOptions());

    return res.json(result);
  }
}
