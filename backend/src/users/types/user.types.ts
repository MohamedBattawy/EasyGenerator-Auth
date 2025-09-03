export type UserSignUpResponse = {
  message: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
};

export type SignInResponse = {
  message: string;
  token: string;
};

export type CurrentUserResponse = {
  message: string;
  user: {
    userId: string;
    email: string;
    name: string;
  };
};
