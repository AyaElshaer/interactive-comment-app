/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { createPortal } from "react-dom";

export function Modal({
  isOpen,
  onClose,
  children,
  closeOnOverlayClick = true,
  closeOnEscClick = true,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeydown = (e) => {
      if (closeOnEscClick && e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [isOpen, closeOnEscClick]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
      <div
        className="absolute inset-0 -z-10 bg-black bg-opacity-60"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      <div className="bg-white rounded-lg p-6 w-96">{children}</div>
    </div>,
    document.getElementById("root")
  );
}

const Title = ({ children, className }) => (
  <p className={`text-lg text-dark-blue font-medium ${className}`}>
    {children}
  </p>
);

Modal.Title = Title;

const Description = ({ children, className }) => (
  <p className={`text-sm text-grayish-blue" ${className}`}>{children}</p>
);

Modal.Description = Description;

const Footer = ({ children, className }) => (
  <div className={`flex items-center gap-3 ${className}`}>{children}</div>
);

Modal.Footer = Footer;
