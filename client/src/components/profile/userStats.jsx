import React from 'react';
import PropTypes from 'prop-types';
import UserStatItem from './userStatItem.jsx';
import ZodiacItem from './zodiacItem.jsx';

const UserStats = (props) => {
  const { user } = props;
  const {
    image_url,
    name_first,
    name_last,
    gender,
    profession,
    personality,
    sleep,
    zodiac,
    links,
  } = user;

  const sleepGlyph = sleep === 'Night owl' ? 'brightness_2' : 'brightness_5';

  return (
    <div className="content-box">
      <img src={image_url} alt={`${name_first} ${name_last}`} className="img-fluid public-image" />
      <div className="mini-heading-box-side">
        <span>
          <h5>{name_first} {name_last}</h5>
        </span>
      </div>
      <ul className="list-group list-group-flush">
        <UserStatItem glyph="filter_vintage" value={gender} />
        <UserStatItem glyph="work" value={profession} />
        <UserStatItem glyph="mood" value={personality} />
        <UserStatItem glyph={sleepGlyph} value={sleep} />
        <ZodiacItem zodiac={zodiac} />
        {links.map(link => (
          <UserStatItem isLink glyph="link" value={link.url} displayName={link.display} key={link.id} />
        ))}
      </ul>
    </div>
  );
};

UserStats.propTypes = {
  user: PropTypes.shape({
    gender: PropTypes.string,
    image_url: PropTypes.string,
    links: PropTypes.array,
    name_first: PropTypes.string,
    name_last: PropTypes.string,
    personality: PropTypes.string,
    profession: PropTypes.string,
    sleep: PropTypes.string,
    zodiac: PropTypes.string,
  }),
};

UserStats.defaultProps = {
  user: {
    gender: 'No gender given',
    image_url: 'http://vectips.com/wp-content/uploads/2017/04/14-astronaut-flat.jpg',
    links: [],
    name_first: 'Bobo',
    name_last: 'Boberton',
    personality: 'No personality given',
    profession: 'No profession given',
    sleep: 'No sleep preference given',
    zodiac: 'No birthday given',
  },
};

export default UserStats;
