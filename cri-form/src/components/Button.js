import React from 'react';

const Button = ( props ) => {



    return (
        <button 
        id = {props.c}
        >
            { props.name }
        </button>
    );
}

export default Button;
