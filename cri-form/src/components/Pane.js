import React, { Component } from 'react'
import Billing from './sections/Billing'

class Pane extends Component {
    render() {

    // const { Section } = this.props;

    return (
        <div className="single-pane add-verify container" data-name="Billing" data-selected="true">
            <div className="title-of-section">
                <h1>{this.props.sectionTitle}</h1>
            </div>
            < Billing />
        </div>
    );
    }
}

export default Pane;

