import { useEffect } from "react";

function Modal({ children, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "rgba(0,0,0,0.35)",
        zIndex: 1050,
      }}
    >
      <div
        className="p-4"
        style={{
          backgroundColor: "var(--bs-secondary)",
          width: "95%",
          maxWidth: "700px",
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: "12px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
