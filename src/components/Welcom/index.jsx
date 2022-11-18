import { Col, Row } from "antd";

import "./style.css";
import Logo from "../../assets/images/signin-image.jpg";
import React, { useState, useEffect } from "react";

export default function Sidebar({ contacts, changeChat }) {
  return (
    <div className="container">
      <div className="form">
        <div className="header">
          <h2>
            Chào mừng đến với{" "}
            <span style={{ color: "#0169ff", fontWeight: "bold" }}>
              YALO CHAT !
            </span>
          </h2>
        </div>
        <div className="bd">
          <img src={Logo} alt="logo" />
        </div>
      </div>
    </div>
  );
}
