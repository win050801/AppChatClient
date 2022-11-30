import React from "react";
import { Avatar, Button, Dropdown, Menu } from "antd";
import {
    MessageOutlined,
    AccountBookOutlined,
    SettingOutlined,
    CloudOutlined,
    UserOutlined,
    InfoCircleOutlined,
    GlobalOutlined,
    FolderOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import "./style.css";
import { AppContext } from "../../context/AppProvider";

export default function MainTab() {
    const {
        setIsInfoUserModalOpen,
        setIsLogoutModalOpen,
        user,
        isMessageWindow,
        setIsMessageWindow,
        setIsSearchInput,
        currentUser,
    } = React.useContext(AppContext);

    const handleOpenInfoUser = () => {
        setIsInfoUserModalOpen(true);
    };

    const handleLogout = () => {
        setIsLogoutModalOpen(true);
    };

    const handleOpenMessageWinDow = () => {
        setIsMessageWindow(true);
        setIsSearchInput(false);
    };

    const handleOpenPhoneBookWinDow = () => {
        setIsMessageWindow(false);
        setIsSearchInput(false);
    };

    const menuInfo = (
        <Menu
            className="menu menu-info"
            items={[
                {
                    key: "1",
                    className: "menu-info-header",
                    label:
                        currentUser === null ? (
                            ""
                        ) : (
                            <span>{currentUser.username}</span>
                        ),
                },
                {
                    type: "divider",
                },
                {
                    key: "2",
                    label: (
                        <Button onClick={handleOpenInfoUser} type="text">
                            Hồ sơ của bạn
                        </Button>
                    ),
                },
                {
                    type: "divider",
                },
                {
                    key: "3",
                    label: (
                        <Button onClick={handleLogout} type="text">
                            Đăng xuất
                        </Button>
                    ),
                },
            ]}
        />
    );

    const menuSetting = (
        <Menu
            className="menu menu-setting"
            items={[
                {
                    key: "1",
                    label: (
                        <Button
                            onClick={handleOpenInfoUser}
                            type="text"
                            icon={<UserOutlined />}
                        >
                            Thông tin tài khoản
                        </Button>
                    ),
                },
                {
                    key: "2",
                    label: (
                        <Button type="text" icon={<SettingOutlined />}>
                            Cài đặt
                        </Button>
                    ),
                },
                {
                    type: "divider",
                },
                {
                    key: "3",
                    label: (
                        <Button type="text" icon={<FolderOutlined />}>
                            Lưu trữ
                        </Button>
                    ),
                    children: [
                        {
                            key: "3-1",
                            label: <Button type="text">Quản lý file</Button>,
                        },
                    ],
                },

                {
                    key: "4",
                    label: (
                        <Button type="text" icon={<GlobalOutlined />}>
                            Ngôn ngữ
                        </Button>
                    ),
                    children: [
                        {
                            key: "4-1",
                            label: <Button type="text">Tiếng Việt</Button>,
                        },
                        {
                            key: "4-2",
                            label: <Button type="text">English</Button>,
                        },
                    ],
                },
                {
                    key: "5",
                    label: (
                        <Button type="text" icon={<InfoCircleOutlined />}>
                            Giới thiệu
                        </Button>
                    ),
                    children: [
                        {
                            key: "5-1",
                            label: (
                                <Button type="text">Thông tin phiên bản</Button>
                            ),
                        },
                        {
                            key: "5-2",
                            label: <Button type="text">Thông tin nhóm</Button>,
                        },
                    ],
                },
                {
                    type: "divider",
                },
                {
                    key: "6",
                    label: (
                        <Button
                            onClick={handleLogout}
                            type="text"
                            style={{ color: "red" }}
                            icon={<LogoutOutlined />}
                        >
                            Đăng xuất
                        </Button>
                    ),
                },
            ]}
        />
    );

    return (
        <div className="main-tab">
            <div className="main-tab-top">
                <Dropdown overlay={menuInfo} trigger={["click"]}>
                    {user === undefined ? (
                        <Button
                            className="btn-avatar"
                            onClick={(e) => e.preventDefault()}
                            icon={<Avatar size={60}>KV</Avatar>}
                        />
                    ) : (
                        <Button
                            className="btn-avatar"
                            title={user.username}
                            onClick={(e) => e.preventDefault()}
                            icon={
                                user.isAvatarImageSet ? (
                                    <Avatar
                                        size={60}
                                        src={user.avatarImage}
                                    ></Avatar>
                                ) : (
                                    <Avatar size={60}>
                                        {user.username
                                            ?.charAt(0)
                                            ?.toUpperCase()}
                                    </Avatar>
                                )
                            }
                        />
                    )}
                </Dropdown>
                <Button
                    className="btn-menu"
                    style={{
                        backgroundColor: isMessageWindow ? "#006EDC" : "",
                    }}
                    title="Tin nhắn"
                    onClick={handleOpenMessageWinDow}
                    icon={
                        <MessageOutlined
                            style={{ fontSize: "180%", color: "#ffffff" }}
                        />
                    }
                />
                <Button
                    className="btn-menu"
                    style={{
                        backgroundColor: isMessageWindow ? "" : "#006EDC",
                    }}
                    title="Danh bạ"
                    onClick={handleOpenPhoneBookWinDow}
                    icon={
                        <AccountBookOutlined
                            style={{ fontSize: "180%", color: "#ffffff" }}
                        />
                    }
                />
            </div>
            <div className="main-tab-bottom">
                <Button
                    className="btn-menu"
                    title="Cloud của tôi"
                    icon={
                        <CloudOutlined
                            style={{ fontSize: "180%", color: "#ffffff" }}
                        />
                    }
                />
                <Dropdown overlay={menuSetting} trigger={["click"]}>
                    <Button
                        className="btn-menu"
                        title="Cài đặt"
                        onClick={(e) => e.preventDefault()}
                        icon={
                            <SettingOutlined
                                style={{ fontSize: "180%", color: "#ffffff" }}
                            />
                        }
                    />
                </Dropdown>
            </div>
        </div>
    );
}
