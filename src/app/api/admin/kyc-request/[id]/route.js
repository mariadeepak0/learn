import { NextResponse } from 'next/server';
import mongoose from "mongoose";
import dbConnect from "../../../../../../utils/dbConnect";
import KycVerification from "../../../../../../models/KycVerification";
import User from "../../../../../../models/User";
import MailSenderService from "../../../../../../services/MailSenderService";
import {  kycApprovedTemplate,kycRejectedTemplate,} from "../../../../../../emails/kycTemplates";

export async function GET(req,{params}){
    try{
        await dbConnect();
        const{id}=await params;
        console.log("id====>", id);
        if(!mongoose.Types.ObjectId.isValid(id)){
           return NextResponse.json(
        {
          success: false,
          message: "Invalid KYC ID",
        },
        { status: 400 }
      ); 
        }
        const kycRequest=await KycVerification.findById(id).populate(
            "user_id",
      "name email"
        );
         if (!kycRequest) {
      return NextResponse.json(
        {
          success: false,
          message: "KYC request not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      data: kycRequest,
    });
    }catch(error){
        console.log("FETCH KYC BY ID ERROR:", error);
        return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch KYC request",
      },
      { status: 500 }
    );
    }
}

export async function PUT(req,{params}){
  try{
    await dbConnect();
    const {id}=await params;
    const{status,reject_reason}=await req.json();
    console.log({
      id,
      status,

      reject_reason,
    });
    if(!["pending","approved","rejected"].includes(status)){
        return NextResponse.json(
        { success: false, message: "Invalid status value" },
        { status: 400 }
      );
    }
    if(reject_reason && reject_reason.length>500){
       return NextResponse.json(
        {
          success: false,
          message: "Reason must not exceed 500 characters",
        },
        { status: 400 }
      );
    }
    const kyc=await KycVerification.findById(id);
    if(!kyc){
      return NextResponse.json(
        { success: false, message: "KYC record not found" },
        { status: 404 }
      );
    }
    kyc.status=status;
    kyc.reject_reason=status==="rejected"?reject_reason:null;
    await kyc.save();

    const user=await User.findById(kyc.user_id);
    if(!user){
        return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    if(status==="approved"){
      user.kyc_status=true;
      user.user_type="author"

    }else if(status==="rejected"){
       user.kyc_status = false;
      user.user_type = "user";
    }else{
      user.kyc_status = false;
    }
    const userdata=await user.save();
    console.log("userdata===>",   userdata)
    if(status==="approved"){
      await MailSenderService.sendMail({
        to:user.email,
        subject:"your kyc has been approved",
        html:kycApprovedTemplate({name:user.name}),
      });
      console.log("email send")

    }
     if (status === "rejected") {
       await MailSenderService.sendMail({
        to: user.email,
        subject: "Your KYC has been rejected",
        html: kycRejectedTemplate({
          name: user.name,
          reason: reject_reason,
        }),
       });
       console.log("email resected")
      
    }
     return NextResponse.json(
      {
        success: true,
        message: "KYC status updated successfully",
      },
      { status: 200 }
    );



  }catch(error){
    console.error("KYC update error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
