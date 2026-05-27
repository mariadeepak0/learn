import {NextResponse} from "next/server";
import dbConnect from "./../../../../../utils/dbConnect";
import Category from "./../../../../../models/Category";
import slugify from "slugify";

export async function POST(req){
    try{
        await dbConnect();
        const body=await req.json();
         console.log("category======>", body);
         
         if(!body.categort_name||!body.file_types?.length){
            return NextResponse.json(
        {
          message: "Category name and  file types are required",
        },
        {
          status: 400,
        },
      );
         }
         const category=await Category.create({
            name:body.categort_name,
            slug:slugify(body.categort_name,{lower:true}),
            fileTypes:body.file_types,
            show_at_featured: body.show_at_featured ?? false,
      show_at_nav: body.show_at_nav ?? false,
         });
          return NextResponse.json(category, { status: 201 });
         
    }catch(error){
      return NextResponse.json({ message: error.message }, { status: 500 });  
    }
}

export async function GET(){
    try{
        await dbConnect();
        const categories=await Category.find().sort({
            createdAt:-1,
        });
        return NextResponse.json(categories);
    }catch(error){
        return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 },
    );
    }
}