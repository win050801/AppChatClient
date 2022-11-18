import React, { useContext } from "react";
import { Modal } from "antd";
import { AppContext } from "../../context/AppProvider";
import "./style.css";

export default function DeleteGroupModal() {
  const { isDeleteGroupModalOpen, setIsDeleteGroupModalOpen } =
    useContext(AppContext);

  const handleOk = () => {
    // Xóa nhóm và xóa tin nhắn
    setIsDeleteGroupModalOpen(false);
  };

  const handleCancel = () => {
    setIsDeleteGroupModalOpen(false);
  };

  return (
    <div>
      <Modal
        title="Giải tán nhóm"
        centered
        open={isDeleteGroupModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        cancelText="Không"
        okText="Giải tán nhóm"
      >
        <span style={{ fontSize: "16px" }}>
          Mời tất cả mọi người rời nhóm và xóa tin nhắn? <br />
          Nhóm đã giải tán sẽ KHÔNG THỂ khôi phục.
        </span>
      </Modal>
    </div>
  );
}
