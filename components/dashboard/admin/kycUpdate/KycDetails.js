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

  },[id]);
  const handleUpdate=async(e)=>{
    e.preventDefault();
    if(status==="rejected" && !rejectReason.trim()){
      toast.error("rejecte the reason");
      return;
    }
    setUpdating(true);
    try{
      const res=await fetch(`${process.env.API}/admin/kyc-request/${id}`,{
        method:"PUT",
        headers:{
           "Content-Type": "application/json",
        },
        body:JSON.stringify({
          status,
          reject_reason:status==="rejected"?rejectReason:null,
        }),
      });
      const result=await res.json();
       if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed  to  update kyc  status");
      }
      setKyc(result.data);
      toast.success("kyc updated");
      router.push("/dashboard/admin/kyc-request")
    }catch(error){
      toast.error(error.message);
    }finally{
      setUpdating(false);
    }

  };
  if(loading){
    return(
      <Box
      sx={{
          py: 8,
          textAlign: "center",
        }}>
          <CircularProgress/>

      </Box>
    )
  }
  if(error){
    return(
      <Box
       sx={{
          py: 8,
          textAlign: "center",
        }}>
          <Typography color="error">{error}</Typography>
          <Button
          sx={{
            mt: 2,
          }}
          onClick={()=>router.back()}>
            Go Back

          </Button>


      </Box>
    )
  }
 
  return (
    <Box sx={styles.wrapper}>
      {/* Header */}
      <Box sx={styles.header}>
        <Typography sx={styles.title}>KYC Details</Typography>
        <Button size="small" onClick={() => router.back()}>
          ← Go Back
        </Button>
      </Box>
      {JSON.stringify({kyc},null,4)}
      <Paper sx={styles.card}>
        <Box sx={styles.row}>
          <Typography sx={styles.label}>Name</Typography>
          <Typography sx={styles.value}>{kyc?.user_id?.name}</Typography>

        </Box>
        <Box sx={styles.row}>
          <Typography sx={styles.label}>Email</Typography>
           <Typography sx={styles.value}>{kyc?.user_id?.email}</Typography>

        </Box>
        <Box sx={styles.row}>
          <Typography sx={styles.label}>Document Type</Typography>
          <Typography sx={styles.value}>{kyc?.document_type}</Typography>

        </Box>
        <Box sx={styles.row}>
          <Typography sx={styles.label}>Document Number</Typography>
          <Typography sx={styles.value}>{kyc?.document_number}</Typography>
        </Box>
        <Box sx={styles.row}>
          <Typography sx={styles.label}>Document</Typography>
          {kyc?.documents?.url?(
            <Box sx={{display:"flex",gap:2}}>
              <Typography sx={{
                ...styles.value,
                color:"#2563eb",
                cursor:"pointer",
                textDecoration:"underline",
              }}
              onClick={()=>window.open(kyc.documents?.url,"_blank")}>
                View

              </Typography>
              <Typography
               sx={{
                  ...styles.value,
                  color: "#16a34a",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={()=>{
                  const link=document.createElement("a");
                  link.href=kyc?.documents?.url;
                  link.download=`kyc-${kyc._id}.${kyc.documents.format || "file"}`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                >
                  Download

              </Typography>

            </Box>
          ):(
            <Typography sx={styles.value}>No document uploaded</Typography>
          )}

        </Box>
        {kyc?.documents &&
        kyc.documents.resource_type==="image"&&
        kyc.documents.format!=="pdf"&&
        kyc.documents.url&&(
          <Box sx={{mt:2}}>
            <img
            src={kyc.documents.url}
            alt="kyc documents"
            style={{
               maxWidth: "100%",
                  maxHeight: 320,
                  borderRadius: 8,
                  border: "1px solid #e5e7eb",

            }}/>

          </Box>
        )}
        <Box sx={styles.row}>
          <Typography sx={styles.label}>Current status</Typography>
          <Chip label={kyc?.status} sx={styles.statusChip}/>

        </Box>
        <Box sx={styles.actionSection}>
          <SelectInput
          label="Action"
          name="status"
          value={status}
          onChange={(e)=>setStatus(e.target.value)}
          options={[
             { label: "Approved", value: "approved" },
              { label: "Rejected", value: "rejected" },

              { label: "Pending", value: "pending" },
          ]}
          size="small"
          fullWidth/>
          {status==="rejected"&&(
            <TextField
            label="Reject reason"
            multiline
            minRows={3}
            value={rejectReason}
            onChange={(e)=>setRejectReason(e.target.value)}
            fullWidth
            placeholder="enter rejection reson"
            />
          )}
          <Button 
          sx={styles.updateBtn}
          loading={updating}
          onClick={handleUpdate}>
            Update

          </Button>

        </Box>


      </Paper>

   
    </Box>
  );
};

export default KycDetails;