import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { MobileOutlined } from "@ant-design/icons";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./style.css";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { app } from "../../firebse-config";
import {
    RecaptchaVerifier,
    signInWithPhoneNumber,
    getAuth,
} from "firebase/auth";
import axios from "axios";
import { KtraRoute } from "../../utils/APIRoutes";
import { registerRoute } from "../../utils/APIRoutes";
import { async } from "@firebase/util";
export default function AuthOtp({ username, password }) {
    const [flag, setFlag] = useState(false);
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const [phonenumber, setNumber] = useState("");
    const auth = getAuth(app);
    const [error, setError] = useState("");
    const [result, setResult] = useState("");

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
    const getOtp = async (e) => {
        e.preventDefault();
        // alert(phonenumber)
        const { data } = await axios.post(KtraRoute, {
            phonenumber: phonenumber,
        });
        // alert(phonenumber)
        if (data.status === true) {
            setError("");
            if (phonenumber === "" || phonenumber === undefined)
                return setError("Please enter a valid phone number!");
            try {
                const response = await setUpRecaptha(
                    phonenumber.replace("0", "+84")
                );
                setResult(response);
                setFlag(!flag);
            } catch (err) {
                setError(err);
            }
        } else {
        }
    };
    const verifyOtp = async (e) => {
        e.preventDefault();

        if (otp === "" || otp === null) {
            setError("Mã OTP không hợp lệ");
            return;
        }

        try {
            await result.confirm(otp);
            const { data } = await axios.post(registerRoute, {
                phonenumber: phonenumber.replace("+84", "0"),
                username,
                password,
            });

            if (data.status === false) {
                setError(data.msg);
            }
            if (data.status === true) {
                localStorage.setItem(
                    process.env.REACT_APP_LOCALHOST_KEY,
                    JSON.stringify(data.user)
                );
                navigate("/");
            }
        } catch (err) {
            // setError(err.message);
            setError("Mã OTP không hợp lệ");
        }
    };
    const handleSendOtp = async (e) => {
        e.preventDefault();
        // setFlag(!flag);
        // alert(phonenumber)
    };

    const handleConfirmOtp = () => {
        setFlag(!flag);

        // Điều hướng đến home, register or re password
        // navigate("/");
        navigate("/register");
        // navigate("/repassword");
    };

    function handleInputOtp(OTP) {
        setOtp(OTP);
        console.log(otp);
    }

    const chanPhoneNumber = async (e) => {
        setNumber(e);
        const { data } = await axios.post(KtraRoute, {
            phonenumber: e,
        });
        if (data.status === false) {
            setError("SDT da duoc su dung");
        } else setError("");
    };

    return (
        <div>
            <div style={{ display: !flag ? "flex" : "none" }}>
                <form className="otp-form" onSubmit={(event) => getOtp(event)}>
                    <div className="register-form-header">
                        <span>NHẬP SỐ ĐIỆN THOẠI</span>
                    </div>
                    <div className="login-phone-input otp-form-input">
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
                            onChange={(e) => chanPhoneNumber(e)}
                            disableCountryCode
                            inputStyle={{ border: "none" }}
                            buttonStyle={{
                                border: "none",
                                backgroundColor: "white",
                            }}
                        ></ReactPhoneInput>
                    </div>
                    <Button className="register-btn-register" onClick={getOtp}>
                        Gửi mã OTP
                    </Button>
                    <span
                        style={{
                            textAlign: "center",
                            fontSize: 16,
                            color: "red",
                            paddingTop: 10,
                        }}
                    >
                        {error}
                    </span>
                    <div id="recaptcha-container"></div>
                </form>
            </div>
            <div style={{ display: flag ? "flex" : "none" }}>
                <form className="otp-form" onSubmit={verifyOtp}>
                    <div className="register-form-header">
                        <span>NHẬP MÃ OTP</span>
                    </div>
                    <div className="otp-input">
                        <OtpInput
                            value={otp}
                            onChange={(e) => setOtp(e)}
                            inputStyle="inputStyle"
                            numInputs={6}
                            separator={<span></span>}
                        />
                    </div>
                    <Button
                        className="register-btn-register"
                        onClick={verifyOtp}
                    >
                        Xác nhận
                    </Button>
                    <span>{error}</span>
                </form>
            </div>
        </div>
    );
}
