import { model, models, Schema } from "mongoose";
import { IMessage } from "@/types/message.types";

const MessageSchema: Schema = new Schema({
  content: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['user', 'model'], 
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  partnerId: {
    type: Schema.Types.ObjectId,
    ref: 'Partner',
    required: true,
  },
}, {
  timestamps: true 
});


export const Message = models.Message ?? model<IMessage>("Message", MessageSchema);