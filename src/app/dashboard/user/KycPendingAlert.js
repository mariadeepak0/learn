"use client";

import React, { useEffect, useState } from "react";
import { Alert, AlertTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const KycPendingAlert=()=>{
    const {data:session,status}=useSession();
    const router=useRouter();
     const [kycVerificationStatus, setKycVerificationStatus] = useState(null);
  const [userKycStatus, setUserKycStatus] = useState(null);
  const [open, setOpen] = useState(true);
  useEffect(()=>{
    if(!session?.user?._id) return;
    const fetchKycStatus=async()=>{
        try{
              const res = await fetch(`${process.env.API}/user/kyc/my-status`);
              const data=await res.json();
              if(data.success){
                setUserKycStatus(data.kyc_status);
                setKycVerificationStatus(data.kyc_verification?.status ?? null)
              }
        }catch(err){
             console.error("KYC fetch failed", err);
        }
    }
    fetchKycStatus();


  },[session]);
 // if(status==="loading") return null;
  useEffect(()=>{
     if (
      userKycStatus === true &&
      kycVerificationStatus === "approved"
    ) {
      router.replace("/dashboard/author");
    }

  },[userKycStatus,kycVerificationStatus,router]);
  if(!open) return null;

  const isPending=userKycStatus===false && kycVerificationStatus==="pending";
  const isRejected= userKycStatus=== false && kycVerificationStatus==="rejected";
  if(isRejected){
    return(
        <Alert
        security="error"
        sx={{mb:2,borderRadius:2}}
        action={
            <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={()=>setOpen(false)}>
                <CloseIcon fontSize="inherit"/>

            </IconButton>
        }>
            <AlertTitle>Kyc rejected</AlertTitle>
            your kyc verification is rejected

        </Alert>
    )
  }
  if(isPending){
    return(
        <Alert
        severity="warning"
        sx={{ mb: 2, borderRadius: 2 }}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => setOpen(false)}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        <AlertTitle>KYC Pending</AlertTitle>
        Your KYC request is pending. You will get notified when it is approved.
      </Alert>  
    )
  }
  return null;
}
export default KycPendingAlert;