import { XIcon } from "lucide-react";
import PropTypes from "prop-types";
import { useCallback, useEffect, useRef } from "react";

export function Modal({ open, openChange, children }) {
  const dialogRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    dialogRef.current.close();
  };

  const onClick = useCallback((event) => {
    if (event.target === dialogRef.current) {
      dialogRef.current.close();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
    };
  }, [onClick]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      dialogRef.current.showModal();
    } else {
      document.body.style.overflow = "auto";
      dialogRef.current.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={() => openChange(false)}
      className="backdrop:bg-black/40 rounded-xl border-none shadow-md p-8 pb-4 max-w-screen-md w-full"
    >
      <form
        className="max-h-72 overflow-auto relative"
        method="dialog"
        onSubmit={onSubmit}
      >
        <button className="text-gray-700 hover:text-blue-500 absolute top-0 right-0">
          <XIcon className="size-5" />
          <span className="sr-only">Close</span>
        </button>

        {children}
      </form>
    </dialog>
  );
}

Modal.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.node,
  openChange: PropTypes.func,
};

export function ModalHeader({ children }) {
  return (
    <header>
      <h2 className="text-2xl mb-4 font-semibold text-gray-900">{children}</h2>
    </header>
  );
}

ModalHeader.propTypes = {
  children: PropTypes.node,
};

export function ModalContent({ children }) {
  return <main className="py-4">{children}</main>;
}

ModalContent.propTypes = {
  children: PropTypes.node,
};

export function ModalFooter({ children }) {
  return <footer className="flex flex-end justify-end pt-4">{children}</footer>;
}

ModalFooter.propTypes = {
  children: PropTypes.node,
};
