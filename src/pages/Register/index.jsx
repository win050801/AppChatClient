import React, { useState, useEffect } from "react";
import { Button, Col, Input, Row } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "react-phone-input-2/lib/style.css";
import { Link } from "react-router-dom";
import "./style.css";
import AuthOtp from "../AuthOtp";
import { app } from "../../firebse-config";
import {
    RecaptchaVerifier,
    signInWithPhoneNumber,
    getAuth,
} from "firebase/auth";
import axios from "axios";
import { KtraRoute } from "../../utils/APIRoutes";
export default function Register() {
    const [error, setError] = useState("");
    const [phonenumber, setNumber] = useState("");
    const [checkOtp, setCheckOtp] = useState(true);
    const [username, setname] = useState("");
    const [password, setpass] = useState("");
    const [cfpass, setcfpass] = useState("");
    const [flag, setFlag] = useState(false);
    const [otp, setOtp] = useState("");
    const [ktotp, setKTOtp] = useState(false);
    const [result, setResult] = useState("");
    const auth = getAuth(app);
    const handleRegister = () => {
        // setCheckOtp(!checkOtp);
        if (handleValidation()) {
            setError("");
            setCheckOtp(!checkOtp);
        }
    };
    function setUpRecaptha(phonenumber) {
        const recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
                // size:"invisible"
            },
            auth
        );
        recaptchaVerifier.render();
        return signInWithPhoneNumber(auth, phonenumber, recaptchaVerifier);
    }
    const handleValidation = () => {
        if (password !== cfpass) {
            setError("Xác nhận mật khẩu không đúng");
            return false;
        } else if (username.length < 1) {
            setError("Tên không được bỏ trống");
            return false;
        } else if (password.length < 8) {
            setError("Password should be equal or greater than 8 characters.");
            return false;
        }
        return true;
    };
    const getOtp = async (number) => {
        // e.preventDefault();

        const { data } = await axios.post(KtraRoute, {
            phonenumber: number.replace("+84", "0"),
        });

        if (data.status === true) {
            setError("");
            if (number === "" || number === undefined)
                return setError("Please enter a valid phone number!");
            try {
                const response = await setUpRecaptha(
                    number.replace("0", "+84")
                );
                setResult(response);
                setFlag(true);
                setKTOtp(true);
            } catch (err) {
                // toast.error(err.message, toastOptions);
            }
        } else {
            // toast.error(data.msg, toastOptions);
        }

        // console.log(number);
    };

    return (
        <div className="wrapper-register">
            <Row>
                <Col className="register-header" span={24}>
                    <span className="register-header-logo">Yalo</span>
                    <span className="register-header-title">
                        Đăng ký tài khoản Yalo để kết nối với bạn bè nhé
                    </span>
                </Col>
                <Col className="register-body" span={24}>
                    <form
                        className="register-form"
                        style={{ display: checkOtp ? "flex" : "none" }}
                    >
                        <div className="register-form-header">
                            <span>NHẬP THÔNG TIN TÀI KHOẢN</span>
                        </div>
                        <div className="register-input">
                            <Input
                                size="large"
                                bordered={false}
                                placeholder="Họ và tên"
                                onChange={(e) => setname(e.target.value)}
                                prefix={<UserOutlined />}
                            />
                        </div>
                        <div className="register-input">
                            <Input.Password
                                size="large"
                                bordered={false}
                                placeholder="Mật khẩu"
                                onChange={(e) => setpass(e.target.value)}
                                prefix={<LockOutlined />}
                            />
                        </div>
                        <div className="register-input">
                            <Input.Password
                                size="large"
                                bordered={false}
                                onChange={(e) => setcfpass(e.target.value)}
                                placeholder="Nhập lại mật khẩu"
                                prefix={<LockOutlined />}
                            />
                        </div>
                        <Button
                            className="register-btn-register"
                            onClick={handleRegister}
                        >
                            Đăng ký tài khoản
                        </Button>
                        <span
                            style={{
                                textAlign: "center",
                                fontSize: 16,
                                color: "red",
                            }}
                        >
                            {error}
                        </span>
                    </form>
                    <div style={{ display: !checkOtp ? "block" : "none" }}>
                        <AuthOtp username={username} password={password} />
                    </div>
                </Col>
                <Col className="login-footer" span={24}>
                    <span>
                        Bạn đã có tài khoản?{" "}
                        <Link to="/login">Đăng nhập ngay!</Link>
                    </span>
                </Col>
            </Row>
        </div>
    );
}
