import React, { useState } from "react";
import ReactMapGL, { GeolocateControl, Marker, Popup } from "react-map-gl";

const markers = [
  {
    id: 7,
    name: "test patch 4",
    latitude: "51.2540",
    longitude: "17.3690",
    description: "ala ma kota i nie ma psa",
    image: "",
  },
];
const TOKEN =
  "pk.eyJ1Ijoia2FjcGVycmVtIiwiYSI6ImNrYXZpZHczczNsNHIzMXA2eGZjZjNwMXUifQ.GlqVRBjPz0cNx-KBRGKg6w";

const geolocateStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  margin: 10,
};

export default function map() {
  const [viewport, setViewport, selectedMarker, setSelectedMarker] = useState({
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
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            latitude={marker.latitude}
            longitude={marker.longitude}
          >
            <button
              className="marker-btn"
              onClick={(e) => {
                e.preventDefault();
                setSelectedMarker(marker);
              }}
            >
              <img src="/skateboarding.svg" alt="Skate Park Icon" />
            </button>
          </Marker>
        ))}

        {selectedMarker ? (
          <Popup
            latitude={selectedMarker.latitude}
            longitude={selectedMarker.longitude}
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
