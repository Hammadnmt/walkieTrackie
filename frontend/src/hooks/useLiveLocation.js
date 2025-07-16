import { useEffect } from "react";

export function useLiveLocation(callback) {
  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Error");
    }
    const watch = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        callback({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.log("eer", error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 5000,
      }
    );
    return () => navigator.geolocation.clearWatch(watch);
  }, [callback]);
}
