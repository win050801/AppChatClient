import React, { useContext, useEffect, useState } from "react";
import { List, Modal, Typography, Avatar } from "antd";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { AppContext } from "../../context/AppProvider";
import axios from "axios";
import { addTT } from "../../utils/APIRoutes";
import { async } from "@firebase/util";
export default function AddFriendModal() {
  const {
    isAddFriendModalOpen,
    setIsAddFriendModalOpen,
    contacts,
    roomChat,
    setRoomChat,
    rooms,
    setRooms,
  } = useContext(AppContext);
  const [members, setMembers] = useState([]);
  const [data, setdata] = useState([]);
  const handleOk = async () => {
    // console.log(members);
    const memms = [...roomChat.members];

    members.forEach((element) => {
      memms.push(element);
    });
    const roomChatTam = {
      id: roomChat.id,
      manager: roomChat.manager,
      roomName: roomChat.roomName,
      members: memms,
      createdAt: roomChat.createdAt,
      blockChat: roomChat.blockChat,
    };

    const roomsTam = [...rooms];
    roomsTam.splice(rooms.indexOf(roomChat), 1, roomChatTam);
    // console.log(roomsTam);
    setRooms(roomsTam);

    setRoomChat(roomChatTam);
    const { data1 } = await axios.post(addTT, {
      id: roomChat.id,
      mems: memms,
    });
    setdata([]);
    setMembers([]);
    setIsAddFriendModalOpen(false);
  };

  const handleCancel = () => {
    // console.log(roomChat);
    setIsAddFriendModalOpen(false);
  };
  const addMembers = (user) => {
    const mems = [...members];
    if (mems.indexOf(user._id) < 0) {
      mems.push(user._id);

      setMembers(mems);
    }
  };

  useEffect(() => {
    // setdata([])
    const data1 = [];
    contacts.forEach((element) => {
      if (roomChat !== undefined) {
        if (roomChat.members.indexOf(element._id) < 0) {
          if (data1.indexOf(element) < 0) {
            data1.push(element);
          }
        }
      }
    });
    // console.log(data1);
    setdata(data1);
  }, [isAddFriendModalOpen]);

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
              disableCountryCode
              inputStyle={{ border: "none" }}
              buttonStyle={{
                border: "none",
                backgroundColor: "white",
              }}
            ></ReactPhoneInput>
          </div>
          <span>Có thể bạn quen</span>
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
          {data.map((user, index) => {
            return (
              <div className="dsBan">
                <div className="click" onClick={() => addMembers(user)}>
                  <div style={{ display: "flex", flex: 0.15 }}>
                    <input type={"checkbox"}></input>
                  </div>

                  <div style={{ display: "flex", flex: 0.8 }}>
                    <div style={{ paddingTop: 7 }}>
                      {user.avatarImage ? (
                        <Avatar size={60} src={user.avatarImage}></Avatar>
                      ) : (
                        <Avatar size={60}>
                          <span style={{ fontSize: "34px" }}>
                            {user.username?.charAt(0)?.toUpperCase()}
                          </span>
                        </Avatar>
                      )}
                    </div>
                    <p></p>
                    <p className="thep">{user.username}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </form>
      </Modal>
    </div>
  );
}
