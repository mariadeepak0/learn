"use client";

import React from "react";
import {
  Box,
  Typography,
  Chip,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";

const statusChip = (status, styles) => {
  if (status === "approved") return styles.approvedChip;
  if (status === "rejected") return styles.rejectedChip;
  return styles.pendingChip;
};

const KycRequestsMobileCards = ({ data, styles }) => {
    const router=useRouter();
    const handleView = (id) => {
   
    router.push(`/dashboard/admin/kyc-update?id=${id}`);
  };
 

  return (
    <Box sx={styles.cardList}>
      {data.map((row) => (
        <Box key={row._id} sx={styles.card}>
          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>Name</Typography>
            <Typography sx={styles.mobileValue}>
              {row.user_id?.name || "-"}
            </Typography>
          </Box>

          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>Email</Typography>
            <Typography sx={styles.mobileValue}>
              {row.user_id?.email || "-"}
            </Typography>
          </Box>

          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>Document</Typography>
            <Typography sx={styles.mobileValue}>
              {row.document_type}
            </Typography>
          </Box>

          <Box sx={styles.mobileRow}>
            <Typography sx={styles.mobileLabel}>Status</Typography>
            <Chip
              label={row.status}
              sx={statusChip(row.status, styles)}
            />
          </Box>

          {/* ✅ Mobile Actions */}
          <Box sx={styles.mobileActions}>
            <IconButton
              sx={styles.mobileActionBtn}
              onClick={() => handleView(row._id)}
            >
              <VisibilityIcon fontSize="small" />
              View
            </IconButton>

            <IconButton
              sx={{
                ...styles.mobileActionBtn,
                ...styles.mobileDeleteBtn,
              }}
            >
              <DeleteIcon fontSize="small" />
              Delete
            </IconButton>
          </Box>
        </Box>
      ))}

      {data.length === 0 && (
        <Typography align="center">No KYC requests found</Typography>
      )}
    </Box>
  );
};

export default KycRequestsMobileCards;