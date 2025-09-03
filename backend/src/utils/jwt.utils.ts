import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface JwtPayload {
  userId: string;
  email: string;
  name: string;
}

@Injectable()
export class JwtUtils {
  constructor(private jwtService: JwtService) {}

  generateToken(payload: JwtPayload): string {
    const expiresInDays = process.env.JWT_EXPIRES_IN || '30';
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'secret',
      expiresIn: `${expiresInDays}d`,
    });
  }

  verifyToken(token: string): JwtPayload {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET || 'secret',
    });
  }

  getExpirationTimeMs(): number {
    const expiresInDays = parseInt(process.env.JWT_EXPIRES_IN || '30');
    return expiresInDays * 24 * 60 * 60 * 1000;
  }
}
