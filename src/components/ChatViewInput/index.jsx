import { Button, Form, Input } from "antd";
import React, { useState, useContext } from "react";
import Picker from "emoji-picker-react";
import styled from "styled-components";
import { AppContext } from "../../context/AppProvider";
import axios from "axios";
import {
    LinkOutlined,
    PictureOutlined,
    SmileOutlined,
} from "@ant-design/icons";
// import Picker from "emoji-picker-react";
import "./style.css";
import { imageMessageSend, fileMessageSend } from "../../utils/APIRoutes";
import { Socket } from "socket.io-client";

export default function ChatViewInput({
    handleSendMsg,
    socket,
    messages,
    setMessages,
}) {
    const { currentChat, roomChat, user } = useContext(AppContext);
    const [msg, setMsg] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleEmojiPickerhideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };
    const handleEmojiClick = (event, emojiObject) => {
        let message = msg;
        message += emojiObject.emoji;
        setMsg(message);
    };
    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            if (roomChat !== undefined) {
                if (
                    roomChat.blockChat !== undefined &&
                    roomChat.blockChat.indexOf(user._id) >= 0
                ) {
                    alert("Ban bi cam chat");
                } else {
                    handleSendMsg(msg);
                    setMsg("");
                }
            } else if (currentChat !== undefined) {
                handleSendMsg(msg);
                setMsg("");
            }
        }
    };
    const room = {
        displayName: "Enter your message",
    };

    const [form] = Form.useForm();

    //Handle Send Image
    const imageSend = async (e) => {
        e.preventDefault();
        if (e.target.files.length !== 0) {
            let fileArray = e.target.files;
            const formData = new FormData();

            const imagesArray = [];
            for (let i = 0; i < fileArray.length; i++) {
                imagesArray.push(fileArray[i]);
                formData.append("images", fileArray[i]);
            }

            const imageName = e.target.files[0].name;
            const newImageName = Date.now() + imageName;
            const file = URL.createObjectURL(e.target.files[0]);

            const data = await JSON.parse(
                localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
            );

            formData.append("senderName", data._id);
            formData.append("imageName", newImageName);

            formData.append("file", file);
            formData.append("avatarImage", data.avatarImage);

            if (currentChat !== undefined) {
                // console.log("Into Send Image");
                formData.append("reseverId", currentChat._id);
                const response = await axios.post(imageMessageSend, formData);
                socket.current.emit("send-msg", {
                    id: response.data.data._id,
                    to: currentChat._id,
                    from: data._id,
                    message: "",
                    image: response.data.data.message.image,
                    files: "",
                    reaction: "",
                });

                const msgs = [...messages];

                msgs.push({
                    fromSelf: true,
                    id: response.data.data._id,
                    message: "",
                    image: response.data.data.message.image,
                    files: "",
                    deletedFromSelf: false,
                    deletedToAll: false,
                });

                setMessages(msgs);
            } else if (roomChat !== undefined) {
                if (
                    roomChat.blockChat !== undefined &&
                    roomChat.blockChat.indexOf(user._id) >= 0
                ) {
                    alert("Ban bi cam chat");
                } else {
                    formData.append("reseverId", roomChat.id);
                    // console.log("call api");
                    const response = await axios.post(
                        imageMessageSend,
                        formData
                    );

                    socket.current.emit("send-msg", {
                        id: response.data.data._id,
                        to: roomChat.members,
                        from: data._id,
                        message: "",
                        image: response.data.data.message.image,
                        files: "",
                        reaction: "",
                    });

                    const msgs = [...messages];

                    msgs.push({
                        id: response.data.data._id,
                        fromSelf: true,
                        message: "",
                        image: response.data.data.message.image,
                        files: "",
                        deletedFromSelf: false,
                        deletedToAll: false,
                    });

                    setMessages(msgs);
                }
            }
        }
    };

    const fileSend = async (e) => {
        e.preventDefault();
        if (e.target.files.length !== 0) {
            // console.log("tét");
            let fileArray = e.target.files;
            const formData = new FormData();

            const imagesArray = [];
            for (let i = 0; i < fileArray.length; i++) {
                imagesArray.push(fileArray[i]);
                formData.append("images", fileArray[i]);
            }

            const imageName = e.target.files[0].name;
            const newImageName = Date.now() + imageName;
            const file = URL.createObjectURL(e.target.files[0]);

            const data = await JSON.parse(
                localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
            );

            formData.append("senderName", data._id);
            formData.append("imageName", newImageName);

            formData.append("file", file);
            formData.append("avatarImage", data.avatarImage);

            if (currentChat !== undefined) {
                formData.append("reseverId", currentChat._id);
                const response = await axios.post(fileMessageSend, formData);

                socket.current.emit("send-msg", {
                    id: response.data.data._id,
                    to: currentChat._id,
                    from: data._id,
                    message: "",
                    image: "",
                    files: response.data.data.message.files,
                    reaction: "",
                });

                const msgs = [...messages];

                msgs.push({
                    fromSelf: true,
                    id: response.data.data._id,
                    message: "",
                    image: "",
                    files: response.data.data.message.files,
                    deletedFromSelf: false,
                    deletedToAll: false,
                });

                setMessages(msgs);
            } else if (roomChat !== undefined) {
                if (
                    roomChat.blockChat !== undefined &&
                    roomChat.blockChat.indexOf(user._id) >= 0
                ) {
                    alert("Ban bi cam chat");
                } else {
                    formData.append("reseverId", roomChat.id);

                    const response = await axios.post(
                        fileMessageSend,
                        formData
                    );

                    socket.current.emit("send-msg", {
                        id: response.data.data._id,
                        to: roomChat.members,
                        from: data._id,
                        message: "",
                        image: "",
                        files: response.data.data.message.files,
                        reaction: "",
                    });

                    const msgs = [...messages];

                    msgs.push({
                        id: response.data.data._id,
                        fromSelf: true,
                        message: "",
                        image: "",
                        namesend: data.username,
                        files: response.data.data.message.files,
                        deletedFromSelf: false,
                        deletedToAll: false,
                    });
                    setMessages(msgs);
                }
            }
        }
    };

    return (
        <div className="chat-view-input">
            <Form onSubmitCapture={sendChat} form={form}>
                <Form.Item name="message">
                    <Input
                        size="large"
                        autoSize
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        placeholder={room.displayName}
                        bordered={false}
                        autoComplete="off"
                    />
                    <span></span>
                </Form.Item>

                <div className="chat-view-input-btn">
                    {showEmojiPicker && (
                        <Picker onEmojiClick={handleEmojiClick} />
                    )}

                    <input
                        style={{ width: 0 }}
                        accept=".mp4,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.wmv"
                        onChange={fileSend}
                        type="file"
                        id="picFile"
                        className="hide"
                    ></input>
                    <div className="btnfile">
                        <label htmlFor="picFile" className="icon-btn">
                            <LinkOutlined style={{ fontSize: "125%" }} />
                        </label>
                    </div>

                    <input
                        style={{ width: 0 }}
                        accept="image/x-png,image/gif,image/jpeg"
                        multiple="multiple"
                        onChange={imageSend}
                        type="file"
                        id="pic"
                    ></input>
                    <span style={{ width: 5 }}></span>
                    <div className="btnfile">
                        <label className="icon-btn" htmlFor="pic">
                            <PictureOutlined style={{ fontSize: "125%" }} />
                        </label>
                    </div>

                    <Button
                        className="emoji btn-input"
                        icon={<SmileOutlined />}
                        onClick={handleEmojiPickerhideShow}
                        type="text"
                        size="large"
                    ></Button>

                    <Button className="btn-submit" type="primary">
                        Gửi
                    </Button>
                </div>
            </Form>
        </div>
    );
}
