import { useEffect } from "react";

type ScrollHandler = () => void;

export function UseWheelListener(handler: ScrollHandler) {
  useEffect(() => {
    function onWheelMove() {
      handler();
    }

    document.addEventListener("wheel", onWheelMove);

    return () => document.removeEventListener("wheel", onWheelMove);
  }, [handler]);
}
