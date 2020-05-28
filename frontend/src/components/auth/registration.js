import React, { Component } from "react";
import axios from "axios";
import { Button, Form, Container, Row, Col, Badge } from "react-bootstrap";
import "./style.css";

class registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    const { username, email, password } = this.state;

    axios
      .post(
        "http://localhost:8000/api/register",
        {
          username: username,
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("registration res", response);
      })
      .catch((error) => {
        console.log("registration error", error);
      });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
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
                    Register <Badge variant="secondary">Now</Badge>
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

                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={this.state.email}
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
                  Register
                </Button>
              </Form>
            </Row>
          </Container>
        </div>
      </Col>
    );
  }
}

export default registration;
