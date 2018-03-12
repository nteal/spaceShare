import React from 'react';
import Rocket from 'mdi-react/RocketIcon.js';

const Amenity = (props) => {
  const { amenity } = props;
  return (
    <li className="pb-1">
      <div className="row">
        <Rocket className="sidebar-icon" height={20} width={20} />
        {amenity.text}
      </div>
    </li>
  );
};

export default Amenity;
