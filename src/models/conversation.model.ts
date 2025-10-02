import { Document,model, models, Schema } from "mongoose";

interface IConversation extends Document {
  user: Schema.Types.ObjectId;
  partner: Schema.Types.ObjectId;
  messages: Schema.Types.ObjectId[]; // Array of message IDs
  createdAt: Date;
  updatedAt: Date;
}

const conversationSchema: Schema<IConversation> = new Schema<IConversation>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    partner: {
      type: Schema.Types.ObjectId,
      ref: "Partner", // Links the conversation to the partner profile being discussed
      required: true,
    },
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  {
    timestamps: true, // For createdAt and updatedAt
  }
);

export const Conversation = models.Conversation ?? model<IConversation>("Conversation", conversationSchema);