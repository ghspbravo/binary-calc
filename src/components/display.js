import React from 'react';

export default (value, expression) => {
    return (
        <div className="display">
            <div className="expression">{expression}</div>
            <div dir="rtl" className="currentValue">{value}</div>
        </div>
    )
};
