import { Schema, Document } from 'mongoose';
export interface IMessage extends Document {
  content: string;
  role: 'user' | 'model';
  userId: Schema.Types.ObjectId;
  partnerId: Schema.Types.ObjectId;
}