import { Schema } from 'mongoose';
export interface IMessage  {
  content: string;
  role: 'user' | 'model';
  userId?: Schema.Types.ObjectId;
  partnerId?: Schema.Types.ObjectId;
}