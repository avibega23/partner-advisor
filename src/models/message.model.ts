import  {Document,   model, models, Schema } from "mongoose";

interface IMessage extends Document {
  conversationId: Schema.Types.ObjectId;
  role: 'user' | 'gemini'; // Differentiates who sent the message
  content: string;
  createdAt: Date;
}

const messageSchema: Schema<IMessage> = new Schema<IMessage>(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'gemini'], // Must be one of these two values
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // This adds the 'createdAt' field
  }
);

export const Message = models.Message ?? model<IMessage>("Message", messageSchema);