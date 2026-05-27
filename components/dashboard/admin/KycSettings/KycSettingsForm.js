"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Divider,
} from "@mui/material";

import {
  TextInput,
  SelectInput,
  Button,
  SwitchInput,
} from "../../../inputs";

import { kycStyles } from "./kycStyles";
import { toast } from "react-toastify";

export default function KycSettingsForm() {
  const[loading,setLoading]=useState(false);
  const[formData,setFormData]=useState({
    instructions: "",
    nid_verification: false,
    passport_verification: false,
    auto_approve: false,
    status: true,
  });
    useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`/api/admin/kyc-settings`);

        const data = await res.json();

        if (res.ok && data.data) {
          setFormData({
            instructions: data.data.instructions,
            nid_verification: data.data.nid_verification ?? false,
            passport_verification: data.data.passport_verification ?? false,
            auto_approve: data.data.auto_approve ?? false,
            status: data.data.status ?? true,
          });
        }
      } catch (error) {
        console.log("failed to load kyc settings", error);
      }
    };

 fetchSettings()

  }, []);
  const handleChange=(e)=>{
    const{name,value,type,checked}=e.target;
    setFormData((prev)=>({
        ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value === "true"
            ? true
            : value === "false"
              ? false
              : value,
    }));

  };
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true);
    try{
      const res=await fetch("/api/admin/kyc-settings",{
        method:"POST",
        headers:{
            "Content-Type": "applivation/json",
        },
        body:JSON.stringify(formData),
      });
      const data=await res.json();
      if(!res.ok) throw new Error(data.message);
      toast.success("Kyc setting saved success")
    }catch(error){
      toast.error(error.message ||"failed to save")
    }finally{
      setLoading(false);
    }

  };
    const yesNoOptions = [
    { value: "true", label: "Yes" },
    {
      value: "false",
      label: "No",
    },
  ];

  const statusOptions = [
    {
      value: "true",
      label: "Active",
    },
    {
      value: "false",
      label: "Inactive",
    },
  ];
 
  return (
    <Box sx={kycStyles.pageWrap}>
      <Paper elevation={0} sx={kycStyles.card}>
        <Typography variant="h6" sx={kycStyles.cardTitle}>
          KYC Settings
        </Typography>

        <Divider sx={kycStyles.divider} />

        <Box component="form" onSubmit={handleSubmit} sx={kycStyles.content}>
          <Typography sx={kycStyles.sectionLabel}>
            Verification Types
          </Typography>
          <Box sx={kycStyles.switchRow}>
              <Box sx={kycStyles.switchItem}>
              <Typography>NID Verification</Typography>
              <SwitchInput
                name="nid_verification"
                checked={formData.nid_verification}
                onChange={handleChange}
              />
            </Box>
            <Box sx={kycStyles.switchItem}>
              <Typography>Passport Verification</Typography>
              <SwitchInput
                name="passport_verification"
                checked={formData.passport_verification}
                onChange={handleChange}
              />

            </Box>

          </Box>

         
          <Typography sx={{ ...kycStyles.sectionLabel, mt: 1 }}>
            Instructions
          </Typography>
           <TextInput
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            multiline
            minRows={4}
            fullWidth
          />
           <SelectInput
            label="Auto Approve"
            name="auto_approve"
            value={String(formData.auto_approve)}
            onChange={handleChange}
            options={yesNoOptions}
            size="small"
          />
          <SelectInput
            label="KYC Status"
            name="status"
            value={String(formData.status)}
            onChange={handleChange}
            options={statusOptions}
            size="small"
          />
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>

          
        </Box>
      </Paper>
    </Box>
  );
}