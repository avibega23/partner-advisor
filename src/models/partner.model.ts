import { model, models, Schema } from "mongoose";
import { IPartner } from "@/types/partner.types";

const partnerSchema = new Schema<IPartner>({
  name: { type: String },
  status: {type : String},
  profileColor: {type : String},
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Partner = models.Partner ?? model<IPartner>("Partner", partnerSchema);
