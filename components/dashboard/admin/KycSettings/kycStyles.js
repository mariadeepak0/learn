export const kycStyles = {
  pageWrap: {
    width: "100%",
    bgcolor: "#eef6fb",
    display: "flex",
    justifyContent: "center",
    p: 3,
  },

  card: {
    width: "100%",
    maxWidth: "980px",
    border: "1px solid #e6e9ef",
    borderRadius: "6px",
    background: "#fff",
    p: 3,
  },

  cardTitle: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#333f4f",
    mb: 1,
  },

  divider: {
    my: 2,
    borderColor: "#eef2f6",
  },

  content: {
    mt: 1,
  },

  sectionLabel: {
    fontSize: "13px",
    color: "#6b7280",
    mb: 1,
  },

  switchRow: {
    display: "flex",
    gap: 4,
    alignItems: "center",
    mb: 2,
    flexWrap: "wrap",
  },

  switchItem: {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
  },

  switchLabel: {
    fontSize: "13px",
    color: "#222831",
    minWidth: "150px",
  },

  instructions: {
    borderRadius: "4px",
    background: "#fff",
    '& .MuiOutlinedInput-root': {
      borderRadius: '4px',
    },
  },

  bottomRow: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    mt: 2,
    flexWrap: "wrap",
  },

  formControl: {
    minWidth: "220px",
    mb: 0, // Override default margin from reusable component
  },

  saveBtn: {
    background: "#0d6efd",
    color: "#fff",
    textTransform: "none",
    px: 3,
    py: 1,
    borderRadius: "4px",
    "&:hover": { 
      opacity: 0.95,
      background: "#0d6efd", // Maintain same color on hover
    },
  },
};