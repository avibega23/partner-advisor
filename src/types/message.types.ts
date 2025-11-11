import { Schema, Document } from 'mongoose';
export interface IMessage extends Document {
  content: string;
  role: 'user' | 'model'; // 'model' is what Gemini/Google calls the AI
  userId: Schema.Types.ObjectId;
  partnerId: Schema.Types.ObjectId;
}