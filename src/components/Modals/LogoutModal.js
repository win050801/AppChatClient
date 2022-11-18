import React, { useContext } from "react";
import { Modal } from "antd";
import { AppContext } from "../../context/AppProvider";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function LogoutModal() {
  const { isLogoutModalOpen, setIsLogoutModalOpen } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    setIsLogoutModalOpen(false);
  };

  const handleCancel = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <div>
      <Modal
        title="Xác nhận"
        centered
        open={isLogoutModalOpen}
        onCancel={handleCancel}
        onOk={handleLogout}
        cancelText="Không"
        okText="Đăng xuất"
      >
        <span style={{ fontSize: "16px" }}>
          Bạn có muốn đăng xuất khỏi Yalo?
        </span>
      </Modal>
    </div>
  );
}
