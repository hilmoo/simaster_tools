import { useEffect } from "react";

const useDisableMenu = () => {
  useEffect(() => {
    const disableMenu = () => {
      if (window.location.hostname !== "tauri.localhost") {
        return;
      }

      const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
        return false;
      };

      const handleSelectStart = (e: Event) => {
        e.preventDefault();
        return false;
      };

      document.addEventListener("contextmenu", handleContextMenu, {
        capture: true,
      });
      document.addEventListener("selectstart", handleSelectStart, {
        capture: true,
      });

      return () => {
        document.removeEventListener("contextmenu", handleContextMenu, {
          capture: true,
        });
        document.removeEventListener("selectstart", handleSelectStart, {
          capture: true,
        });
      };
    };

    disableMenu();
  }, []);
};

export default useDisableMenu;
