"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Typography,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import { kycRequestsStyles as styles } from "./kycRequestsStyles";
//import KycRequestsMobileCards from "./KycRequestsMobileCards";

const statusChip=(status)=>{
    if(status==="approved") return styles.approvedChip;
    if(status==="rejected") return styles.rejectedChip;
    return styles.pendingChip;
};


const KycRequestsTable = () => {
    const isMobile=useMediaQuery("(max-width:9oopx)");
    const router=useRouter();
    const[data,setData]=useState([]);
    const[loading,setLoading]=useState(true);
    useEffect(()=>{
        const fetchKycRequests=async()=>{
            try{
                const res=await fetch(`${process.env.API}/admin/kyc-request`);
                const result=await res.json();
                if(result.success){
                    setData(result.data);
                }

            }catch(error){
                console.error("Failed to fetch KYC requests", error);
            }finally{
                setLoading(false);
            }
        };
        fetchKycRequests();

    },[]);
    const handleView=(id)=>{
        router.push(`/dashboard/admin/kyc-update?id=${id}`);
    };
 
  return (
    <Box sx={styles.wrapper}>
      <Typography sx={styles.headerTitle}>KYC Requests</Typography>
      <Typography sx={styles.headerSubtitle}>
        Review and manage user verification requests
      </Typography>
                    
    </Box>
  );
};

export default KycRequestsTable;