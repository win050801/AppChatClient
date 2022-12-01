import React from "react";
import "./style.css";
import icon_friend from "../../assets/images/icon_friend.png";
import icon_group from "../../assets/images/icon_group.png";
import { Avatar, Button } from "antd";
import { useContext } from "react";
import { AppContext } from "../../context/AppProvider";
import axios from "axios";
import { useEffect } from "react";
import {
    getAllFriendRequstById,
    getUserByPhoneNumber,
    agreeRequestFriend,
    rejectRequestFriend,
    addFriend,
    getCurrentFriend,
    getIdOfListFriendByPhoneNumber,
    getAllCurrentFriend,
} from "../../utils/APIRoutes";
import { useState } from "react";
import { Socket } from "socket.io-client";

export default function PhoneBookWindow({ contacts, changeChat, socket }) {
    const {
        setRoomChat,
        roomChat,
        rooms,
        setShowInfoRoom,
        setIsMessageWindow,
        isFriendWindow,
        setIsFriendWindow,
        listRequest,
        setListRequest,
        setListSendedRequest,
        listSendedRequest,
    } = useContext(AppContext);

    const currentUser = JSON.parse(
        localStorage.getItem("chat-app-current-user")
    );
    const [listRequestDissAgree, setListRequestDissAgree] = useState([]);
    const [friend, setFriend] = useState([]);

    const data_loimoi = [
        {
            ten: "ABC",
            avatarImage: icon_friend,
        },
    ];
    const data_goiy = [
        {
            ten: "ABC",
            avatarImage: icon_friend,
        },
    ];
    const socketAgreeRequestFriend = async (dt) => {
        const response = await axios.post(getCurrentFriend, {
            currentUserId: currentUser._id,
        });
        // console.log(response.data.data2);

        socket.current.emit("add-into-list-friend", {
            data: response.data.data2,
            to: dt._id,
            from: currentUser._id,
        });
    };
    useEffect(() => {
        async function fetchData() {
            const response = await axios.post(getIdOfListFriendByPhoneNumber, {
                currentUserId: currentUser._id,
                phoneNumber: currentUser.phonenumber,
            });

            setFriend(response.data.data2);
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.post(getAllFriendRequstById, {
                currentPhoneNumber: currentUser.phonenumber,
            });
            setListRequest(response.data.data);

            if (socket.current) {
                socket.current.on(
                    "add-friend-request",
                    async (requestFriend) => {
                        const res1 = await axios.post(getAllFriendRequstById, {
                            currentPhoneNumber: currentUser.phonenumber,
                        });
                        // list.push(requestFriend.requestFriend[0]);
                        // console.log(list);
                        console.log(res1.data.data);
                        setListRequest(res1.data.data);
                    }
                );
                socket.current.on("add-friend-reject-request", async (data) => {
                    console.log(data.currentPhoneNumber);
                    const res2 = await axios.post(getAllFriendRequstById, {
                        currentPhoneNumber: data.currentPhoneNumber,
                    });
                    setListRequest(res2.data.data);
                });
            }
        }
        fetchData();
    }, []);

    return isFriendWindow ? (
        <div className="pb-window">
            <div className="pb-window-header">
                <Avatar
                    size={60}
                    style={{ marginRight: "0.6rem" }}
                    src={icon_friend}
                />
                <span>Danh sách kết bạn</span>
            </div>
            <div className="pb-window-body">
                <div className="req">
                    <span className="tt">
                        Lời mời kết bạn ({listRequest.length})
                    </span>
                    {listRequest.map((dt) => {
                        return (
                            <Button className="contact" type="text">
                                <div className="info">
                                    <Avatar size={80} src={dt.avatarImage}>
                                        {dt.avatarImage
                                            ? ""
                                            : dt.username
                                                  ?.charAt(0)
                                                  ?.toUpperCase()}
                                    </Avatar>
                                    <span style={{ marginLeft: "0.8rem" }}>
                                        {dt.username}
                                    </span>
                                </div>
                                <div className="btn">
                                    <Button
                                        onClick={async () => {
                                            const response = await axios.post(
                                                rejectRequestFriend,
                                                {
                                                    received:
                                                        currentUser.phonenumber,
                                                    senderId: dt.phonenumber,
                                                }
                                            );
                                            const list = [...listRequest];

                                            const index = list.indexOf(dt);
                                            if (index > -1) {
                                                list.splice(index, 1);
                                            }
                                            setListRequest(list);
                                        }}
                                        style={{
                                            color: "#2E9BFF",
                                            border: "1px solid #2E9BFF",
                                        }}
                                    >
                                        Bỏ qua
                                    </Button>
                                    <Button
                                        onClick={async () => {
                                            // Update request bằng true
                                            const res1 = await axios.post(
                                                agreeRequestFriend,
                                                {
                                                    received:
                                                        currentUser.phonenumber,
                                                    senderId: dt.phonenumber,
                                                }
                                            );

                                            const list = [...listRequest];
                                            const index = list.indexOf(dt);
                                            if (index > -1) {
                                                list.splice(index, 1);
                                            }
                                            setListRequest(list);
                                            //Thêm vào danh sách bạn bè người nhận
                                            const response = await axios.post(
                                                getCurrentFriend,
                                                {
                                                    currentUserId:
                                                        currentUser._id,
                                                }
                                            );

                                            const newListFriend = [
                                                ...response.data.data,
                                            ];

                                            if (
                                                newListFriend.indexOf(
                                                    dt._id
                                                ) === -1
                                            ) {
                                                newListFriend.push(dt._id);
                                            }
                                            console.log(friend);
                                            const res = await axios.post(
                                                addFriend,
                                                {
                                                    listFriendOfId: friend,
                                                    friendId: newListFriend,
                                                }
                                            );

                                            // Thêm vào danh sách bạn bè người gửi
                                            const getIdListSender =
                                                await axios.post(
                                                    getIdOfListFriendByPhoneNumber,
                                                    {
                                                        currentUserId: dt._id,
                                                        phoneNumber:
                                                            dt.phonenumber,
                                                    }
                                                );

                                            const getListFriendReceived =
                                                await axios.post(
                                                    getAllCurrentFriend,
                                                    {
                                                        currentUserId: dt._id,
                                                    }
                                                );
                                            const newListFriendSender = [
                                                ...getListFriendReceived.data
                                                    .data,
                                            ];
                                            newListFriendSender.push(
                                                currentUser._id
                                            );

                                            const updateListFriendSender =
                                                await axios.post(addFriend, {
                                                    listFriendOfId:
                                                        getIdListSender.data
                                                            .data2,
                                                    friendId:
                                                        newListFriendSender,
                                                });
                                            socketAgreeRequestFriend(dt);
                                        }}
                                        type="primary"
                                    >
                                        Đồng ý
                                    </Button>
                                </div>
                            </Button>
                        );
                    })}
                </div>
                <div className="sg">
                    <span className="tt">
                        Gợi ý kết bạn ({data_goiy.length})
                    </span>
                    <div className="sg-lst">
                        {data_goiy.map((dt) => {
                            return (
                                <Button className="contact" type="text">
                                    <div className="info">
                                        <Avatar size={120} src={dt.avatarImage}>
                                            {dt.avatarImage
                                                ? ""
                                                : dt.ten
                                                      ?.charAt(0)
                                                      ?.toUpperCase()}
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
                <Avatar
                    size={60}
                    style={{ marginRight: "0.6rem" }}
                    src={icon_group}
                />
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
                                        <Avatar
                                            size={120}
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
