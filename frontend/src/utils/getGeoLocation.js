export default function getLocation() {
  navigator.geolocation.watchPosition((position) => {
    const { latitude, longitude } = position.coords;
    console.log(latitude, longitude);
  });
}
