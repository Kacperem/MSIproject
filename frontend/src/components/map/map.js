import React, { useState } from "react";
import ReactMapGL, { GeolocateControl } from "react-map-gl";

const TOKEN =
  "pk.eyJ1Ijoia2FjcGVycmVtIiwiYSI6ImNrYXZpZHczczNsNHIzMXA2eGZjZjNwMXUifQ.GlqVRBjPz0cNx-KBRGKg6w";

const geolocateStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  margin: 10,
};

export default function map() {
  const [viewport, setViewport] = useState({
    latitude: 51.1088,
    longitude: 17.0582,
    width: "100vw",
    height: "100vh",
    zoom: 12,
  });

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        mapStyle="mapbox://styles/kacperrem/ckavk4unw3tza1ipsw744cz2y"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
      </ReactMapGL>
    </div>
  );
}
