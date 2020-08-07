import React from 'react'

const Header = ( props ) => ( 
    <React.Fragment> 
        <header className="title">
            <div className="row">
            <div className="col-md-6">
                <div className="logo-holder"></div>
            </div>
            <div className="col-md-6">
                <div className="order-form-title">
                    <h2>Recycling Order Form</h2>
                    <p>www.cleanlites.com | p. 513-641-4155</p>
                </div>
            </div>
            </div>
        </header>
    </React.Fragment>
)

export default Header;