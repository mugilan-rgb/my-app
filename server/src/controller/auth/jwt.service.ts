import { Injectable } from '@nestjs/common';
import  * as jwt  from 'jsonwebtoken';


@Injectable()
export class JWTService {
  
    private readonly jwtSecret:any = process.env.JWT_SECRET;
  
    generateToken(payload: any): string {
      return jwt.sign(payload, this.jwtSecret, { expiresIn: '12h' });
    }
  
    verifyToken(token: string): any {
      try {
        return jwt.verify(token, this.jwtSecret);
      } catch (err) {
        throw new Error('Invalid or expired token');
      }
    }

}
