import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

// Modal Component
export default function DetailsModal({ isOpen, onClose, children }: DetailsModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef(null);

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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-start z-50 p-4 overflow-y-auto">
      <div
        ref={modalRef}
        className="bg-slate-800 rounded-lg p-8 max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto ml-12"
      >
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-transparent pb-4 border-b border-slate-700">
          <p className="text-2xl font-bold text-white">Project Details</p>
          <button
            onClick={handleClose}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-950 transition-colors"
          >
            X
          </button>
        </div>
        <div className="text-gray-300">{children}</div>
      </div>
    </div>
  );
}
