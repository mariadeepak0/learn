import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import dbConnect from './../../../../utils/dbConnect';
import KycVerification from "./../../../../models/KycVerification"
import {getServerSession} from "next-auth/next";

import { authOptions } from './../../../../utils/authOptions';

cloudinary.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(reg){
    try{
        await dbConnect();
        const session=await getServerSession(authOptions);
        if(!session?.user?._id){
            return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
        }
        const formData=await reg.formData()
        const file=formData.get("document");
        const document_type=formData.get("documeny_type");
        const document_number=formData.get("document_number");
        const user_id=session?.user?._id;
        if(!file){
             return NextResponse.json(
        { message: "Document is required" },
        { status: 400 }
      );
        }
        const buffer=Buffer.from(await file.arrayBuffer());
        const uploadResult=await new Promise((resolve,reject)=>{
            cloudinary.uploader
            .upload_stream({
                folder:"kyc_documents",
                resource_type:"auto",
            },
            (error,result)=>{
                if(error) reject(error)
                    else resolve(result)
            }
        )
        .end(buffer);
        });
        const kyc=await KycVerification.create({
             user_id,
      document_type,
      document_number,
      documents: {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
        resource_type: uploadResult.resource_type,
        format: uploadResult.format,
      },
      status:"pending"
        });
         console.log("kyc=====>", kyc);
         return NextResponse.json({ success: true, data: kyc }, { status: 201 });

    }catch(error){
         return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
