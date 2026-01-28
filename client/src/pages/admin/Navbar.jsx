const Navbar = ({ toggleSidebar }) => {
  return (
    <div style={styles.navbar}>
      <div style={styles.left}>
        <span style={styles.menu} onClick={toggleSidebar}>☰</span>
        <h3>Campus Portal</h3>
      </div>

      <div style={styles.right}>
        <span>Admin</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          style={styles.avatar}
        />
      </div>
    </div>
  );
};


const styles = {
  navbar: {
  height: "60px",
  background: "#161a23",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 20px",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,   
  zIndex: 1000,
},
  left: { display: "flex", alignItems: "center", gap: "15px" },
  menu: { fontSize: "22px", cursor: "pointer" },
  right: { display: "flex", alignItems: "center", gap: "10px" },
  avatar: { borderRadius: "50%" },
};

export default Navbar;
