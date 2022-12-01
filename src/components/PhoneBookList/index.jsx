import { UserAddOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import React, { useContext } from "react";
import { useEffect } from "react";
import { AppContext } from "../../context/AppProvider";
import icon_friend from "../../assets/images/icon_friend.png";
import icon_group from "../../assets/images/icon_group.png";
import "./style.css";
import { getCurrentFriend, host } from "../../utils/APIRoutes";
import axios from "axios";
import { io } from "socket.io-client";

import { useRef } from "react";

export default function PhoneBookList({ contacts, changeChat }) {
    const {
        roomChat,
        setShowInfoRoom,
        isFriendWindow,
        setIsFriendWindow,
        setIsAddFriendModalOpen,
        currentUser,
    } = useContext(AppContext);
    const socket = useRef();
    useEffect(() => {
        async function fetchData() {
            const response = await axios.post(getCurrentFriend, {
                currentUserId: currentUser._id,
            });
            // setListCurrentFriend(response.data.data2);
            socket.current = io(host);
            if (socket.current) {
                socket.current.on("list-friend-add-into", async (data) => {
                    console.log("InTo");
                });
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        setShowInfoRoom(false);
    }, [roomChat]);

    const click = (contact) => {
        changeChat(contact);
    };

    const handleFriend = () => {
        setIsFriendWindow(true);
    };

    const handleGroup = () => {
        setIsFriendWindow(false);
    };

    const handleAddFriend = () => {
        setIsAddFriendModalOpen(true);
    };

    return (
        <div className="pb-list">
            <div className="pb-list-btn">
                <Button
                    type="text"
                    icon={<UserAddOutlined style={{ color: "#0091ff" }} />}
                    onClick={handleAddFriend}
                >
                    Thêm bạn bằng số điện thoại
                </Button>
                <Button
                    style={{ backgroundColor: isFriendWindow ? "#E5EFFF" : "" }}
                    type="text"
                    onClick={handleFriend}
                >
                    <Avatar
                        size={60}
                        style={{
                            marginRight: "0.6rem",
                        }}
                        src={icon_friend}
                    />
                    Danh sách kết bạn
                </Button>
                <Button
                    style={{ backgroundColor: isFriendWindow ? "" : "#E5EFFF" }}
                    type="text"
                    onClick={handleGroup}
                >
                    <Avatar
                        size={60}
                        style={{ marginRight: "0.6rem" }}
                        src={icon_group}
                    />
                    Danh sách nhóm
                </Button>
            </div>
            <div className="pb-list-btn">
                <span
                    style={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        paddingLeft: "0.8rem",
                    }}
                >
                    Gửi File giữa di động và máy tính
                </span>
                <Button type="text">
                    <Avatar
                        size={60}
                        style={{ marginRight: "0.6rem" }}
                        src="https://res-zalo.zadn.vn/upload/media/2021/6/4/2_1622800570007_369788.jpg"
                    />
                    Cloud của tôi
                </Button>
            </div>

            <div>
                <span
                    style={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        paddingLeft: "0.8rem",
                    }}
                >
                    Bạn bè ({contacts.length})
                </span>

                {/* Data tets */}
                {contacts.map((contact, index) => {
                    return (
                        <div className="contact" onClick={() => click(contact)}>
                            <div className="avt">
                                {contact.avatarImage ? (
                                    <Avatar
                                        size={60}
                                        src={contact.avatarImage}
                                    ></Avatar>
                                ) : (
                                    <Avatar size={60}>
                                        <span style={{ fontSize: "34px" }}>
                                            {contact.username
                                                ?.charAt(0)
                                                ?.toUpperCase()}
                                        </span>
                                    </Avatar>
                                )}
                            </div>
                            <div className="name">
                                <h3>{contact.username}</h3>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
