import { Document , Schema } from "mongoose";


export interface IPartner extends Document {
  _id : string;
  name: string;
  age?: number;
  status: string;
  gender?: string;
  maritalStatus?: string;
  relationshipType?: string;
  perceivedPersonality?: string;
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
