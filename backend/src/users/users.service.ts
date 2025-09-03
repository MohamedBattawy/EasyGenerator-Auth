import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoError } from 'mongodb';
import { Model } from 'mongoose';
import { PasswordUtils } from '../utils/password.utils';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
const UNIQUE_CONSTRAINT_ERROR_CODE = 11000;
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

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
}
