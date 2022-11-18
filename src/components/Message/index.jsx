import React, { useState, useEffect } from "react";
import { formatRelative, format } from "date-fns/esm";
import "./style.css";
import { addreaction } from "../../utils/APIRoutes";
import axios from "axios";
import { Avatar, Button, Image, Typography } from "antd";

function formatDate(seconds) {
  let formattedDate = "";
  if (seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date());

    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return formattedDate;
}

export default function Message({
  currentChat,
  test,
  socket,
  key,
  message,
  text,
  image,
  files,
  fromSelf,
  photoURL,
  displayName,
  createdAt,
  mesUid,
  namesend,
  avatarImage,
  deletedFromSelf,
  deletedToAll,
}) {
  const checkFileTypesByName = (array) => {
    for (var i = 0; i < array.length; i++) {
      var endPoint = array[i].split(".");
      var ext = endPoint[endPoint.length - 1];
      switch (ext.toLowerCase()) {
        case "mp4":
        case "video":
        case "wmv":
          //etc
          return true;
      }
    }
    return false;
  };
  // console.log(image);
  const checkGroupImage = (image) => {
    if (image.length >= 2) {
      image.map((m, i) => {
        // console.log(m);
      });
      return true;
    }
    return false;
  };

  const user = {
    uid: "123",
  };
  const [isclick, setclick] = useState(message.reaction);
  const from = JSON.parse(
    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  )._id;
  useEffect(() => {
    async function fetchData() {
      if (socket.current) {
        await socket.current.on("msg-recieve", ({ react, id }) => {
          if (react !== undefined) {
            // console.log("test:"+react +":"+message.reaction);
            if (id === message.id) {
              if (react === "❤️") {
                setclick("❤️");
              } else {
                setclick("");
              }
            }
          }
          // alert("mess : "+msg);
        });
      }
    }
    fetchData();
  }, []);

  const clicktest = async (message) => {
    if (isclick === "❤️") {
      setclick("");
    } else {
      setclick("❤️");
    }

    if (isclick === "") {
      // console.log(message);
      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: from,
        react: "❤️",
        id: message.id,
      });
      const response = await axios.post(addreaction, {
        id: message,
        reaction: "❤️",
      });
    } else {
      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: from,
        react: "",
        id: message.id,
      });
      const response = await axios.post(addreaction, {
        id: message,
        reaction: "",
      });
    }
  };
  // console.log(fromSelf);
  // console.log(deletedToAll);

  return (
    <div className="message">
      <div className={`${fromSelf ? "m-msg" : "msg"}`}>
        <div className="avatar">
          <Avatar size={50} src={avatarImage}>
            {avatarImage ? "" : displayName?.charAt(0)?.toUpperCase()}
          </Avatar>
        </div>

        <div className="content">
          <Typography.Text
            className="message-author"
            style={{ display: fromSelf ? "none" : "" }}
          >
            {namesend}
          </Typography.Text>

          <div>
            {!deletedToAll ? (
              <div>
                {deletedFromSelf ? (
                  <div>
                    {fromSelf ? (
                      <div>Tin nhắn đã được thu hồi</div>
                    ) : (
                      <div>
                        {text === "" ? (
                          <div>
                            {files === null || files === "" ? (
                              <div>
                                {checkGroupImage(image) === false ? (
                                  <img
                                    key={image}
                                    className="imgmess"
                                    src={image}
                                    alt="image"
                                  />
                                ) : (
                                  <div>
                                    {image.map((m) => (
                                      <img
                                        style={{ maxWidth: 400 }}
                                        key={m}
                                        className="imgmess"
                                        src={m}
                                        alt="image"
                                      />
                                    ))}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div>
                                {checkFileTypesByName(files) === false ? (
                                  <a key={files} href={files}>
                                    {files}
                                  </a>
                                ) : (
                                  <video
                                    key={files}
                                    autoPlay={true}
                                    muted={true}
                                    src={files}
                                    width="300"
                                    height="200"
                                    // controls={controls}
                                  />
                                )}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div style={{ maxWidth: 300 }}>
                            <span className="text-mess">{text}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    {text === "" ? (
                      <div>
                        {files === null || files === "" ? (
                          <div>
                            {checkGroupImage(image) === false ? (
                              <Image.PreviewGroup>
                                <Image
                                  style={{ maxWidth: 400 }}
                                  key={image}
                                  className="imgmess"
                                  src={image}
                                  alt="image"
                                />
                              </Image.PreviewGroup>
                            ) : (
                              <div>
                                {image.map((m) => (
                                  <img
                                    key={m}
                                    className="imgmess"
                                    src={m}
                                    alt="image"
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div>
                            {checkFileTypesByName(files) === false ? (
                              <a key={files} href={files}>
                                {files}
                              </a>
                            ) : (
                              <video
                                key={files}
                                autoPlay={true}
                                muted={true}
                                src={files}
                                width="300"
                                height="200"
                                // controls={controls}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div
                      // style={{ maxWidth: 300 }}
                      >
                        <p
                          className="text-mess"
                          style={{ textAlign: fromSelf ? "right" : "" }}
                        >
                          {text}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div>Tin nhắn đã được thu hồi</div>
            )}
          </div>

          <Typography.Text
            className="message-date"
            style={{
              flexDirection: fromSelf ? "row-reverse" : "",
            }}
          >
            {/* {format(createdAt, "yyyy/mm/dd")} */}
            {createdAt}
            <Button type="text" onClick={() => clicktest(message)}>
              {isclick === "❤️" ? (
                <div className="re">❤️</div>
              ) : (
                <div className="re">❤</div>
              )}
            </Button>
          </Typography.Text>
        </div>
      </div>
    </div>
  );
}
