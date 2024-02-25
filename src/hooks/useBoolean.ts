import { useState } from "react";

export type UseBooleanReturn = [
  boolean,
  {
    toggle: () => void;
    on: () => void;
    off: () => void;
  }
];

export const useBoolean = (defaultIsOn = false): UseBooleanReturn => {
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
