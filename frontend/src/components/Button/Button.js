import React from 'react';
import './Button.css';

const Button = ({ text, onClick }) => {
    return (
        <button className="button2" onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
