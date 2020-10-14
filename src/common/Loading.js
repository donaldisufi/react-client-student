import React from 'react';

const Loading = () => {
    return (
        <div style={{height:'100%',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <img 
                alt="loading"
                src={require('../assets/loading-gif.gif')}
            />
        </div>
    )
};

export default Loading;