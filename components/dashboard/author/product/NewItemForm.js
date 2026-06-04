"use client";
// --- ONE-LINER findDOMNode polyfill (very simple) ---
if (typeof window !== "undefined")
  try {
    const rd = require("react-dom");
    if (!rd.findDOMNode)
      rd.findDOMNode = (inst) =>
        inst?.current ?? (inst && inst.nodeType === 1 ? inst : null);
  } catch (e) {}

import React, { useState, useEffect } from "react";
import { Box, Typography, Divider, Paper } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { marked } from "marked";
import Button from "@/components/inputs/Button";
import TextInput from "@/components/inputs/TextInput";
import CategoryAttributes from "./CategoryAttributes";
import styles from "./newItemStyles";
import FilesSection from "./FilesSection";
import SupportPricingSection from "./SupportPricingSection";
import { fetchCategories } from "@/slice/categorySlice";
import { fetchSubcategories } from "@/slice/subcategorySlice";

import FreeItemReviewerSection from "./FreeItemReviewerSection";
import { runAi } from "@/ai/Ai";
import axios from "axios";
import { createAuthorItem } from "@/slice/authorItemSlice";

const NewItemForm = () => {
 




  return (
    <Box sx={styles.page}>
      {/* Header */}
      <Box sx={styles.header}>
        <Box>
          <Typography sx={styles.title}>New Item</Typography>
          <Typography sx={styles.subtitle}>Manage your items.</Typography>
        </Box>

        <Button variant="contained" onClick={() => router.back()}>
          Back
        </Button>
      </Box>

  

    </Box>
  );
};

export default NewItemForm;