import mongoose from "mongoose";
import User from "./User";

const KycVerficationSchema= new mongoose.Schema({
     user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
     document_type: {
      type: String,
      enum: ["nid", "passport"],
      required: true,
    },
     document_number: {
      type: String,
      required: true,
    },
    documents:mongoose.Schema.Types.Mixed,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    reject_reason: {
      type: String,
      default: null,
    },

},{
    timestamps:true,
},
);
export default mongoose.models.KycVerification||mongoose.model("KycVerfication",KycVerficationSchema);