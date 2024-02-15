import { useState } from "react";

export const useBoolean = (defaultIsOn = false) => {
  const [isOn, setIsOn] = useState(defaultIsOn);

  return [
    isOn,
    {
      toggle: () => setIsOn(!isOn),
      on: () => setIsOn(true),
      off: () => setIsOn(false),
    },
  ];
};

