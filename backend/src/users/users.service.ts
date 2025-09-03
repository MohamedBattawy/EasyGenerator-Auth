import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoError } from 'mongodb';
import { Model } from 'mongoose';
import { JwtUtils } from '../utils/jwt.utils';
import { PasswordUtils } from '../utils/password.utils';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { User, UserDocument } from './schemas/user.schema';
import { CurrentUserResponse, SignInResponse } from './types/user.types';
const UNIQUE_CONSTRAINT_ERROR_CODE = 11000;
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtUtils: JwtUtils,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const hashedPassword = await PasswordUtils.hashPassword(
      createUserDto.password,
    );

    const createdUser = new this.userModel({
      email: createUserDto.email,
      name: createUserDto.name,
      password: hashedPassword,
    });

    try {
      return await createdUser.save();
    } catch (error) {
      if (
        error instanceof MongoError &&
        error.code === UNIQUE_CONSTRAINT_ERROR_CODE
      ) {
        throw new ConflictException('User with this email already exists');
      }
      throw error;
    }
  }

  async signIn(signInDto: SignInDto): Promise<SignInResponse> {
    const user = await this.userModel
      .findOne({ email: signInDto.email })
      .exec();

    if (!user) {
      throw new NotFoundException('Email not found');
    }

    const isPasswordValid = await PasswordUtils.comparePassword(
      signInDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect password');
    }

    const token = this.jwtUtils.generateToken({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
    });

    return {
      message: 'User logged in successfully',
      token,
    };
  }

  getCurrentUser(token: string): Promise<CurrentUserResponse> {
    try {
      const payload = this.jwtUtils.verifyToken(token);
      return Promise.resolve({
        message: 'User is authenticated',
        user: {
          userId: payload.userId,
          email: payload.email,
          name: payload.name,
        },
      });
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async logout(): Promise<{ message: string }> {
    return Promise.resolve({
      message: 'User logged out successfully',
    });
  }
}
