import { useState } from "react";

export const useDisclosure = ({ defaultIsOpen = false } = {}) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  return {
    isOpen,
    toggle: () => setIsOpen(!isOpen),
    onOpen: () => setIsOpen(true),
    onClose: () => setIsOpen(false),
  };
};
