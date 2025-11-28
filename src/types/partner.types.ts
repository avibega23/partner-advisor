import { Schema } from "mongoose";


export interface IPartner {
  _id : string;
  name: string;
  profileColor?:string;
  status: string;
  createdBy: Schema.Types.ObjectId;
}
