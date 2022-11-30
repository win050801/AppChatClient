import React, { useContext, useEffect, useState } from "react";
import { Avatar, DatePicker, Image, Input, Modal, Radio } from "antd";
import { AppContext } from "../../context/AppProvider";
import bg_user_default from "../../assets/images/bg_user_default.jfif";
import AvatarUploader from "react-avatar-uploader";
import "./style.css";
import { async } from "@firebase/util";
import { updateUser } from "../../utils/APIRoutes";
import axios from "axios";

export default function UpdateInfoUserModal() {
    const {
        isUpdateInfoUserModalOpen,
        setIsUpdateInfoUserModalOpen,
        currentUser,
    } = useContext(AppContext);

    const [avartar, setAvartar] = useState();
    const [userName, setUserName] = useState();
    const [gender, setGender] = useState();
    const [date, setDate] = useState();

    useEffect(() => {
        if (currentUser !== null) setUserName(currentUser.username);
    }, []);

    const handleUpdate = async () => {
        console.log(typeof date);
        console.log(date);
        const response = await axios.post(updateUser, {
            userName: userName,
            gender: gender === "nam" ? true : false,
            date: date,
            phonenumber: currentUser.phonenumber,
        });
        console.log(response.data.data[0]);

        localStorage.setItem(
            "chat-app-current-user",
            JSON.stringify(response.data.data[0])
        );

        setIsUpdateInfoUserModalOpen(false);
    };

    const handleCancel = () => {
        setIsUpdateInfoUserModalOpen(false);
    };

    const user = {
        displayName: "Kha Vỹ",
        photoURL: "",
        phoneNumber: "0986504217",
        gender: "Nam",
        birthday: "30 tháng 4, 2001",
    };

    return (
        <div>
            <Modal
                title="Cập nhật thông tin"
                centered // căn giữa
                open={isUpdateInfoUserModalOpen}
                onCancel={handleCancel}
                onOk={handleUpdate}
            >
                <form>
                    <div className="md-info-user-header">
                        <Image
                            className="md-info-user-img"
                            src={
                                user.photoURL ? user.photoURL : bg_user_default
                            }
                        />
                        {user.photoURL ? (
                            <Avatar
                                className="md-info-user-avt"
                                size={70}
                                src={user.photoURL}
                            ></Avatar>
                        ) : (
                            <AvatarUploader
                                className="md-update-info-user-avt"
                                defaultImg="https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
                                size={70}
                                uploadURL="http://localhost:3000"
                                fileType={"image"}
                                style={{ width: "500px" }}
                            />
                        )}
                    </div>
                    <div className="md-u-info-user-form-body">
                        <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                            Thông tin cá nhân
                        </span>
                        <span>Tên hiển thị</span>
                        <Input
                            value={currentUser !== null ? userName : ""}
                            onChange={(e) => {
                                // value={e.target.value}
                                setUserName(e.target.value);
                            }}
                        />
                        <span>Giới tính</span>
                        <Radio.Group
                            defaultValue={
                                currentUser !== null
                                    ? currentUser.gender === true
                                        ? "nam"
                                        : "nu"
                                    : "nam"
                            }
                            onChange={(e) => {
                                setGender(e.target.value);
                            }}
                        >
                            <Radio value="nam"> Nam </Radio>
                            <Radio value="nu"> Nữ </Radio>
                        </Radio.Group>
                        <span>Ngày sinh</span>
                        <DatePicker
                            onChange={(e) => {
                                setDate(e._d);
                            }}
                        />
                    </div>
                </form>
            </Modal>
        </div>
    );
}
