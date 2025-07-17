import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { JWTService } from 'src/controller/auth/jwt.service';
import { InjectModel } from '@nestjs/mongoose';
import { Repository } from 'typeorm';
import { Login_Data, LoginDocument } from 'src/models/login-data-entity';
import { Model } from 'mongoose';

@Controller('auth')
export class AuthController {
    constructor(private readonly httpService: HttpService, private readonly JWTService: JWTService,
        @InjectModel('Login_Data') private readonly loginModel: Model<LoginDocument>,

    ) { }

    @Post('ip')
    async getIp(@Req() req: Request, @Res() res: Response) {
        try {
            const ipRaw = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '';
            let ip = ipRaw.split(',')[0].trim().replace('::ffff:', '');
            if (ip === '::1') {
                ip = '127.0.0.1';
            }
            const result = {
                deviceID: ip,
            };
            return res.status(200).json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Post('register')
    async register(@Req() req: Request, @Res() res: Response, @Body() body) {
        try {
            const { ipaddress } = body
            console.log(ipaddress);

            const Details = await this.GETIP(ipaddress)
            console.log("Details", Details);

            const details = {
                deviceID: ipaddress,
                country: Details.country,
                timezone: Details.timezone,
                countryCode: Details.countryCode,
                region: Details.region
            }
            console.log("details", details);

            return res.status(200).json(details)
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async GETIP(ip: string) {
        const response = await firstValueFrom(
            this.httpService.get(`http://ip-api.com/json/${ip}`)
        );

        console.log("IP Details:", response.data);
        return response.data;
    }

    @Post('login')
    async login(@Body() body, @Res() res: Response) {
        try {
            const { email, password, deviceid, devicetype } = body;

            if (!email || !password || !deviceid || !devicetype) {
                return res.status(400).json('Missing email or password');
            }

           const user = await this.loginModel.findOne({ email, delstatus: 0, activestatus: 1 })
            if (!user) {
                return res.status(400).json('Invalid email or user not found');
            }

            if (user.password !== password) {
                return res.status(400).json('Incorrect password');
            }

            const token = this.JWTService.generateToken({ email });

            return res.status(200).json({ jwtToken: token });

        } catch (err) {
            return res.status(500).json(err);
        }
    }


}
