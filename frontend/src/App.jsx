import { useEffect, useState } from "react";
import { socket } from "./config/socket";
import { useLiveLocation } from "./hooks/useLiveLocation";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon from "./pin.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
function App() {
  const [myPosition, setMyPosition] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  useLiveLocation((coords) => {
    setMyPosition(coords);
    socket.emit("location:send", { latitude: coords.lat, longitude: coords.lng });
  });
  useEffect(() => {
    socket.on("location:receive", (data) => {
      console.log("data other", data);
      setOtherUser({ lat: data.lat, lng: data.long });
    });
  }, []);
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
  });
  return (
    <div style={{ height: "100vh" }}>
      {myPosition && (
        <MapContainer
          center={[myPosition.lat, myPosition.lng]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          {/* {myPosition && (
            <Marker position={[myPosition.lat, myPosition.lng]}>
              <Popup>My Location</Popup>
            </Marker>
          )} */}
          {otherUser && (
            <Marker icon={markerIcon} position={[otherUser.lat, otherUser.lng]}>
              <Popup>Other user</Popup>
            </Marker>
          )}
        </MapContainer>
      )}
    </div>
  );
}

export default App;
