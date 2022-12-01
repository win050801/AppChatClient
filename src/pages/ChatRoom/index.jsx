import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import { Col, Row } from "antd";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

import ChatWindow from "../../components/ChatWindow";
import { Link, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { allUsersRoute, host } from "../../utils/APIRoutes";
import { AppContext } from "../../context/AppProvider";
import PhoneBookWindow from "../../components/PhoneBookWindow";
export default function ChatRoom() {
    const navigate = useNavigate();
    const {
        contacts,
        setContacts,
        setUser,
        currentChat,
        setCurrentChat,
        isMessageWindow,
        isFriendWindow,
    } = useContext(AppContext);
    // const [contacts, setContacts] = useState([]);

    const [currentUser, setCurrentUser] = useState(undefined);
    const [test, settest] = useState("");
    const socket = useRef();

    useEffect(() => {
        if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
            navigate("/login");
        } else {
            setCurrentUser(
                localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
            );
            setUser(
                JSON.parse(
                    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
                )
            );
        }
    }, []);

    useEffect(() => {
        async function fetchData() {
            if (currentUser !== null) {
                const id = JSON.parse(currentUser)._id;

                if (currentUser) {
                    socket.current = io(host);
                    socket.current.emit("add-user", id);

                    const data = await axios.post(allUsersRoute, {
                        id,
                    });
                    setContacts(data.data);
                }
            }
        }
        fetchData();
    }, [currentUser]);
    const handleChatChange = async (chat) => {
        //
        // {

        await setCurrentChat(chat);
        // }
        // if(chat.length!==undefined)
        // {
        //   for(let i = 0 ; i < chat.length;i++)
        //     {
        //       console.log(chat[i].user._id)
        //     }
        // }
    };

    // useEffect(()=>{
    //   async function fetchData() {
    //     console.log(currentChat);
    //   }
    //   fetchData();
    //   }, [currentChat]);
    // console.log(contacts);
    return (
        <Row>
            <Col span={7}>
                <Sidebar
                    contacts={contacts}
                    changeChat={handleChatChange}
                    socket={socket}
                />
            </Col>
            <Col span={17}>
                {/* {isMessageWindow ? (
          <ChatWindow currentChat={currentChat} socket={socket} />
        ) : isFriendWindow ? (
          <PhoneBookWindow contacts={contacts} changeChat={handleChatChange} />
        ) : (
          <ChatWindow currentChat={currentChat} socket={socket} />
        )} */}
                {isMessageWindow ? (
                    <ChatWindow currentChat={currentChat} socket={socket} />
                ) : (
                    <PhoneBookWindow
                        contacts={contacts}
                        changeChat={handleChatChange}
                        socket={socket}
                    />
                )}
            </Col>
        </Row>
    );
}
