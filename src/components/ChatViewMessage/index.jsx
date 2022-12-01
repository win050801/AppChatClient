import { BackTop, Button, Dropdown, Menu, message, Image } from "antd";
import { RiShareForwardFill } from "react-icons/ri";
import { FaEllipsisH, FaQuoteRight } from "react-icons/fa";
import React, { useState, useEffect, useRef, useContext } from "react";
import Message from "../Message";
import "./style.css";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import {
    sendMessageRoute,
    recieveMessageRoute,
    deleteMessageFromSelf,
    deleteMessageToAll,
} from "../../utils/APIRoutes";
import { addreaction } from "../../utils/APIRoutes";
import InputEmoji from "react-input-emoji";
import { usePopper } from "react-popper";
import {
    CopyOutlined,
    DeleteOutlined,
    OrderedListOutlined,
    PushpinOutlined,
    RollbackOutlined,
    StarOutlined,
} from "@ant-design/icons";
import { AppContext } from "../../context/AppProvider";
import ms from "date-fns/esm/locale/ms/index.js";
export default function ChatViewMessage({ messages, socket, setMessages }) {
    const { currentChat, roomChat } = useContext(AppContext);
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement);
    const scrollRef = useRef();
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const uid = "123";

    const date = new Date();

    const [a, seta] = useState([]);

    const menuMore = (mesId) => {
        const deletedFromSelf = mesId.deletedFromSelf;
        const deletedToAll = mesId.deletedToAll;

        const handleDeleteMessToAll = async () => {
            if (currentChat !== undefined && mesId.fromSelf) {
                console.log("handleDeleteMessToAll Single Chat");

                const data = await JSON.parse(
                    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
                );
                if (!deletedToAll) {
                    const response = await axios.post(deleteMessageToAll, {
                        from: mesId.id,
                        deletedFromSelf: deletedFromSelf,
                        deletedToAll: deletedToAll,
                    });

                    socket.current.emit("deleted-msg", {
                        id: response.data.data._id,
                        to: currentChat._id,
                        from: data._id,
                        deletedFromSelf: response.data.data.deleted.fromSelf,
                        deletedToAll: response.data.data.deleted.toAll,
                    });

                    const msgs = [...messages];

                    msgs.forEach(function (e, i) {
                        if (e.id === response.data.data._id) {
                            e.message = "Tin nhắn đã được thu hồi";
                            e.image = "Tin nhắn đã được thu hồi";
                            e.files = "Tin nhắn đã được thu hồi";
                        }
                    });
                    setMessages(msgs);
                }
            } else if (roomChat !== undefined && mesId.fromSelf) {
                console.log("handleDeleteMessToAll Group Chat");

                const data = await JSON.parse(
                    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
                );
                if (!deletedToAll) {
                    const response = await axios.post(deleteMessageToAll, {
                        from: mesId.id,
                        deletedFromSelf: deletedFromSelf,
                        deletedToAll: deletedToAll,
                    });
                    const msgs = [...messages];

                    socket.current.emit("deleted-msg", {
                        id: response.data.data._id,
                        to: roomChat.members,
                        from: data._id,
                        deletedFromSelf: response.data.data.deleted.fromSelf,
                        deletedToAll: response.data.data.deleted.toAll,
                    });

                    msgs.forEach(function (e, i) {
                        if (e.id === response.data.data._id) {
                            e.message = "Tin nhắn đã được thu hồi";
                            e.image = "Tin nhắn đã được thu hồi";
                            e.files = "Tin nhắn đã được thu hồi";
                        }
                    });
                    setMessages(msgs);
                }
            }
        };
        // console.log(deletedToAll);
        const handleDeleteMessFromSelf = async () => {
            if (currentChat !== undefined) {
                console.log("handle Delete From Self");

                const data = await JSON.parse(
                    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
                );
                if (!deletedFromSelf) {
                    const response = await axios.post(deleteMessageFromSelf, {
                        from: mesId.id,
                        to: currentChat._id,
                        deletedFromSelf: deletedFromSelf,
                        deletedToAll: deletedToAll,
                    });
                    const msgs = [...messages];

                    msgs.forEach(function (e, i) {
                        if (e.id === response.data.data._id) {
                            e.message = "Tin nhắn đã được thu hồi";
                            e.image = "Tin nhắn đã được thu hồi";
                            e.files = "Tin nhắn đã được thu hồi";
                        }
                    });

                    setMessages(msgs);
                }
            } else if (roomChat !== undefined) {
                console.log("handle Delete From Self");

                const data = await JSON.parse(
                    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
                );
                if (!deletedFromSelf) {
                    const response = await axios.post(deleteMessageFromSelf, {
                        from: mesId.id,
                        to: roomChat.id,
                        deletedFromSelf: deletedFromSelf,
                        deletedToAll: deletedToAll,
                    });
                    const msgs = [...messages];

                    msgs.forEach(function (e, i) {
                        if (e.id === response.data.data._id) {
                            e.message = "Tin nhắn đã được thu hồi";
                            e.image = "Tin nhắn đã được thu hồi";
                            e.files = "Tin nhắn đã được thu hồi";
                        }
                    });
                    setMessages(msgs);
                }
            }
        };

        const handleDeleteToAll = () => {};
        return (
            <Menu
                className="menu-more"
                items={[
                    {
                        key: "3-1",
                        label: (
                            <Button type="text" icon={<CopyOutlined />}>
                                Coppy tin nhắn
                            </Button>
                        ),
                    },
                    {
                        type: "divider",
                    },
                    {
                        key: "3-2",
                        label: (
                            <Button type="text" icon={<PushpinOutlined />}>
                                Ghim tin nhắn
                            </Button>
                        ),
                    },
                    {
                        key: "3-3",
                        label: (
                            <Button type="text" icon={<StarOutlined />}>
                                Đánh dấu tin nhắn
                            </Button>
                        ),
                    },
                    {
                        key: "3-4",
                        label: (
                            <Button type="text" icon={<OrderedListOutlined />}>
                                Chọn nhiều tin nhắn
                            </Button>
                        ),
                    },
                    {
                        type: "divider",
                    },
                    {
                        key: "3-5",
                        label: (
                            <Button
                                onClick={handleDeleteMessToAll}
                                style={{ color: "red" }}
                                type="text"
                                icon={<RollbackOutlined />}
                            >
                                Thu hồi tin nhắn
                            </Button>
                        ),
                    },
                    {
                        key: "3-6",
                        label: (
                            <Button
                                onClick={handleDeleteMessFromSelf}
                                style={{ color: "red" }}
                                type="text"
                                icon={<DeleteOutlined />}
                            >
                                Xóa chỉ ở phía bạn
                            </Button>
                        ),
                    },
                ]}
            />
        );
    };

    const menuMsg = (mesId) => (
        <Menu
            className={`message ${mesId.fromSelf ? "menu-msg-m" : "menu-msg"}`}
            items={[
                {
                    key: "1",
                    label: (
                        <Button
                            onClick={() => {}}
                            type="text"
                            title="Trả lời"
                            icon={<FaQuoteRight className="menu-msg-icon" />}
                        />
                    ),
                },
                {
                    key: "2",
                    label: (
                        <Button
                            type="text"
                            title="Chia sẻ"
                            icon={
                                <RiShareForwardFill className="menu-msg-icon" />
                            }
                        />
                    ),
                },
                {
                    key: "3",
                    label: (
                        <Dropdown
                            overlay={menuMore(mesId)}
                            trigger={["click"]}
                            ref={setPopperElement}
                            style={styles.popper}
                            {...attributes.popper}
                        >
                            <Button
                                type="text"
                                title="Thêm"
                                ref={setReferenceElement}
                                icon={<FaEllipsisH className="menu-msg-icon" />}
                            />
                        </Dropdown>
                    ),
                },
            ]}
        />
    );

    return (
        <div className="chat-view-message">
            {messages.map((message, index) => {
                return (
                    <div
                        ref={scrollRef}
                        key={index}
                        className={`message ${
                            message.fromSelf ? "m-msg" : "msg"
                        }`}
                    >
                        <Dropdown overlay={menuMsg(message)}>
                            <div>
                                <Message
                                    currentChat={currentChat}
                                    socket={socket}
                                    key={message.id}
                                    message={message}
                                    text={message.message}
                                    image={message.image}
                                    files={message.files}
                                    fromSelf={message.fromSelf}
                                    photoURL={message.photoURL}
                                    displayName={message.displayName}
                                    createdAt={message.createdAt}
                                    mesUid={message.uid}
                                    namesend={message.namesend}
                                    avatarImage={message.avatarImage}
                                    deletedFromSelf={message.deletedFromSelf}
                                    deletedToAll={message.deletedToAll}
                                />
                            </div>
                        </Dropdown>
                        {/* <div><button onClick={() => test(message)}>test</button></div> */}
                    </div>
                );
            })}
        </div>
    );
}
