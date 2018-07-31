//import React, { Component } from 'react';
import React from 'react';

const search = ({ value, onChange, onSubmit, children }) =>
    <form onSubmit={onSubmit}>
        <input type="text" value={value} onChange={onChange} />
        <button type="submit">
            {children}
        </button>

    </form>

export default search;