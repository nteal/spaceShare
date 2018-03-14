import React from 'react';
import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';
import ArrowLeftBoldCircle from 'mdi-react/ArrowLeftBoldCircleIcon.js';

const GroundRules = (props) => {
  const { groundRules, isOwner } = props;
  const handleBack = () => {
    props.history.goBack();
  };
  return (
    <div>
      <MediaQuery minDeviceWidth={800}>
        <button className="custom-btn" onClick={handleBack}>
          <ArrowLeftBoldCircle className="mdi-btn" height={50} width={50} fill="#6F5BC0" />
        </button>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={799}>
        <button className="custom-btn mobile-back-btn" onClick={handleBack}>
          <ArrowLeftBoldCircle className="mdi-btn" height={75} width={75} fill="#6F5BC0" />
        </button>
      </MediaQuery>
      
      <div className="container mt-neg-3">
        <div className="row">
          <MediaQuery minDeviceWidth={800}>
            <div className="heading-box mt-neg">
              <h1>Our Ground Rules</h1>
            </div>
          </MediaQuery>
          <MediaQuery maxDeviceWidth={600}>
            <div className="mobile-heading-box mt-neg-3">
              <h2>Our Ground Rules</h2>
            </div>
          </MediaQuery>
        </div>
        <main>
          <div className="row pt-4">
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
    </div>
  );
};

GroundRules.propTypes = {
  groundRules: PropTypes.string,
  isOwner: PropTypes.bool,
};

GroundRules.defaultProps = {
  groundRules: 'This space does not have ground rules yet!',
  isOwner: false,
};

export default GroundRules;
