import { useEffect, type ComponentPropsWithoutRef } from "react";
import { createPortal } from "react-dom";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEscClick?: boolean;
};

export function Modal({
  isOpen,
  onClose,
  children,
  closeOnOverlayClick = true,
  closeOnEscClick = true,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeydown = (e: KeyboardEvent) => {
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

      <div className="bg-white rounded-lg p-6 lg:w-[380px]">{children}</div>
    </div>,
    document.getElementById("root")!
  );
}

const Title = (props: ComponentPropsWithoutRef<"p">) => (
  <p
    {...props}
    className={`text-lg text-dark-blue font-medium ${props.className}`}
  />
);

Modal.Title = Title;

const Description = (props: ComponentPropsWithoutRef<"p">) => (
  <p {...props} className={`text-sm text-grayish-blue" ${props.className}`} />
);

Modal.Description = Description;

const Footer = ({ children, ...props }: ComponentPropsWithoutRef<"footer">) => (
  <footer {...props} className={`flex items-center gap-3 ${props.className}`} > {children} </footer>
);

Modal.Footer = Footer;
