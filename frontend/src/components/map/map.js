import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

export default function map() {
  const TOKEN =
    "pk.eyJ1Ijoia2FjcGVycmVtIiwiYSI6ImNrYXZpZHczczNsNHIzMXA2eGZjZjNwMXUifQ.GlqVRBjPz0cNx-KBRGKg6w";

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
      ></ReactMapGL>
    </div>
  );
}
