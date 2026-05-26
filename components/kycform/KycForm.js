"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { toast } from "react-toastify";

import {
  TextInput,
  SelectInput,
  Button,
} from "../inputs";

import { kycStyles } from "./kycFormStyles";

export default function KycForm({ userId }) {
    const[loading,setLoading]=useState(false);
    const[docType,setDocType]=useState("");
    const[documentNumber,setDocumentNumber]=useState("");
    const[file,setFile]=useState(null);
    const[fileName,setFileName]=useState("");
      const [instructions, setInstructions] = useState("");
  const [docOptions, setDocOptions] = useState([]);
  useEffect(()=>{
    const fetchSettings=async()=>{
        try{
            const res=await fetch(`${process.env.API}/admin/kyc-settings`);
            const data=await res.json();
            if(res.ok && data?.data){
                const options=[];
                if(data.data.nid_verification){
                    options.push({value:"nid",label:"NID"});
                }
                if (data.data.passport_verification) {
            options.push({ value: "passport", label: "Passport" });
          }
          setDocOptions(options);
          setInstructions(data.data.instructions ||"");
            }
        }catch{
            toast.error("failed to load kyc settings")
        }
    };
    fetchSettings();
  },[]);
  const handleFileChange=(e)=>{
     if (!e.target.files?.length) return;
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  }
    
    const handleSubmit=async(e)=>{
      e.preventDefault();
      if(!docType) return toast.error("please select document type");
      if(!documentNumber)
        return toast.error("please enter document number");
      if(!file)
        return toast.error("please upload document");
      setLoading(true);
      const formData=new FormData();
      formData.append("document",file);
      formData.append("document_type",docType);
      formData.append("document_number",documentNumber);
      formData.append("user_id",userId);
      try{
        const res=await fetch(`/api/kyc-verfication`,{
          method:"POST",
          body:formData,
        });
        if(!res.ok) throw new Error();
        toast.success("kyc submitted");
        setDocType("");
        setDocumentNumber("");
        setFile(null);
        setFileName("");
      }catch{
        toast.error("failed to submit");
      }finally{
        setLoading(false);
      }

    }

  return (
    <Box component="section" sx={kycStyles.root}>
      <Box sx={kycStyles.header}>
        <Typography variant="body2">
          Home &gt; Kyc Verification
        </Typography>
        <Typography variant="h5">Kyc Verification</Typography>
      </Box>

      <Box sx={kycStyles.container}>
        <Box sx={kycStyles.card} component="form" onSubmit={handleSubmit}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            KYC Verification!
          </Typography>
          {instructions &&(
            <Typography variant="body2" sx={{mb:2}}>
                {instructions}

            </Typography>
          )}
          {docOptions.length>0 &&(
            <SelectInput
            label="Document Type"
            name="document_type"
            value={docType}
            onChange={(e)=>setDocType(e.target.value)}
            options={docOptions}
            />
          )}
           <TextInput
            label="Document Number"
            name="document_number"
            value={documentNumber}
            onChange={(e) => setDocumentNumber(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box sx={kycStyles.fileRow}>
            <Button
            variant="outlined"
            component="label"
            startIcon={<UploadFileIcon/>}>
                Browse..
                <input
                hidden
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFileChange}
                />

            </Button>
            <Typography variant="body2" sx={{ml:2}}>
                {fileName|| "no file selected"}

            </Typography>

          </Box>
          <Button
          type="submit"
          variant="contained"
          loading={loading}
          sx={kycStyles.submitBtn}
          endIcon={<ArrowUpwardIcon/>}
          disabled={!docOptions.length}>
            Submit

          </Button>

      
        </Box>
      </Box>
    </Box>
  );
}