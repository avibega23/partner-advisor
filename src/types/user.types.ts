export interface IUser extends Document {
  name?: string;
  email: string;
  emailVerified?: Date;
  image?: string;
  hashedPassword?: string; 
  personality?: {
    communicationStyle?: string;
    conflictStyle?: string;
    loveLanguage?: string;
    selfDescription?: string;
  };
}