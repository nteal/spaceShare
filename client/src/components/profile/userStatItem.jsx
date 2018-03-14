import React from 'react';
import PropTypes from 'prop-types';

const UserStatItem = (props) => {
  const { glyph, value, isLink } = props;

  let display;
  if (isLink) {
    const { displayName } = props;
    display = <a href={value}>{displayName}</a>;
  } else {
    display = value;
  }

  return (
    <li className="list-group-item">
      <div className="row justify-content-start pl-2 pr-1">
        <i className="material-icons sidebar-icon">{glyph}</i>
        {display}
      </div>
    </li>
  );
};

UserStatItem.propTypes = {
  glyph: PropTypes.string,
  value: PropTypes.string,
  isLink: PropTypes.bool,
  displayName: PropTypes.string,
};

UserStatItem.defaultProps = {
  glyph: 'help',
  value: 'This user has not defined this.',
  isLink: false,
  displayName: 'No user submitted links.',
};

export default UserStatItem;
