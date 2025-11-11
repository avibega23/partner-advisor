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
    enum: ['user', 'model'], // Ensures role can only be one of these
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Links to your User model
    required: true,
  },
  partnerId: {
    type: Schema.Types.ObjectId,
    ref: 'Partner', // Links to your Partner model
    required: true,
  },
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// 3. Create and export the model
export const Message = models.Message ?? model<IMessage>("Message", MessageSchema);