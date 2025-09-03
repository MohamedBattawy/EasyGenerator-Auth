import { Types } from 'mongoose';

export type UserSignUpResponse = {
  message: string;
  user: {
    id: Types.ObjectId;
    email: string;
    name: string;
  };
};
