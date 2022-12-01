import React, { useContext } from "react";
import { Modal } from "antd";
import { AppContext } from "../../context/AppProvider";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LogoutModal() {
    const { isLogoutModalOpen, setIsLogoutModalOpen, title } =
        useContext(AppContext);
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
                title="Thông báo"
                centered
                open={isLogoutModalOpen}
                onCancel={handleCancel}
                onOk={handleLogout}
                cancelText="Không"
                okText="Xác nhận"
            >
                <span style={{ fontSize: "16px" }}>
                    <a>{title}</a>
                </span>
            </Modal>
        </div>
    );
}
