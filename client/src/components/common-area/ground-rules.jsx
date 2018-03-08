import React from 'react';
import ArrowLeftBoldCircle from 'mdi-react/ArrowLeftBoldCircleIcon.js';

const GroundRules = (props) => {
  const handleBack = () => {
    props.history.goBack();
  };
  return (
    <div className="container">
      <div className="row">
        <div className="heading-box">
          <h1>Our Ground Rules</h1>
        </div>
      </div>
      <div className="row">
        <button className="custom-btn" onClick={handleBack}>
          <ArrowLeftBoldCircle className="mdi-btn" height={50} width={50} fill="#6F5BC0" />
        </button>
      </div>
      <div className="row">
        {/* ground rules */}
      </div>

    </div>
  );
};

export default GroundRules;
