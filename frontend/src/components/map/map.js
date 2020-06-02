import React, { useState, useEffect } from "react";
import ReactMapGL, { GeolocateControl, Marker, Popup } from "react-map-gl";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./map.css";
import axios from "axios";

const TOKEN =
  "pk.eyJ1Ijoia2FjcGVycmVtIiwiYSI6ImNrYXZpZHczczNsNHIzMXA2eGZjZjNwMXUifQ.GlqVRBjPz0cNx-KBRGKg6w";

const geolocateStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  margin: 10,
};

export default function Map({loggedInStatus, token}) {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const [viewport, setViewport] = useState({
    latitude: 51.1088,
    longitude: 17.0582,
    width: "100vw",
    height: "100vh",
    zoom: 12,
  });
  useEffect(() => {
    axios.get("http://localhost:8000/api/locations/", { 
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`,
      } 
    })
    .then(response => {
      const data = response.data.map(marker => ({...marker, image: marker.image && `/api/image/${marker.image.substr(36)}` || undefined}))
      setMarkers(data)
    })
  }, [])
  

  return (
    <div>
      <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="#home">Mobilne systemy informatyczne</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="http://localhost:3000/add">Add New Marker</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
      <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Add</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    </div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        mapStyle="mapbox://styles/kacperrem/ckavk4unw3tza1ipsw744cz2y"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            latitude={Number(marker.latitude)}
            longitude={Number(marker.longitude)}
          >
            <button
              className="marker-btn"
              onClick={ e => {
                e.preventDefault();
                setSelectedMarker(marker);
              }}
            >
              <img src={marker.image} alt="Marker Icon" />
            </button>
          </Marker>
        ))}

        {selectedMarker ? (
          <Popup
            latitude={Number(selectedMarker.latitude)}
            longitude={Number(selectedMarker.longitude)}
            onClose={() => {
              setSelectedMarker(null);
            }}
          >
            <div>
              <h2>{selectedMarker.name}</h2>
              <p>{selectedMarker.description}</p>
            </div>
          </Popup>
        ) : null}
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
      </ReactMapGL>
    </div>
  );
}
