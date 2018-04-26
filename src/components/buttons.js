import React from 'react';

export default (handleNumeric, handleOperation, handleControl) => {
    return (
        <div className="panelWrapper">
            <div title="0" id="0" onClick={() => handleNumeric('0')} className="btn btn-lg">0</div>
            <div title="1" id="1" onClick={() => handleNumeric('1')} className="btn btn-lg">1</div>
            <div title="Backspace" id="delete" onClick={() => handleControl('delete')} className="btn btn-sm">DEL</div>
            <div title="Delete" id="clear" onClick={() => handleControl('clear')} className="btn btn-sm">CE</div>
            <div title="Escape" id="clearAll" onClick={() => handleControl('clearAll')} className="btn btn-sm">C</div>
            <div title="+" id="+" onClick={() => handleOperation('+')} className="btn btn-sm">+</div>
            <div title="-" id="-" onClick={() => handleOperation('-')} className="btn btn-sm">−</div>
            <div title="*" id="*" onClick={() => handleOperation('*')} className="btn btn-sm">×</div>
            <div title="/" id="/" onClick={() => handleOperation('/')} className="btn btn-sm">÷</div>
            <div title="not" id="not" onClick={() => handleOperation('not')} className="btn btn-sm">Not</div>
            <div title="and" id="and" onClick={() => handleOperation('and')} className="btn btn-sm">And</div>
            <div title="or" id="or" onClick={() => handleOperation('or')} className="btn btn-sm">Or</div>
            <div title="=" id="eval" onClick={() => handleControl('eval')} className="btn btn-lg">=</div>
        </div>
    )
};
