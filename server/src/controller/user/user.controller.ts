import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../models/user-data';
import { Login_Data, LoginDocument } from 'src/models/login-data-entity';
import { Repository } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
     @InjectModel('Login_Data') private readonly Logindata: Model<LoginDocument>,
  ) {}

  @Post('create')
  async create(@Req() req: Request, @Res() res: any, @Body() body: any) {
    try {
      const { email, password,devicetype,deviceid } = body;

      if (!email || !password || !deviceid || !devicetype) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const newUser = new this.Logindata({ email, password });
      const savedUser = await newUser.save();

      return res.status(200).json({
        data: savedUser,
        message: 'User created successfully',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Get()
  async findAll(@Res() res: any) {
    try {
      const users = await this.Logindata.find().exec(); 
      return res.status(200).json({
        data: users,
        message: 'Users fetched successfully',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
