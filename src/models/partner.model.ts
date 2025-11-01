import { model, models, Schema } from "mongoose";
import { IPartner } from "@/types/partner.types";

const partnerSchema = new Schema<IPartner>({
  name: { type: String },
  status: {type : String},
  gender: { type: String },
  age:{type:Number},
  maritalStatus: { type: String },
  relationshipType: { type: String },
  perceivedPersonality: { type: String },
  userPerception: {
    type: new Schema({
      communicationRating: Number,
      biggestChallenge: String,
      loveLanguage: String,
    }),
    required: false,
  },
  conflictResolution: {
    type: new Schema({
      conflictStyle: String,
      commonDisagreements: [String],
    }),
    required: false,
  },
  lifestyle: {
    type: new Schema({
      freeTimeSpend: String,
      socialLife: String,
    }),
    required: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Partner = models.Partner ?? model<IPartner>("Partner", partnerSchema);
