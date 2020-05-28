import React, { Component } from "react";
import axios from "axios";
import { Button, Form, Container, Row, Col, Badge } from "react-bootstrap";
import "./style.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const { username, password } = this.state;

    axios
      .post(
        "http://localhost:8000/api/login",
        {
          username: username,
          password: password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.logged_in) {
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch((error) => {
        console.log("login error", error);
      });
    event.preventDefault();
  }
  render() {
    return (
      <Col xs={10} sm={10} md={10} lg={10}>
        <div className="login">
          <Container>
            <Row>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicUsername">
                <h1>
    Login <Badge variant="secondary">Now</Badge>
  </h1>
                 
                  <Form.Control
                    type="username"
                    name="username"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    size="lg"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
           
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    size="lg"
                    required
                  />
                </Form.Group>

                <Button variant="outline-success" type="submit" size="lg" block>
                  Login
                </Button>
              </Form>
            </Row>
          </Container>
        </div>
      </Col>
    );
  }
}
