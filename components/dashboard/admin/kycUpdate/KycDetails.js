"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { kycDetailsStyles as styles } from "./kycDetailsStyles";

  import { toast } from 'react-toastify';
// ✅ Your reusable components
import Button from "../../../inputs/Button";
import SelectInput from "../../../inputs/SelectInput";

const KycDetails = () => {
  const router=useRouter();
  const searchParmas=useSearchParams();
  const id=searchParmas.get("id");
  const[kyc,setKyc]=useState("");
  const[status,setStatus]=useState("");
  const[rejectReason,setRejectReason]=useState("");
  const[loading,setLoading]=useState(true);
  const[updating,setUpdating]=useState("");
  const[error,setError]=useState("");
  useEffect(()=>{
    if(!id){
      setError("invalid kyc id");
      setLoading(false);
      return;
    }
    const fetchKycDetails=async()=>{
      try{
        const res=await fetch(`${process.env.API}/admin/kyc-request/${id}`);
        const result=await res.json();
        if(!res.ok){
          throw new Error(result.message ||"failed to fetch kyc");
        }
        console.log("result.data===>", result);
        setKyc(result?.data);
        setStatus(result.data.status);
        setRejectReason(result.data.reject_reason||"");
      }catch(error){
         setError(error.message);

      }finally{
        setLoading(false);
      }
    }
    fetchKycDetails();

  },[id])
 
  return (
    <Box sx={styles.wrapper}>
      {/* Header */}
      <Box sx={styles.header}>
        <Typography sx={styles.title}>KYC Details</Typography>
        <Button size="small" onClick={() => router.back()}>
          ← Go Back
        </Button>
      </Box>

   
    </Box>
  );
};

export default KycDetails;