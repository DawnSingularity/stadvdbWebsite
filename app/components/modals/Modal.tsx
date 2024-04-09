'use client';

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps{
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
}


/**
 * 
 * @param isOpen - to check if modal is open
 * @param onClose - to check if modal is close
 * @param onSubmit - to check if they click submit
 * @param title - title of the modal
 * @param body - the body of the modal
 * @param footer - the footer of the modal
 * @param actionLabel - the text inside the button i.e. submit
 * @param disabled - when the action has been click and the modal needs to be in a disabled state
 * 
 * @returns a modal on the screen
 */


// Modal Component
const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
}) => {
    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }
        onClose();
    }, [disabled, onClose]);

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }
        onSubmit();
    }, [disabled, onSubmit]);

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-800/70">
                    <div className="bg-white w-full md:w-4/6 lg:w-3/6 xl:w-2/5 rounded-lg shadow-lg overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b border-neutral-300">
                            <h2 className="text-lg font-semibold">{title}</h2>
                            <button onClick={handleClose}>
                                <IoMdClose size={18} />
                            </button>
                        </div>
                        <div className="p-6" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                            {body}
                        </div>
                        <div className="p-6 flex justify-end">
                            <Button disabled={disabled} label={actionLabel} onClick={handleSubmit} />
                        </div>
                        {footer && <div className="p-6">{footer}</div>}
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;