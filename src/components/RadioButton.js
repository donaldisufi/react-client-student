import React from 'react';

function RadioButton({ onClick, data, isSelected }) {
    return (
        <div onClick={() => onClick(data.id)} className={`radio-button-container`}>
            <div className={`${isSelected ? 'selected' : 'select'}`} />
            <p>
                {data.name}
            </p>
        </div>
    );
};

export default RadioButton;