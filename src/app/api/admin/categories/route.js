import {NextResponse} from "next/server";
import dbConnect from "./../../../../../utils/dbConnect";
import Category from "./../../../../../models/Category";
import slugify from "slugify";

export async function POST(req){
    try{
        await dbConnect();
        const body=await req.json();
         console.log("category======>", body);
         
    }
}