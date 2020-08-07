import React from 'react';

const ProgressNodes = () => {
    return (
    <div className="progress-nodes">
          <div className="progress-nodes--completed"></div>
          <ul>
            <li className="current">
              <div></div>
              <a href="#">Order</a>
            </li>
            <li>
              <div></div>
              <a href="#">Billing</a>
            </li>
            <li>
              <div></div>
              <a href="#">Generator</a>
            </li>
            <li data-node-name="Materials">
              <div></div>
              <a href="#">Materials</a>
            </li>
            <ul className="sub-item--ul">

            </ul>
            <li>
              <div></div>
              <a href="#">Containers</a>
            </li>
            <li>
              <div></div>
              <a href="#">
                <center>Site</center>
              </a>
            </li>
          </ul>
        </div>
    );
};

export default ProgressNodes;
