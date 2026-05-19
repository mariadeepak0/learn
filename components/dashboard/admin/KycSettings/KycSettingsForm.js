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

         
          <Typography sx={{ ...kycStyles.sectionLabel, mt: 1 }}>
            Instructions
          </Typography>

          
        </Box>
      </Paper>
    </Box>
  );
}