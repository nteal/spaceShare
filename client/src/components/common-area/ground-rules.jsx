import React from 'react';
import MediaQuery from 'react-responsive';
import ArrowLeftBoldCircle from 'mdi-react/ArrowLeftBoldCircleIcon.js';

const GroundRules = (props) => {
  const { groundRules } = props;
  const handleBack = () => {
    props.history.goBack();
  };
  return (
    <div className="container">
      <div className="row">
        <MediaQuery minDeviceWidth={800}>
          <div className="heading-box mt-neg">
            <h1>Our Ground Rules</h1>
          </div>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={600}>
          <div className="mobile-heading-box mt-neg">
            <h2>Our Ground Rules</h2>
          </div>
        </MediaQuery>
      </div>
      <div className="row">
        <button className="custom-btn" onClick={handleBack}>
          <ArrowLeftBoldCircle className="mdi-btn" height={50} width={50} fill="#6F5BC0" />
        </button>
      </div>
      <main>
        <div className="row">
          <div className="content-box">
            <div className="invisible-content-box">
              <p>
                {groundRules}
              </p>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default GroundRules;
