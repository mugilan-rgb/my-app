import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LoginDocument = Login_Data & Document;

@Schema({ collection: 'Login_Data', timestamps: true }) 
export class Login_Data {
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: Number, default: 0 })
  delstatus: number;

  @Prop({ type: Number, default: 1 })
  activestatus: number;
}

export const LoginSchema = SchemaFactory.createForClass(Login_Data);
