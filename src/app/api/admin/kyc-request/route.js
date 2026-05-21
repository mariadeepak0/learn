import { NextResponse } from "next/server";
import dbConnect from './../../../../../utils/dbConnect';
import KycVerfication from "../../../../../models/KycVerification";

export async function GET(){
    try{
        await dbConnect();
        const kycRequests=await KycVerfication.find()
        .populate("user_id", "name  email")
        .sort({createdAt:-1});
          return NextResponse.json({
      success: true,
      data: kycRequests,
    });
    }catch(error){
        return NextResponse.json(
      {
        success: false,
        message: "FAILED TO FETCH kyc requests",
      },
      {
        status: 500,
      },
    );
    }
}
