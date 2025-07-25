import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserSchema } from './models/user-data';
import { AuthController } from './controller/auth/auth.controller';
import { HttpModule } from '@nestjs/axios';
import { LoginSchema } from './models/login-data-entity';
import { JWTService } from './controller/auth/jwt.service';

@Module({
  imports: [ConfigModule.forRoot(),
  MongooseModule.forRoot(process.env.MONGO_URI!),
   MongooseModule.forFeature([ 
    {name:'User',schema:UserSchema},
    { name: 'Login_Data', schema: LoginSchema}
   ]),HttpModule
  ],
  controllers: [AuthController],
  providers: [JWTService],
})
export class AppModule { }
