import React, { useState, useEffect, useContext } from "react";
import { Tabs, Avatar, List } from "antd";
import "./style.css";
import axios from "axios";
import { getRoom } from "../../utils/APIRoutes";
import { AppContext } from "../../context/AppProvider";
import { getCurrentFriend, getAllCurrentFriend } from "../../utils/APIRoutes";

export default function ChatList({ contacts, changeChat }) {
    const {
        room,
        user,
        setRoomChat,
        roomChat,
        rooms,
        setRooms,
        setShowInfoRoom,
        currentChat,
        listCurrentFriend,
        setListCurrentFriend,
    } = useContext(AppContext);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    const currentUser = JSON.parse(
        localStorage.getItem("chat-app-current-user")
    );
    useEffect(() => {
        setShowInfoRoom(false);
    }, [roomChat]);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.post(getCurrentFriend, {
                currentUserId: currentUser._id,
            });
            setListCurrentFriend(response.data.data2);

            console.log(listCurrentFriend);
        }
        fetchData();
    }, []);

    const click = (contact) => {
        changeChat(contact);
    };
    const data2 = [];
    const test = () => {
        alert("test");
    };
    useEffect(() => {
        async function fetchData() {
            //  console.log(id);
            if (user) {
                try {
                    const data = await axios.post(getRoom, {
                        id: user._id,
                    });
                    setRooms(data.data);
                    // console.log(data.data[0].members);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        fetchData();
    }, [user]);

    // console.log(rooms);
    return (
        <div className="chatlist">
            <Tabs defaultActiveKey="1" className="tabs">
                <Tabs.TabPane
                    tab=<span style={{ fontSize: "16px", fontWeight: "500" }}>
                        Bạn bè
                    </span>
                    key="1"
                >
                    {listCurrentFriend.map((contact, index) => {
                        return (
                            <div
                                className="contact"
                                onClick={() => click(contact)}
                            >
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
                                    <p>Hello</p>
                                </div>
                            </div>
                        );
                    })}
                </Tabs.TabPane>
                <Tabs.TabPane
                    tab=<span style={{ fontSize: "16px", fontWeight: "500" }}>
                        Nhóm
                    </span>
                    key="2"
                >
                    {rooms === undefined ? (
                        <div></div>
                    ) : (
                        <div>
                            {rooms.map((room, index) => {
                                return (
                                    <div
                                        className="contact"
                                        onClick={() => setRoomChat(room)}
                                    >
                                        <div className="avt">
                                            <Avatar
                                                size={60}
                                                src={room.avatarImage}
                                            >
                                                {room.avatarImage
                                                    ? ""
                                                    : room.roomName
                                                          ?.charAt(0)
                                                          ?.toUpperCase()}
                                            </Avatar>
                                        </div>
                                        <div className="name">
                                            <h3>{room.roomName}</h3>
                                            <p>
                                                {room.members.length} thành viên
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
}
