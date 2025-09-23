import  {Document, model, models, Schema } from "mongoose";

interface IPartner extends Document {
  name: string;
  gender: string;
  maritalStatus: string;
  relationshipType: string;
  perceivedPersonality: string;
  userPerception?: {
    communicationRating: number;
    biggestChallenge: string;
    loveLanguage?: string;
  };
  conflictResolution?: {
    conflictStyle: string;
    commonDisagreements: string[];
  };
  lifestyle?: {
    freeTimeSpend: string;
    socialLife: string;
  };
  createdBy: Schema.Types.ObjectId;
}

const partnerSchema: Schema<IPartner> = new Schema<IPartner>({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  maritalStatus: {
    type: String,
    required: true,
  },
  relationshipType: {
    type: String,
    required: true,
  },
  perceivedPersonality: {
    type: String,
    required: true,
  },
  userPerception: {
    communicationRating: Number,
    biggestChallenge: String,
    loveLanguage: String,
  },
  conflictResolution: {
    conflictStyle: String,
    commonDisagreements: [String],
  },
  lifestyle: {
    freeTimeSpend: String,
    socialLife: String,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Partner = models.Partner ?? model<IPartner>("Partner", partnerSchema);