import { ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger';

export class UserInfoDto {
  @ApiProperty({
    description: 'Unique user identifier',
    example: '507f1f77bcf86cd799439011',
  })
  userId: string;

  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
    format: 'email',
  })
  email: string;
}

export class UserInfoResponse {
  @ApiProperty({
    description: 'Response message',
    example: 'User created successfully',
  })
  message: string;

  @ApiProperty({
    description: 'User information',
    type: UserInfoDto,
  })
  user: UserInfoDto;
}

export class SignInResponseDto {
  @ApiProperty({
    description: 'Response message',
    example: 'User logged in successfully',
  })
  message: string;

  @ApiProperty({
    description: 'JWT authentication token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  token: string;
}

export class LogoutResponseDto {
  @ApiProperty({
    description: 'Response message',
    example: 'User logged out successfully',
  })
  message: string;
}

// API Operation decorators
export const ApiUserSignupOperation = () =>
  ApiOperation({
    summary: 'User registration',
    description: 'Create a new user account with email, name, and password',
  });

export const ApiUserSigninOperation = () =>
  ApiOperation({
    summary: 'User authentication',
    description: 'Sign in with email and password to get authentication token',
  });

export const ApiUserGetCurrentOperation = () =>
  ApiOperation({
    summary: 'Get current user info',
    description:
      'Retrieve information about the currently authenticated user from their JWT token',
  });

export const ApiUserLogoutOperation = () =>
  ApiOperation({
    summary: 'User logout',
    description:
      'Clear the JWT token cookie to log out the current user and invalidate their session',
  });

// API Response decorators
export const ApiUserCreatedResponse = () =>
  ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: UserInfoResponse,
  });

export const ApiUserSignInResponse = () =>
  ApiResponse({
    status: 200,
    description: 'User successfully authenticated',
    type: SignInResponseDto,
  });

export const ApiUserInfoResponse = () =>
  ApiResponse({
    status: 200,
    description: 'Current user information retrieved successfully',
    type: UserInfoResponse,
  });

export const ApiUserLogoutResponse = () =>
  ApiResponse({
    status: 200,
    description: 'User successfully logged out - JWT token cleared',
    type: LogoutResponseDto,
  });
