import { Document } from "mongoose";

export interface IUser extends Document {
    _id:string;
    name: string;
    email : string;
    kindeId : string;
    gender : string;
    age : number;
    maritalStatus : string;
    adventurous : number;
    coreValues : string[];
    birdOrOwl : boolean;
    stressHandling : string;
    communicationStyle : string;
    closeFriendDescribe : string;
    freeTimeSpend : string;

}