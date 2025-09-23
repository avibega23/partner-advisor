import{ Document, model, models, Schema } from "mongoose";


interface IUser extends Document {

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

const userModel = new Schema<IUser>({

    name : {
        type : String,
      
    },
    email : {
        type : String
    },
    kindeId : {
        type : String
    },
    gender : {
        type : String,

    },
    age : {
        type : Number,
    },
    maritalStatus : {
        type : String,
       
    },
    adventurous : {
        type : Number,
      
    },
    coreValues : {
        type : [String],
 
    },
    birdOrOwl : {
        type  : Boolean,
        
    },
    stressHandling : {
        type : String,
        
    },
    communicationStyle : {
        type : String,
       
    },
    closeFriendDescribe : {
        type : String,
        
    },
    freeTimeSpend : {
        type : String,
        
    }
});

export const User = models.User ?? model<IUser>("User",userModel);