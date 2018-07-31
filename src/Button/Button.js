import React from 'react';

const button = ({ onClick, className = '', children }) =>
    <button
        onClick={onClick}
        className={className}
        type="button">
        {children}
    </button>

export default button;