import React from "react";
import { Col, Row } from "antd";
import Search from "../Search";
import ChatList from "../ChatList";
import "./style.css";
import { AppContext } from "../../context/AppProvider";
import SearchList from "../SearchList";
import PhoneBookList from "../PhoneBookList";

export default function Navbar({ contacts, changeChat, socket }) {
    const { isSearchInput, isMessageWindow } = React.useContext(AppContext);

    return (
        <div className="navbar">
            <Row>
                <Col span={24}>
                    <Search />
                </Col>
                <Col span={24}>
                    {isSearchInput ? (
                        <SearchList
                            contacts={contacts}
                            changeChat={changeChat}
                        />
                    ) : isMessageWindow ? (
                        <ChatList
                            contacts={contacts}
                            changeChat={changeChat}
                            socket={socket}
                        />
                    ) : (
                        <PhoneBookList
                            contacts={contacts}
                            changeChat={changeChat}
                        />
                    )}
                </Col>
            </Row>
        </div>
    );
}
