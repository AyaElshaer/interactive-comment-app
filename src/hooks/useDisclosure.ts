import { useState } from "react";

export type UseDisclosureReturn = {
  isOpen: boolean;
  toggle: () => void;
  onOpen: () => void;
  onClose: () => void;
};

export const useDisclosure = ({ defaultIsOpen = false } = {}): UseDisclosureReturn => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  return {
    isOpen,
    toggle: () => setIsOpen(!isOpen),
    onOpen: () => setIsOpen(true),
    onClose: () => setIsOpen(false),
  };
};
