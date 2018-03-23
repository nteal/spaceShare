import React from 'react';
import PropTypes from 'prop-types';
import Home from 'mdi-react/HomeIcon.js';
import Domain from 'mdi-react/DomainIcon.js';
import AccountMultiple from 'mdi-react/AccountMultipleIcon.js';
import Smoking from 'mdi-react/SmokingIcon.js';
import Paw from 'mdi-react/PawIcon.js';

const SearchParams = (props) => {
  const {
    purpose,
    location, radius,
    priceMin, priceMax,
    timeline,
    smoking, pet,
    includesPeople,
    sleep, personality, ageMin, ageMax,
  } = props;
  const purposeGlyph = purpose === 'work' ? (
    <Domain height={25} width={25} />
  ) : (
    <Home height={25} width={25} />
  );

  return (
    <div className="row ml-0">
      <div className="row mr-2">
        {purposeGlyph} <h5 className="h-result mb-0">{purpose}:</h5>
      </div>
      <div className="row">
        <div className="flex-column pr-1">
          <div className="row ml-0">
            <span className="badge badge-primary">
              {location}
            </span>
          </div>
          <div className="row mt-1 ml-0">
            <span className="badge badge-primary">
              {radius}-mile-radius
            </span>
          </div>
        </div>
        <div className="flex-column pl-1 pr-1">
          <div className="row ml-0">
            <span className="badge badge-info">
              ${new Number(priceMin).toLocaleString()} - {new Number(priceMax).toLocaleString()}
            </span>
          </div>
          <div className="row mt-1 ml-0">
            <span className="badge badge-info">
              {timeline}
            </span>
          </div>
        </div>
        <div className="flex-column pl-1 pr-2">
          <div className="row ml-0">
            <span className="badge badge-info">
              <div className="row ml-0 mr-0">
                <Smoking className="mr-1" height={12} width={12} fill="#FFF" />
                {smoking}
              </div>
            </span>
          </div>
          <div className="row mt-1 ml-0">
            <span className="badge badge-info">
              <div className="row ml-0 mr-0">
                <Paw className="mr-1" height={12} width={12} fill="#FFF" />
                {pet}
              </div>
            </span>
          </div>
        </div>
      </div>
      {includesPeople && (
        <div className="row pl-2">
          <div className="row mr-2">
            <AccountMultiple className="mr-1" height={25} width={25} />
            <h5 className="h-result mb-0">People:</h5>
          </div>
          <div className="flex-column pl-1 pr-1">
            <div className="row ml-0">
              <span className="badge badge-success">
                {sleep}
              </span>
            </div>
            <div className="row mt-1 ml-0">
              <span className="badge badge-success">
                {personality}
              </span>
            </div>
            <div className="row mt-1 ml-0">
              <span className="badge badge-success">
                Age: {ageMin} - {ageMax}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

SearchParams.propTypes = {
  purpose: PropTypes.string,
  location: PropTypes.string,
  radius: PropTypes.number,
  priceMin: PropTypes.number,
  priceMax: PropTypes.number,
  timeline: PropTypes.string,
  smoking: PropTypes.string,
  pet: PropTypes.string,
  includesPeople: PropTypes.bool,
  sleep: PropTypes.string,
  personality: PropTypes.string,
  ageMin: PropTypes.number,
  ageMax: PropTypes.number,
};

SearchParams.defaultProps = {
  purpose: 'Work',
  location: 'Nowhere',
  radius: 0,
  priceMin: 0,
  priceMax: 1000000,
  timeline: 'Daily',
  smoking: 'Unknown',
  pet: 'Unknown',
  includesPeople: false,
  sleep: 'Unknown',
  personality: 'Unknown',
  ageMin: 21,
  ageMax: 100,
};

export default SearchParams;

