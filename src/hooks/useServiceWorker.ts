import { ServiceWorkerStatusProps } from "@/props";
import { useEffect, useState } from "react";

export const useServiceWorker = (): ServiceWorkerStatusProps => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      console.warn("⚠️ Service workers are not supported in this browser.");
      return;
    }

    let refreshing = false;

    const registerServiceWorker = async () => {
      try {
        const reg = await navigator.serviceWorker.register("/sw.js");
        setRegistration(reg);
        setIsRegistered(true);

        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;
          if (!newWorker) return;

          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              setUpdateAvailable(true);
            }
          });
        });
      } catch (error) {
        console.error("❌ Service Worker registration failed:", error);
      }
    };

    window.addEventListener("load", registerServiceWorker);

    const handleControllerChange = () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    };

    navigator.serviceWorker.addEventListener(
      "controllerchange",
      handleControllerChange,
    );

    return () => {
      window.removeEventListener("load", registerServiceWorker);
      navigator.serviceWorker.removeEventListener(
        "controllerchange",
        handleControllerChange,
      );
    };
  }, []);

  const reloadApp = () => {
    window.location.reload();
  };

  return { updateAvailable, isRegistered, registration, reloadApp };
};
