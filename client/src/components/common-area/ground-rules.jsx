import React from 'react';
import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';
import ArrowLeftBoldCircle from 'mdi-react/ArrowLeftBoldCircleIcon.js';
import AboutInput from '../profile/aboutInput.jsx';

const GroundRules = (props) => {
  const { groundRules, submit, isOwner } = props;
  const handleBack = () => {
    props.history.goBack();
  };
  let display;
  if (isOwner) {
    display = (
      <AboutInput
        value={groundRules}
        field="groundRules"
        header="Edit your ground rules"
        placeholder="Set some ground rules for your space!"
        finalize={submit}
      />
    );
  } else {
    display = (
      <div className="content-box">
        <div className="invisible-content-box">
          <p>
            {groundRules}
          </p>
        </div>
      </div>
    );
  }
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
          <div className="row pt-5">
            {display}
          </div>
        </main>
      </div>
    </div>
  );
};

GroundRules.propTypes = {
  groundRules: PropTypes.string,
  submit: PropTypes.func,
  isOwner: PropTypes.bool,
};

GroundRules.defaultProps = {
  groundRules: 'This space does not have ground rules yet!',
  submit: null,
  isOwner: false,
};

export default GroundRules;
