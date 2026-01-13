import React, {
  type PropsWithChildren,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  className: string;
}
// Modal Component
export default function Modal({
  title,
  isOpen,
  onClose,
  children,
  className = "",
}: PropsWithChildren<ModalProps>) {
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef(null);
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if the user clicked the backdrop, not the modal content
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Animate in from left
      gsap.fromTo(
        modalRef.current,
        { x: "-100%", opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
      );
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    // Animate out to right
    gsap.to(modalRef.current, {
      x: "100%",
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setIsClosing(false);
        onClose();
      },
    });
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div
      onClick={handleOverlayClick}
      className={`fixed inset-0 radial-gradient w-full backdrop-blur-sm flex items-center justify-start z-50 p-4 overflow-y-auto ${className}`}
    >
      <div
        ref={modalRef}
        className="hide-scrollbar bg-slate-800 rounded-lg p-4 md:p-8 max-w-[90rem] w-full my-4 md:my-8 max-h-[90vh] overflow-y-auto md:ml-12"
      >
        <div className="flex justify-between items-center mb-4 md:mb-6 sticky top-0 bg-transparent pb-4 border-b border-slate-700">
          <p className="text-xl md:text-2xl font-bold text-white">{title}</p>
          <button
            onClick={handleClose}
            className="bg-slate-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg hover:bg-slate-950 transition-colors text-sm md:text-base"
          >
            X
          </button>
        </div>
        <div className="flex-distance z-0">{children}</div>
      </div>
    </div>
  );
}
