import React, { Component } from "react";
import axios from "axios";

import Registration from "./auth/Registration";
import Login from "./auth/Login";


import "bootstrap/dist/css/bootstrap.css";
import { Col, Tabs, Tab } from "react-bootstrap";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    this.props.history.push("/dashboard");
  }

  handleLogoutClick() {
    axios
      .delete("", { withCredentials: true })
      .then((response) => {
        this.props.handleLogout();
      })
      .catch((error) => {
        console.log("logout error", error);
      });
  }

  render() {
    return (
      <div>
        <Col xs={12} sm={12} md={12} lg={12}>
          <h1>MOb APP</h1>
          <h1>Status: {this.props.loggedInStatus}</h1>
          <button onClick={() => this.handleLogoutClick()}>Logout</button>
        </Col>
        <Tabs
          defaultActiveKey="home"
          id="noanim-tab-example"
        >
          <Tab eventKey="home" title="Register">
            <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
          </Tab>
          <Tab eventKey="profile" title="Login">
            <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
          </Tab>
        </Tabs>
      </div>

    );
  }
}
