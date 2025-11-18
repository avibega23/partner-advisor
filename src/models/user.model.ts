import { model, models, Schema } from "mongoose";
import { IUser } from "@/types/user.types";


const userModel = new Schema<IUser>({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  emailVerified: {
    type: Date
  },
  image: {
    type: String
  },
  hashedPassword: {
    type: String,
  },
  
  personality: {
    type: {
      communicationStyle: {
        type: String,
        enum: ["Direct", "Empathetic", "Analytical", "Reserved"],
      },
      conflictStyle: {
        type: String,
        enum: ["Avoidant", "Confrontational", "Compromising", "Collaborative", "Accommodating"],
      },
      loveLanguage: {
        type: String,
        enum: ["Words of Affirmation", "Acts of Service", "Receiving Gifts", "Quality Time", "Physical Touch"],
      },
      selfDescription: {
        type: String,
        maxlength: 500,
      }
    },
    default: {} 
  }

}, {
  timestamps: true // Adds createdAt and updatedAt
});

export const User = models.User ?? model<IUser>("User", userModel);