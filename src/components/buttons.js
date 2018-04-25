import React from 'react';

export default (handleNumeric, handleOperation, handleControl) => {
    return (
        <div className="panelWrapper">
            <div onClick={() => handleNumeric('0')} className="btn btn-lg">0</div>
            <div onClick={() => handleNumeric('1')} className="btn btn-lg">1</div>
            <div onClick={() => handleControl('delete')} className="btn btn-sm">DEL</div>
            <div onClick={() => handleControl('clear')} className="btn btn-sm">CE</div>
            <div onClick={() => handleOperation('+')} className="btn btn-sm">+</div>
            <div onClick={() => handleOperation('-')} className="btn btn-sm">−</div>
            <div onClick={() => handleOperation('*')} className="btn btn-sm">×</div>
            <div onClick={() => handleOperation('/')} className="btn btn-sm">÷</div>
            <div onClick={() => handleControl('clearAll')} className="btn btn-sm">C</div>
            <div onClick={() => handleControl('eval')} className="btn btn-lg">=</div>
        </div>
    )
};
