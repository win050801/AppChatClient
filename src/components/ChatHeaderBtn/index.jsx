import { Button } from "antd";
import React, { useState, useEffect, useContext } from "react";
import {
  UsergroupAddOutlined,
  SearchOutlined,
  VideoCameraOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import {
  BsReverseLayoutSidebarReverse,
  BsReverseLayoutSidebarInsetReverse,
} from "react-icons/bs";
import "./style.css";
import { AppContext } from "../../context/AppProvider";
export default function ChatHeaderBtn() {
  const { setIsAddUserModalOpen, roomChat, isShowInfoRoom, setShowInfoRoom } =
    useContext(AppContext);
  const handleAddUser = () => {
    setIsAddUserModalOpen(true);
  };
  const showinfo = () => {
    setShowInfoRoom(!isShowInfoRoom);
  };
  return (
    <div className="chat-header-btn">
      <Button
        className="btn-chat-header"
        type="text"
        onClick={handleAddUser}
        icon={<UsergroupAddOutlined />}
      />
      <Button
        className="btn-chat-header"
        type="text"
        icon={<SearchOutlined />}
      />
      <Button
        className="btn-chat-header"
        type="text"
        icon={<VideoCameraOutlined />}
      />
      <>
        {roomChat !== undefined ? (
          <Button
            className="btn-chat-header btn-sidebar"
            title="Thông tin hội thoại"
            type="text"
            onClick={showinfo}
            icon={
              isShowInfoRoom ? (
                <BsReverseLayoutSidebarInsetReverse
                  style={{ color: "#0068ff" }}
                />
              ) : (
                <BsReverseLayoutSidebarReverse style={{ color: "black" }} />
              )
            }
          />
        ) : (
          <div></div>
        )}
      </>
    </div>
  );
}
