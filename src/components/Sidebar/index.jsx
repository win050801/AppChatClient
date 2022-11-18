import { Col, Row } from "antd";
import MainTab from "../MainTab";
import "./style.css";
import Navbar from "../Navbar";
import React from "react";

export default function Sidebar({ contacts, changeChat }) {
  return (
    <div className="sidebar">
      <Row>
        <Col span={4}>
          <MainTab />
        </Col>
        <Col span={20}>
          <Navbar contacts={contacts} changeChat={changeChat} />
        </Col>
      </Row>
    </div>
  );
}
