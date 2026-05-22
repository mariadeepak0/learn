export const kycDetailsStyles = {
  wrapper: {
    maxWidth: 1100,
    mx: "auto",
    p: { xs: 2, sm: 3 },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 3,
  },

  title: {
    fontSize: 18,
    fontWeight: 600,
  },

  card: {
    borderRadius: 2,
    p: { xs: 2, sm: 3 },
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    py: 1.5,
    borderBottom: "1px solid #f0f0f0",
    flexDirection: { xs: "column", sm: "row" },
    gap: { xs: 0.5, sm: 0 },
  },

  label: {
    fontSize: 13,
    color: "#6b7280",
    fontWeight: 500,
  },

  value: {
    fontSize: 14,
    fontWeight: 500,
    color: "#111827",
  },

  statusChip: {
    bgcolor: "#e7f7ef",
    color: "#067647",
    fontWeight: 600,
    height: 24,
  },

  /* 🔥 FINAL ACTION LAYOUT */
  actionSection: {
    mt: 3,
    display: "flex",
    flexDirection: "column",
    gap: 1.5,
    maxWidth: 320,   // keeps layout clean on desktop
  },

  updateBtn: {
    height: 40,
    width: "100%",
    textTransform: "none",
    fontWeight: 600,
  },
};