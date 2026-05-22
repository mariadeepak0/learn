import mongoose from 'mongoose';

const KycSettingsSechema=new mongoose.Schema({
    instructions:{
        type:String,
        default:null,
    },
     nid_verification: {
      type: Boolean,
      default: false,
    },
    passport_verification: {
      type: Boolean,
      default: false,
    },
     auto_approve: {
      type: Boolean,
      default: false,
    },
     status: {
      type: Boolean,
      default: true,
    },
},{
    timestamps:true,
});
export default mongoose.models.KycSettings||mongoose.model("KycSettings",KycSettingsSechema);