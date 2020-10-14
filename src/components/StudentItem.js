import './style.scss';
import React from 'react';

const StudentItem = ({id,name,lastName,onClick}) => {
    return (
        <div className="card std-item" onClick={()=>onClick(id)}>
            <span>
                {id}
            </span>
            <span>
                {name}
            </span>
            <span>
                {lastName}
            </span>
        </div>
    )
};

export default StudentItem;