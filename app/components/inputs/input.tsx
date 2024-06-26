import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { useState } from "react";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type = "text",
    disabled,
    register,
    required,
    errors
}) => {

    return (
        <div className="w-full relative">
            <input
                id={id}
                disabled={disabled}
                {...register(id, { required })}
                placeholder={label}
                type={type}
                className={`
                    peer
                    w-full
                    p-2
                    pt-4
                    font-light
                    bg-white
                    border-2
                    rounded-md
                    outline-none
                    transition
                    border-color 0.2s ease-in-out
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
                    ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
                `}
            />
        </div>
    );
};

export default Input;



