import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserSignUpResponse } from './types/user.types';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
        id: user._id,
        email: user.email,
        name: user.name,
      },
    };
  }
}
