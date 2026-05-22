import {NextResponse} from "next/server";
import dbConnect from './../../../../../utils/dbConnect';
import KycSettings from "../../../../../models/KycSettings";

export async function POST(req){
    try{
        await dbConnect();
        const body=await req.json();
         console.log("kyc settings==>", body);
         const settings=await KycSettings.findOneAndUpdate({},body,{
            new:true,
            upsert:true,
         });
         console.log("saved  settings==>", settings);
         return NextResponse.json({
             message: "KYC SETTINGS SAVED",
      data: settings,
         });
    }catch(error){
         console.log("error====>", error);
         return NextResponse.json({
            message:error.message,
         },{
            status:500,
         },
        );
    }
}

export async function GET(){
   try{
      await dbConnect();
      const settings=await KycSettings.findOne();
      return NextResponse.json(
         {
        success: true,
        data: settings,
      },
      {
        status: 200,
      },
      );
   }catch(error){
       return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      },
    );
   }
}
