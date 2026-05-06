import {NextResponse} from "next/server";
import bcrpt from "bcrypt";
import User from "../../../../models/User";
import dbConnect from "../../../../utils/dbConnect";

export async function POST(req){
    try{
        await dbConnect();
        const body=await req.json();
        const{name,email,password}=body;
        if(!name||!email||!password){
            return NextResponse.json({
                 err: "All Fields are required",
            },{
               status: 400 
            });
        }
        const existingUser=await User.findOne({email});
        if(existingUser){
             return NextResponse.json(
        {
          err: "email  alredy in use",
        },
        { status: 409 }
      );
        }
        const hashedPassword=await bcrpt.hash(password,10);
        const user=await User.create({
             name: name,
      email: email,
      password: hashedPassword,
        });
         console.log("user saved", user);
        return NextResponse.json(
      {
        msg: "user registred  successfully",
      },
      { status: 200 }
    );  
    }catch(error){
        console.log("error", error);

    return NextResponse.json(
      { err: error.message || "server  error" },
      { status: 500 }
    );
    }
}
