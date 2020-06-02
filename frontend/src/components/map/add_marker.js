import React, { Component } from "react";
import axios from "axios";
import { Button, Form, Container, Row, Col } from "react-bootstrap";

export default class Add_Marker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      name: "",
      latitude: "",
      longitude: "",
      description: "",
      image: null,
      imagePath: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.fillGeoLocation = this.fillGeoLocation.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    debugger;
    event.preventDefault();
    const bodyFormData = new FormData();
    for (const [key, value] of Object.entries(this.state))
    {
      bodyFormData.append(key, value); 
    }

    axios
      .post(
        "http://localhost:8000/api/locations/",
        bodyFormData,
        { withCredentials: true,
        headers: {
          "Authorization": `Token ${this.props.token}`,
        } }
      )
      .then((response) => {
        this.props.history.push("/map");
      })
  }

  fillGeoLocation() {
    navigator.geolocation.getCurrentPosition((location) => {
      this.setState({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
    })
  }

  render() {
    return (
      <Col xs={6} sm={6} md={6} lg={2}>
        <div className="add_marker">
          <Container>
            <h2>Add Marker</h2>
            <Row>
              <Form onSubmit={this.handleSubmit}>
                  
              <Button variant="outline-warning" type="button" size="lg" block onClick={this.fillGeoLocation}>
                  Generate Location
                </Button>
                
                <Form.Control
                  type="name"
                  name="name"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  size="lg"
                  required
                />

                <Form.Control
                  type="latitude"
                  name="latitude"
                  placeholder="Latitude"
                  value={this.state.latitude}
                  onChange={this.handleChange}
                  size="lg"
                  required
                />

                <Form.Control
                  type="longitude"
                  name="longitude"
                  placeholder="Longitude"
                  value={this.state.longitude}
                  onChange={this.handleChange}
                  size="lg"
                  required
                />

                <Form.Control
                  type="description"
                  name="description"
                  placeholder="Description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  size="lg"
                  required
                />

            
                <Form.Control
                  type="file"
                  name="image"
                  placeholder="Image"
                  value={this.state.imagePath}
                  onChange={(event) => {
                    const file = event.target.files[0];
                    console.log(event)
                    this.setState({
                      image: file,
                      imagePath: event.target.value,
                    })
                  }}
                  size="lg"
                />

                <Button variant="outline-success" type="submit" size="lg" block>
                  Add
                </Button>
                <Button variant="outline-danger" type="reset" size="lg" block>
                  Clean
                </Button>
              </Form>
            </Row>
          </Container>
        </div>
      </Col>
    );
  }
}
