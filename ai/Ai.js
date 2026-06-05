"use server";

import { GoogleGenAI } from "@google/genai";

const ai=new GoogleGenAI({apiKey:process.env.GOOGLE_API_KEY});

export async function runAi(prompt){
    try{
        const safePromt=
        typeof prompt==="string"?prompt:JSON.stringify(prompt,null,2);
        const response = await ai.models.generateContent({
            model:"gemini-3-flash-preview",
            contents:safePromt,
        });
        console.log("response ===>", response);
        return response.text;

    }catch(error){
        console.log("ai error", error);
    throw new Error("ai  generation failed");
    }
}
