import { useCallback, useEffect, useState } from "react";
import { Geolocation, Position } from "@capacitor/geolocation";

interface Coordinates {
  lat: number;
  lng: number;
}

export const useNativeOrWebLocation = () => {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isNative = (): boolean => {
    const win = window as {
      Capacitor?: {
        isNativePlatform?: () => boolean;
      };
    };
    return Boolean(win.Capacitor?.isNativePlatform?.());
  };

  const getLocation = useCallback(async (): Promise<void> => {
    try {
      if (isNative()) {
        const coords: Position = await Geolocation.getCurrentPosition();
        setLocation({
          lat: coords.coords.latitude,
          lng: coords.coords.longitude,
        });
        return;
      }

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos: GeolocationPosition) => {
            setLocation({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });
          },
          (err: GeolocationPositionError) => {
            setError(err.message);
          },
          { enableHighAccuracy: true },
        );
        return;
      }

      setError("Geolocation not supported.");
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
      else setError(String(e));
    }
  }, []);

  useEffect(() => {
    void getLocation();
  }, [getLocation]);

  return { location, error, refresh: getLocation };
};
