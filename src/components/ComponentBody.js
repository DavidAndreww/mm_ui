import React from 'react';

const ComponentBody = (props) => {
    
    return (
        <div className="component-wrapper">
            {props.children}
        </div>
    )    
}
export default ComponentBody;