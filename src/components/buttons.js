import React from 'react';

export default (handleNumeric, handleOperation, handleControl) => {
    return (
        <div className="panelWrapper">
            <button title="0" id="0" onClick={() => handleNumeric('0')} className="btn btn-lg">0</button>
            <button title="1" id="1" onClick={() => handleNumeric('1')} className="btn btn-lg">1</button>
            <button title="Backspace" id="delete" onClick={() => handleControl('delete')} className="btn btn-sm">DEL</button>
            <button title="Delete" id="clear" onClick={() => handleControl('clear')} className="btn btn-sm">CE</button>
            <button title="Escape" id="clearAll" onClick={() => handleControl('clearAll')} className="btn btn-sm">C</button>
            <button title="+" id="+" onClick={() => handleOperation('+')} className="btn btn-sm">+</button>
            <button title="-" id="-" onClick={() => handleOperation('-')} className="btn btn-sm">−</button>
            <button title="*" id="*" onClick={() => handleOperation('*')} className="btn btn-sm">×</button>
            <button title="/" id="/" onClick={() => handleOperation('/')} className="btn btn-sm">÷</button>
            <button title="=" id="eval" onClick={() => handleControl('eval')} className="btn btn-lg">=</button>
        </div>
    )
};
