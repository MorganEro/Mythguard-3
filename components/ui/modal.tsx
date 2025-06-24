'use client'

import { X } from "lucide-react";
import { useEffect } from "react";


type ModalProps = {
    onClose: () => void;
    children: React.ReactNode;
}

function Modal({ onClose, children }: ModalProps) {

    useEffect(() => {
        const handleKeydown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        }; window.addEventListener('keydown', handleKeydown);
        return () => {
            window.removeEventListener('keydown', handleKeydown);
        };
    }, [onClose]);
    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white p-2 rounded hover:bg-white/10"
            >
                <X size={24} />
            </button>
            {children}
        </div>
    );
}

export default Modal;
