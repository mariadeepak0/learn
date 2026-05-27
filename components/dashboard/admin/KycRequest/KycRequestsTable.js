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
import KycRequestsMobileCards from "./KycRequestsMobileCards";

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
                const res=await fetch("/api/admin/kyc-request");
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
      {loading &&(
        <Box sx={{py:6,textAlign:"center"}}>
            <CircularProgress/>

        </Box>
      )}
      {!loading && !isMobile &&(
        <TableContainer component={Paper} sx={styles.tablePaper}>
           <Table sx={styles.table}>
            <TableHead>
                <TableRow>
                     <TableCell sx={styles.th}>Name</TableCell>
                <TableCell sx={styles.th}>Email</TableCell>
                <TableCell sx={styles.th}>Document</TableCell>
                <TableCell sx={styles.th}>Status</TableCell>
                <TableCell sx={{ ...styles.th, textAlign: "right" }}>
                  Actions
                </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((row)=>(
                    <TableRow key={row._id} sx={styles.tr}>
                        <TableCell sx={styles.td}>
                            {row.user_id?.name||"-"}

                        </TableCell>
                         <TableCell sx={styles.td}>
                    {row.user_id?.email || "-"}
                  </TableCell>
                   <TableCell sx={styles.td}>
                    {row.document_type}
                  </TableCell>
                  <TableCell sx={styles.td}>
                    <Chip label={row.status} sx={statusChip(row.status)} />
                  </TableCell>
                  <TableCell sx={{...styles.td,...styles.tdRight}}>
                    <IconButton size="small"
                    sx={styles.actionBtn}
                    onClick={()=>handleView(row._id)}>
                        <VisibilityIcon fontSize="small"/>

                    </IconButton>
                    <IconButton size="small"
                    color="error"
                    sx={styles.actionBtn}>
                        <DeleteIcon fontSize="small"/>

                    </IconButton>

                  </TableCell>

                    </TableRow>
                ))}
                {data.length===0 &&(
                    <TableRow>
                        <TableCell colSpan={5} align="center">
                            No kyc request found

                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
            </Table> 

        </TableContainer>
      )}
      {!loading && isMobile &&(
        <KycRequestsMobileCards data={data} styles={styles}/>

      )}
                    
    </Box>
  );
};

export default KycRequestsTable;