import React from 'react';
import MediaQuery from 'react-responsive';
import Amenity from './amenity.jsx';

const Amenities = (props) => {
  const { pet, smoking, amenities } = props;

  return (
    <div className="content-box">
      <MediaQuery minDeviceWidth={800}>
        <div className="mini-heading-box-top">
          <h5>Amenities</h5>
        </div>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={600}>
        <div className="mini-heading-box-top-mobile">
          <h5>Amenities</h5>
        </div>
      </MediaQuery>
      <div className="invisible-content-box">
        <ul>
          <li className="pb-1">
            <div className="row">
              <i className="material-icons md-sm sidebar-icon">pets</i>
              <b>Pets: {pet}</b>
            </div>
          </li>
          <li className="pb-1">
            <div className="row">
              <i className="material-icons md-sm sidebar-icon">smoking_rooms</i>
              <b>Smoking: {smoking}</b>
            </div>
          </li>
          {amenities.map(amenity => (
            <Amenity amenity={amenity} key={amenity.id}/>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Amenities;
