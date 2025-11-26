import { Schema, Document } from 'mongoose';
export interface IMessage extends Document {
  _id:string;
  content: string;
  role: 'user' | 'model'; // 'model' is what Gemini/Google calls the AI
  userId: Schema.Types.ObjectId;
  partnerId: Schema.Types.ObjectId;
}