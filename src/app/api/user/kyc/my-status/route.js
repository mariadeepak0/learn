import { NextResponse } from "next/server";
import dbConnect from './../../../../../../utils/dbConnect';
import KycVerification from "./../../../../../../models/KycVerification";
import User from "./../../../../../../models/User";
import { getServerSession } from "next-auth";
import {authOptions} from "./../../../../../../utils/authOptions";

export async function GET(){
    try{
        await dbConnect();
        const session =await getServerSession(authOptions);
        if (!session?.user?._id) {
      return NextResponse.json({ success: false }, { status: 401 });
    }
    const[kyc,user]=await Promise.all([
        KycVerification.findOne({user_id:session.user._id}).select(
            "status reject_reason"
        ),
        User.findById(session.user._id).select("kyc_status"),
    ]);
     return NextResponse.json({
      success: true,
      kyc_status: user?.kyc_status ?? false,
      kyc_verification: kyc,
    });
    }catch(error){
         return NextResponse.json(
      {
        success: false,
        message: "KYC status fetch failed",
      },
      {
        status: 500,
      },
    );
    }
}