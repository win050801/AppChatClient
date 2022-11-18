import React from "react";
import "./style.css";
import icon_friend from "../../assets/images/icon_friend.png";
import icon_group from "../../assets/images/icon_group.png";
import { Avatar, Button } from "antd";
import { useContext } from "react";
import { AppContext } from "../../context/AppProvider";
import { useEffect } from "react";

export default function PhoneBookWindow({ contacts, changeChat }) {
  const {
    setRoomChat,
    roomChat,
    rooms,
    setShowInfoRoom,
    setIsMessageWindow,
    isFriendWindow,
    setIsFriendWindow,
  } = useContext(AppContext);

  // data test
  const data_loimoi = [
    {
      ten: "ABC",
      avatarImage: icon_friend,
    },
    {
      ten: "QWE",
      avatarImage: "",
    },
    {
      ten: "ZXC",
      avatarImage: icon_group,
    },
  ];
  const data_goiy = [
    {
      ten: "ABC",
      avatarImage: icon_friend,
    },
    {
      ten: "QWE",
      avatarImage: "",
    },
    {
      ten: "ZXC",
      avatarImage: icon_group,
    },
    {
      ten: "ABC",
      avatarImage: icon_friend,
    },
    {
      ten: "QWE",
      avatarImage: "",
    },
    {
      ten: "ZXC",
      avatarImage: icon_group,
    },
    {
      ten: "ABC",
      avatarImage: icon_friend,
    },
    {
      ten: "QWE",
      avatarImage: "",
    },
    {
      ten: "ZXC",
      avatarImage: icon_group,
    },
    {
      ten: "QWE",
      avatarImage: "",
    },
    {
      ten: "QWE",
      avatarImage: "",
    },
  ];

  useEffect(() => {
    setShowInfoRoom(false);
  }, [roomChat]);

  const click = (contact) => {
    changeChat(contact);
    setIsMessageWindow(true);
  };

  const handleOpenChatRoom = (room) => {
    // setRoomChat(room);
    // setIsFriendWindow(false);
    // setIsMessageWindow(true);
  };

  return isFriendWindow ? (
    <div className="pb-window">
      <div className="pb-window-header">
        <Avatar size={60} style={{ marginRight: "0.6rem" }} src={icon_friend} />
        <span>Danh sách kết bạn</span>
      </div>
      <div className="pb-window-body">
        <div className="req">
          <span className="tt">Lời mời kết bạn ({data_loimoi.length})</span>
          {data_loimoi.map((dt) => {
            return (
              <Button className="contact" type="text">
                <div className="info">
                  <Avatar size={80} src={dt.avatarImage}>
                    {dt.avatarImage ? "" : dt.ten?.charAt(0)?.toUpperCase()}
                  </Avatar>
                  <span style={{ marginLeft: "0.8rem" }}>{dt.ten}</span>
                </div>
                <div className="btn">
                  <Button
                    style={{ color: "#2E9BFF", border: "1px solid #2E9BFF" }}
                  >
                    Bỏ qua
                  </Button>
                  <Button type="primary">Đồng ý</Button>
                </div>
              </Button>
            );
          })}
        </div>
        <div className="sg">
          <span className="tt">Gợi ý kết bạn ({data_goiy.length})</span>
          <div className="sg-lst">
            {data_goiy.map((dt) => {
              return (
                <Button className="contact" type="text">
                  <div className="info">
                    <Avatar size={120} src={dt.avatarImage}>
                      {dt.avatarImage ? "" : dt.ten?.charAt(0)?.toUpperCase()}
                    </Avatar>
                  </div>
                  <div className="name">
                    <p>{dt.ten}</p>
                  </div>

                  <div className="btn">
                    <Button>Kết bạn</Button>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="pb-window">
      <div className="pb-window-header">
        <Avatar size={60} style={{ marginRight: "0.6rem" }} src={icon_group} />
        <span>Danh sách nhóm</span>
      </div>
      <div className="pb-window-body">
        <div className="sg">
          <span className="tt">Tất cả ({rooms.length})</span>
          <div className="sg-lst">
            {rooms.map((room) => {
              return (
                <Button className="contact" type="text">
                  <div className="info">
                    <Avatar size={120} src={room.avatarImage}>
                      {room.avatarImage
                        ? ""
                        : room.roomName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                  </div>
                  <div className="name">
                    <p>{room.roomName}</p>
                  </div>
                  <div className="member">
                    <p>{room.members.length} thành viên</p>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
