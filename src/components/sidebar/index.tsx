import { Button, styled } from "@mui/material";

const SidebarContent = styled("div")(() => ({
  display: "flex",
  gap: "16px",
  "& .MuiButtonBase-root": {
    fontWeight: " 600",
    fontSize: " 1rem",
    border: " 1px solid yellow",
    borderRadius: " 8px",
    padding: " 8px 16px",
    textTransform: "lowercase",
    "&:last-child": {
      backgroundColor: "yellow",
    },
  },
}));

const Sidebar = () => {
  return (
    <SidebarContent>
      <Button color="inherit">Log In</Button>
      <Button color="inherit">Register</Button>
    </SidebarContent>
  );
};

export default Sidebar;
