import React, { useContext } from "react";
import { Modal } from "antd";
import { AppContext } from "../../context/AppProvider";
import "../Message/style.css";
import { useNavigate } from "react-router-dom";

export default function Notify() {
    const { isOpenNotify, setIsOpenNotify } = useContext(AppContext);
    const navigate = useNavigate();
    const handleOpenNotify = () => {
        setIsOpenNotify(true);
    };
    return (
        <div>
            <Modal
                title="Xác nhận"
                centered
                open={isOpenNotify}
                //  onCancel={handleOpenNotify}
                //  onOk={handleOpenNotify}
                cancelText="Không"
                okText="Đăng xuất"
            >
                <div className="Messtbt" id="Messtbt">
                    <p>Gửi yêu cầu kết bạn thành công</p>
                </div>
            </Modal>
        </div>
    );
}
