import React, { useContext, useEffect, useState, useRef } from "react";
import { List, Modal, Typography, Avatar, Button } from "antd";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { AppContext } from "../../context/AppProvider";

import axios from "axios";
import { addTT } from "../../utils/APIRoutes";
import { async } from "@firebase/util";
import { io } from "socket.io-client";
import { allUsersRoute, host } from "../../utils/APIRoutes";
import {
    getUserByPhoneNumber,
    addFriend,
    getCurrentFriend,
    requestFriend,
    getAllCurrentFriend,
    getAllFriendRequstById,
    rejectRequestFriend,
} from "../../utils/APIRoutes";
import "../PhoneBookWindow/style.css";
import { da } from "date-fns/locale";
import "../Message/style.css";
export default function AddFriendModal() {
    const {
        isAddFriendModalOpen,
        setIsAddFriendModalOpen,

        setIsInfoUserModalOpen,
        setIsInfoUserOtherModalOpen,
        currentSearch,
        setCurrentSearch,
    } = useContext(AppContext);
    const data_loimoi = [
        {
            ten: "ABC",
            avatarImage: "",
        },
    ];
    const [members, setMembers] = useState([]);
    const [data, setData] = useState([]);
    const [friend, setFriend] = useState([]);
    const [listCurrentFriend, setListCurrentFriend] = useState();
    const [sendedRequest, setSendedRequst] = useState(true);
    const socket = useRef();

    const [phoneNumber, setPhoneNumber] = useState("");
    const currentUser = JSON.parse(
        localStorage.getItem("chat-app-current-user")
    );

    const handleOk = async () => {
        const response = await axios.post(getUserByPhoneNumber, {
            currentUserId: currentUser._id,
            phoneNumber: phoneNumber,
        });

        const listCurrentFriend = await axios.post(getCurrentFriend, {
            currentUserId: currentUser._id,
        });

        const allSendedRequest = await axios.post(getAllFriendRequstById, {
            phoneNumber: phoneNumber,
            currentPhoneNumber: currentUser.phonenumber,
        });
        const allRequestFriendDoNotAgree = allSendedRequest.data.data4;
        const listAllRequestDoNotAgree = [];
        allRequestFriendDoNotAgree.map((m, i) => {
            listAllRequestDoNotAgree.push(m.received);
        });

        const listCurrentFriendPhone = [];
        listCurrentFriend.data.data2.map((m, i) => {
            listCurrentFriendPhone.push(m.phonenumber);
        });
        if (listAllRequestDoNotAgree.indexOf(phoneNumber) !== -1) {
            setSendedRequst(false);
        }
        if (
            listCurrentFriendPhone.indexOf(
                response.data.data[0].phonenumber
            ) !== -1
        ) {
            setCurrentSearch(response.data.data);
            setIsInfoUserOtherModalOpen(true);
            handleCancel();
        }
        if (response.data.data[0].phonenumber !== currentUser.phonenumber) {
            setData(response.data.data[0]);
            setFriend(response.data.data2);
        } else {
            setIsInfoUserModalOpen(true);
            handleCancel();
        }
    };

    const handleCancel = () => {
        setIsAddFriendModalOpen(false);
        setData([]);
    };
    const addMembers = (user) => {
        const mems = [...members];
        if (mems.indexOf(user._id) < 0) {
            mems.push(user._id);

            setMembers(mems);
        }
    };
    const handleAddFriend = async () => {
        const response = await axios.post(requestFriend, {
            received: data.phonenumber,
            senderId: currentUser.phonenumber,
        });
        handleCancel();
        setPhoneNumber("");

        <div className="Messtbt" id="Messtbt">
            <p>Gửi yêu cầu kết bạn thành công</p>
        </div>;

        // socket.current = io(host);
        // console.log(socket.current.Socket);
        // socket.current.emit("send-request-add-friend", socket.current);
        // const response = await axios.post(getCurrentFriend, {
        //     currentUserId: currentUser._id,
        // });

        // const newListFriend = [...response.data.data];
        // console.log(newListFriend.indexOf(data._id));
        // if (newListFriend.indexOf(data._id) === -1) {
        //     newListFriend.push(data._id);
        // }

        // console.log(newListFriend);
        // const res = await axios.post(addFriend, {
        //     listFriendOfId: friend,
        //     friendId: newListFriend,
        // });
    };

    const handleRemovelAddFriend = async () => {
        console.log("handleCancelAddFriend");
        const res = await axios.post(rejectRequestFriend, {
            received: phoneNumber,
            senderId: currentUser.phonenumber,
        });
        setSendedRequst(true);
    };

    return (
        <div>
            <Modal
                title="Thêm bạn"
                open={isAddFriendModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Tìm kiếm"
                cancelText="Hủy"
            >
                <form>
                    <div className="login-phone-input md-add-user-input">
                        <ReactPhoneInput
                            className="phone-input"
                            country={"vn"}
                            placeholder="Số điện thoại"
                            autoFormat
                            value={phoneNumber}
                            onChange={(e) => {
                                setPhoneNumber(e);
                            }}
                            disableCountryCode
                            inputStyle={{ border: "none" }}
                            buttonStyle={{
                                border: "none",
                                backgroundColor: "white",
                            }}
                        ></ReactPhoneInput>
                    </div>
                    <span>Có thể bạn quen</span>
                    <div>
                        <Button className="contact" type="text">
                            <div className="info">
                                <Avatar size={80} src={data.avatarImage}>
                                    {data.avatarImage
                                        ? ""
                                        : data.username
                                              ?.charAt(0)
                                              ?.toUpperCase()}
                                </Avatar>
                                <span style={{ marginLeft: "0.8rem" }}>
                                    {data.username}
                                </span>
                            </div>
                            <div className="btn">
                                {sendedRequest ? (
                                    <Button
                                        onClick={handleAddFriend}
                                        style={{
                                            color: "#2E9BFF",
                                            border: "1px solid #2E9BFF",
                                        }}
                                    >
                                        Kết bạn
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleRemovelAddFriend}
                                        style={{
                                            color: "#2E9BFF",
                                            border: "1px solid #2E9BFF",
                                        }}
                                    >
                                        Hủy kết bạn
                                    </Button>
                                )}
                            </div>
                        </Button>
                    </div>

                    <br></br>
                    {/* <List
            className="md-add-user-list"
            size="large"
            bordered
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <Typography.Text mark>[ITEM]</Typography.Text> {item}
              </List.Item>
            )}
          /> */}
                </form>
            </Modal>
        </div>
    );
}
