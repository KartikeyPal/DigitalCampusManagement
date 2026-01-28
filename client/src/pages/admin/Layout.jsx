import { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#0f1117" }}>
      <Navbar toggleSidebar={() => setOpen(!open)} />
      <Sidebar open={open} close={() => setOpen(false)} />

      <div
        style={{
          marginTop: "60px",
          marginLeft: open ? "220px" : "0",
          transition: "margin-left 0.3s",
          padding: "24px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
