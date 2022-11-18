import React, { useState, useEffect } from "react";
import { Button, Col, Input, Row, Tabs } from "antd";
import { LockOutlined, MobileOutlined } from "@ant-design/icons";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import QRCode from "qrcode.react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import AuthOtp from "../AuthOtp";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../../utils/APIRoutes";

export default function Login() {
  const [checkOtp, setCheckOtp] = useState(true);
  const navigate = useNavigate();
  const [phonenumber, setphone] = useState("");
  const [password, setpass] = useState("");
  const [vlphone, setvlphone] = useState("");
  const [vlpass, setvlpass] = useState("");
  const [er, seter] = useState("");

  const handleAuthOtp = () => {
    setCheckOtp(!checkOtp);
  };

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        const { data } = await axios.post(loginRoute, {
          phonenumber,
          password,
        });
        if (data.status === false) {
          seter(data.msg);
        } else if (data.status === true) {
          // console.log(process.env.REACT_APP_LOCALHOST_KEY);
          localStorage.setItem(
            process.env.REACT_APP_LOCALHOST_KEY,
            JSON.stringify(data.user)
          );
          navigate("/");
        }
      } catch (error) {
        seter("Không thể kết nối đến server");
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);
  const validateForm = () => {
    if (phonenumber === "") {
      seter("SDT is required.");
      return false;
    } else if (password === "") {
      seter("Password is required.");

      return false;
    }
    return true;
  };

  return (
    <div className="wrapper-login">
      <Row>
        <Col className="login-header" span={24}>
          <span className="login-header-logo">Yalo</span>
          <span className="login-header-title">
            Đăng nhập tài khoản Yalo để kết nối với ứng dụng Yalo Web
          </span>
        </Col>
        <Col className="login-body" span={24}>
          <div style={{ display: checkOtp ? "block" : "none" }}>
            <Tabs
              defaultActiveKey="2"
              centered
              items={[
                {
                  label: `VỚI MÃ QR`,
                  key: "1",
                  children: (
                    <div className="login-qr">
                      <QRCode
                        className="qr-code"
                        value="Để cho zui"
                        size={250}
                        level={"H"}
                        includeMargin={true}
                      />
                      <span>Quét mã QR bằng Yalo để đăng nhập</span>
                    </div>
                  ),
                },
                {
                  label: `VỚI SỐ ĐIỆN THOẠI`,
                  key: "2",
                  children: (
                    <form className="login-form">
                      <div className="login-phone-input">
                        <MobileOutlined
                          style={{
                            fontSize: "17px",
                            padding: "0 11px",
                          }}
                        />
                        <ReactPhoneInput
                          className="phone-input"
                          country={"vn"}
                          placeholder="Số điện thoại"
                          autoFormat
                          onChange={(e) => setphone(e)}
                          disableCountryCode
                          inputStyle={{ border: "none" }}
                          buttonStyle={{
                            border: "none",
                            backgroundColor: "white",
                          }}
                        ></ReactPhoneInput>
                      </div>
                      <span
                        style={{ color: "red", paddingLeft: 50, fontSize: 15 }}
                      >
                        {vlphone}
                      </span>
                      <br></br>
                      <div className="login-password-input">
                        <Input.Password
                          size="large"
                          bordered={false}
                          placeholder="Mật khẩu"
                          onChange={(e) => setpass(e.target.value)}
                          prefix={<LockOutlined />}
                        />
                      </div>
                      <span
                        style={{ color: "red", paddingLeft: 50, fontSize: 15 }}
                      >
                        {vlpass}
                      </span>
                      <Button className="login-btn-login" onClick={handleLogin}>
                        Đăng nhập với mật khẩu
                      </Button>
                      <Button
                        className="login-btn-sender"
                        onClick={handleAuthOtp}
                      >
                        Gửi yêu cầu đăng nhập
                      </Button>

                      <Link className="login-link" to="/repassword">
                        Quên mật khẩu?
                      </Link>
                      <span
                        style={{
                          color: "red",
                          textAlign: "center",
                          fontSize: 16,
                        }}
                      >
                        {er}
                      </span>
                    </form>
                  ),
                },
              ]}
            />
          </div>

          <div style={{ display: !checkOtp ? "block" : "none" }}>
            <AuthOtp />
          </div>
        </Col>
        <Col className="login-footer" span={24}>
          <span>
            Bạn chưa có tài khoản? <Link to="/register">Đăng ký ngay!</Link>
          </span>
        </Col>
      </Row>
    </div>
  );
}
