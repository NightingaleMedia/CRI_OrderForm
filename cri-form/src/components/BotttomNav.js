import React from 'react';
import Button from './Button'

const BotttomNav = ( props ) => {
    return (
        <div className="button--wrapper"> 
            <div className="button--section submit-form--button">
                <Button name="Previous" type="Prev"/> 
                <Button name="Submit"/> 
                <Button name="Next"/> 
                
            </div>
        </div>          
    );
}

export default BotttomNav;
