import { NextResponse } from 'next/server';
import mongoose from "mongoose";
import dbConnect from "../../../../../../utils/dbConnect";
import KycVerification from "../../../../../../models/KycVerification";
import User from "../../../../../../models/User";
//import MailSenderService from "../../../../../../services/MailSenderService";
//import {  kycApprovedTemplate,kycRejectedTemplate,} from "../../../../../../emails/kycTemplates";

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
