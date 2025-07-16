import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const socket = io("http://localhost:3000");

function App() {
  const [myPosition, setMyPosition] = useState(null);
  const [otherUsers, setOtherUsers] = useState([]);

  useEffect(() => {
    const watch = navigator.geolocation.watchPosition((pos) => {
      const coords = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        id: socket.id,
      };
      setMyPosition(coords);
      socket.emit("location:update", coords);
    });

    socket.on("location:receive", (coords) => {
      setOtherUsers((prev) => [...prev.filter((u) => u.id !== coords.id), coords]);
    });

    return () => {
      navigator.geolocation.clearWatch(watch);
    };
  }, []);
  const users = [
    { lat: 10.87342, lng: 20.6732 },
    { lat: 71.2321, lng: 50.6732 },
  ];

  return (
    <MapContainer center={[30.3753, 69.3451]} zoom={5} style={{ height: "100vh", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {myPosition && (
        <Marker position={[myPosition.lat, myPosition.lng]}>
          <Popup>You</Popup>
        </Marker>
      )}
      {users.map((user) => (
        <Marker position={[user.lat, user.lng]}>
          <Popup>Other User</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default App;
