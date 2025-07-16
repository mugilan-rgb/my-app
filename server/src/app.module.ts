import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './controller/user/user.controller';
import { UserSchema } from './models/user-data';

@Module({
  imports: [ConfigModule.forRoot(),
  MongooseModule.forRoot(process.env.MONGO_URI!),
   MongooseModule.forFeature([ 
    {name:'User',schema:UserSchema}
   ])
  ],
  controllers: [UserController],
  providers: [AppService],
})
export class AppModule { }
