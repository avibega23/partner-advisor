import Document, { model, models, Schema } from "mongoose";


interface IUser extends Document {

    email: string;
    name: string;
    gender : string;
    maritalStatus : string;
    adventurous : number;
    coreValues : string[];
    birdOrOwl : boolean;
    stressHandling : string;
    communicationStyle : string;
    closeFriendDescribe : string;
    freeTimeSpend : string;

}

const userModel : Schema<IUser>  = new Schema<IUser>({

    email : {
        type : String,
        required : [true,"email is required"]
    },
    name : {
        type : String,
        required : [true,"name is required"]
    },
    gender : {
        type : String,
        required : [true,"gender is required"]
    },
    maritalStatus : {
        type : String,
        required : [true,"marital status is required"]
    },
    adventurous : {
        type : Number,
        required : [true,"adventurous is required"]
    },
    coreValues : {
        type : ["String"],
        required : [true,"core values is required"]
    },
    birdOrOwl : {
        type  : Boolean,
        required : [true,"bird or owl is required"]
    },
    stressHandling : {
        type : String,
        required : [true,"stress handling is required"]
    },
    communicationStyle : {
        type : String,
        required : [true,"communication style is required"]
    },
    closeFriendDescribe : {
        type : String,
        required : [true,"close friend describe is required"]
    },
    freeTimeSpend : {
        type : String,
        required : [true,"free time spend is required"]
    }
});

export const User = models.User ?? model<IUser>("User",userModel);