import React, { ButtonHTMLAttributes } from 'react';

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => {
    return (
        <button
            {...props}
            className={`
                w-10 h-10 
                bg-zinc-900
                rounded-lg
                flex items-center justify-center
                ${className}
            `}
        />

    );
}

export default Button;