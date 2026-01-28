const Sidebar = ({ open, close }) => {
  return (
    <div
      style={{
        ...styles.sidebar,
        left: open ? "0" : "-220px",
      }}
    >
      <p onClick={close}>Dashboard</p>
      <p onClick={close}>Student</p>
      <p onClick={close}>Faculty</p>
    </div>
  );
};

const styles = {
  sidebar: {
    position: "fixed",
    top: "60px",
    width: "220px",
    height: "100%",
    background: "#1c2030",
    padding: "20px",
    transition: "left 0.3s",
    zIndex: 999,
  },
};

export default Sidebar;
