import React from 'react';

const Districts =() => {
    return (
        
        <div className="ui form">
            <h5 className="ui header">
              <i className="map marker alternate icon small"></i>
              <div className="content">
                Distritos
              </div>
            </h5>
            <div className="inline field">
                <div className="ui checkbox">
                    <input type="checkbox" tabIndex="0" className="hidden" />
                    <label>Chamartin</label>
                </div>
            </div>
            <div className="inline field">
                <div className="ui checkbox">
                    <input type="checkbox" tabIndex="0" className="hidden" />
                    <label>Tetuan</label>
                </div>
            </div>
        </div>
    ); 
}

export default Districts;