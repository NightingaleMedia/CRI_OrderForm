import React from 'react'
        
const Billing = ( props ) => (        
        <div className="form-values">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <div className="divider2">Billing Info</div>
                  <input type="text" name="billingCompany" placeholder="Billing Company (required)" />
                  <input type="text" name="billingAddress" placeholder="Address (required)" />

                  <div className="city-state">
                    <input className="city" type="text" name="billingCity" placeholder="City (required)" />
                    <input classNameName="state" type="text" name="billingState" placeholder="State" />
                    <input classNameName="zip" type="text" name="billingZip" placeholder="Zip Code" />
                  </div>

                  <input type="text" name="billingContactName" placeholder="Contact Name (required)" />
                  <input type="text" name="billingPhone" placeholder="Phone (required)" />

                  <input type="hidden" name="date" placeholder="" value="date" required />
                  <input type="text" name="billingEmail" placeholder="eMail Address (required)" />
                  <p>*We will send a copy of this form to this email.</p>
                  <input type="text" name="poNumber" classNameName="poNumber" placeholder="PO Number (optional)" />
                </div>
              </div>
            </div>
          </div>

    )

export default Billing;