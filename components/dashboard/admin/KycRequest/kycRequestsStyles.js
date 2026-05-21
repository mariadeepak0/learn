export const kycRequestsStyles = {
  /* Wrapper */
  wrapper: {
    width: "100%",
    p: { xs: 2, sm: 3 },
    bgcolor: "#F7FBFF",
    borderRadius: 2,
    mx: "auto",
    maxWidth: { lg: 1200, xl: 1400 },
    fontFamily: "Inter, Roboto, Arial, sans-serif",
  },

  headerTitle: {
    fontSize: { xs: "18px", sm: "20px" },
    fontWeight: 700,
    color: "#0b1826",
    mb: 0.5,
  },

  headerSubtitle: {
    fontSize: "13px",
    color: "#6B7280",
    mb: 2,
  },

  /* Table */
  tablePaper: {
    width: "100%",
    overflowX: "auto",
    bgcolor: "transparent",
    boxShadow: "none",
  },

  table: {
    minWidth: 650,
  },

  th: {
    fontSize: "13px",
    color: "#890eee",
    fontWeight: 700,
    px: 2,
    whiteSpace: "nowrap",
  },

  tr: {
    "&:last-child td": { borderBottom: 0 },
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      bgcolor: "#F9F5FF",
      transform: "translateY(-1px)",
      boxShadow: "0 4px 12px rgba(137, 14, 238, 0.1)",
      "& td": {
        color: "#890eee",
      },
    },
  },

  td: {
    fontSize: "14px",
    color: "#111827",
    px: 2,
    py: 1.4,
    whiteSpace: "nowrap",
    transition: "color 0.2s ease-in-out",
  },

  tdRight: {
    textAlign: "right",
  },

  /* Chips */
  pendingChip: {
    bgcolor: "#FEF3C7",
    color: "#92400E",
    fontWeight: 700,
    fontSize: "13px",
    height: 28,
    borderRadius: "8px",
  },

  approvedChip: {
    bgcolor: "#ECFDF5",
    color: "#065F46",
    fontWeight: 700,
    fontSize: "13px",
    height: 28,
    borderRadius: "8px",
  },

  rejectedChip: {
    bgcolor: "#FFF1F2",
    color: "#B91C1C",
    fontWeight: 700,
    fontSize: "13px",
    height: 28,
    borderRadius: "8px",
  },

  /* Actions */
  actionBtn: {
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      color: "#890eee",
      transform: "scale(1.1)",
    },
  },

  /* Mobile cards */
  cardList: {
    display: { xs: "flex", md: "none" },
    flexDirection: "column",
    gap: 2,
  },

  card: {
    p: 2.5,
    borderRadius: 2,
    border: "1px solid #EFF2F7",
    bgcolor: "#FFFFFF",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 25px rgba(137, 14, 238, 0.15)",
      borderColor: "#890eee",
    },
  },

  mobileRow: {
    display: "flex",
    justifyContent: "space-between",
    mb: 1,
  },

  mobileLabel: {
    fontSize: "12px",
    color: "#6B7280",
  },

  mobileValue: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#111827",
    },
  
  
  
   /* Mobile actions */
  mobileActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 1,
    pt: 2,
    mt: 2,
    borderTop: "1px solid #f0f0f0",
  },

  mobileActionBtn: {
    display: "flex",
    alignItems: "center",
    gap: 0.5,
    fontSize: "13px",
    fontWeight: 600,
    color: "#890eee",
    px: 1.5,
    py: 0.8,
    borderRadius: 1,
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      bgcolor: "#F9F5FF",
      transform: "scale(1.05)",
    },
  },

  mobileDeleteBtn: {
    color: "#B91C1C",
    "&:hover": {
      bgcolor: "#FFF1F2",
    },
  },
  
  
};