import React from 'react';
import PropTypes from 'prop-types';

import Aries from '../../assets/zodiac/aries.png';
import Taurus from '../../assets/zodiac/taurus.png';
import Gemini from '../../assets/zodiac/gemini.png';
import Cancer from '../../assets/zodiac/cancer.png';
import Leo from '../../assets/zodiac/leo.png';
import Virgo from '../../assets/zodiac/virgo.png';
import Libra from '../../assets/zodiac/libra.png';
import Scorpio from '../../assets/zodiac/scorpio.png';
import Sagittarius from '../../assets/zodiac/sagittarius.png';
import Capricorn from '../../assets/zodiac/capricorn.png';
import Aquarius from '../../assets/zodiac/aquarius.png';
import Pisces from '../../assets/zodiac/pisces.png';

const ZodiacItem = (props) => {
  const { zodiac } = props;

  let zodiacLi;
  switch (zodiac) {
    case 'Aries':
      zodiacLi = (
        <li className="list-group-item">
          <div className="row justify-content-start pl-2 pr-1">
            <img src={Aries} alt="Aries glyph" className="zodiac-glyph" />
            {zodiac}
          </div>
        </li>
      );
      break;
    case 'Taurus':
      zodiacLi = (
        <li className="list-group-item">
          <div className="row justify-content-start pl-2 pr-1">
            <img src={Taurus} alt="Taurus glyph" className="zodiac-glyph" />
            {zodiac}
          </div>
        </li>
      );
      break;
    case 'Gemini':
      zodiacLi = (
        <li className="list-group-item">
          <div className="row justify-content-start pl-2 pr-1">
            <img src={Gemini} alt="Gemini glyph" className="zodiac-glyph" />
            {zodiac}
          </div>
        </li>
      );
      break;
    case 'Cancer':
      zodiacLi = (
        <li className="list-group-item">
          <div className="row justify-content-start pl-2 pr-1">
            <img src={Cancer} alt="Cancer glyph" className="zodiac-glyph" />
            {zodiac}
          </div>
        </li>
      );
      break;
    case 'Leo':
      zodiacLi = (
        <li className="list-group-item">
          <div className="row justify-content-start pl-2 pr-1">
            <img src={Leo} alt="Leo glyph" className="zodiac-glyph" />
            {zodiac}
          </div>
        </li>
      );
      break;
    case 'Virgo':
      zodiacLi = (
        <li className="list-group-item">
          <div className="row justify-content-start pl-2 pr-1">
            <img src={Virgo} alt="Virgo glyph" className="zodiac-glyph" />
            {zodiac}
          </div>
        </li>
      );
      break;
    case 'Libra':
      zodiacLi = (
        <li className="list-group-item">
          <div className="row justify-content-start pl-2 pr-1">
            <img src={Libra} alt="Libra glyph" className="zodiac-glyph" />
            {zodiac}
          </div>
        </li>
      );
      break;
    case 'Scorpio':
      zodiacLi = (
        <li className="list-group-item">
          <div className="row justify-content-start pl-2 pr-1">
            <img src={Scorpio} alt="Scorpio glyph" className="zodiac-glyph" />
            {zodiac}
          </div>
        </li>
      );
      break;
    case 'Sagittarius':
      zodiacLi = (
        <li className="list-group-item">
          <div className="row justify-content-start pl-2 pr-1">
            <img src={Sagittarius} alt="Sagittarius glyph" className="zodiac-glyph" />
            {zodiac}
          </div>
        </li>
      );
      break;
    case 'Capricorn':
      zodiacLi = (
        <li className="list-group-item">
          <div className="row justify-content-start pl-2 pr-1">
            <img src={Capricorn} alt="Capricorn glyph" className="zodiac-glyph" />
            {zodiac}
          </div>
        </li>
      );
      break;
    case 'Aquarius':
      zodiacLi = (
        <li className="list-group-item">
          <div className="row justify-content-start pl-2 pr-1">
            <img src={Aquarius} alt="Aquarius glyph" className="zodiac-glyph" />
            {zodiac}
          </div>
        </li>
      );
      break;
    case 'Pisces':
      zodiacLi = (
        <li className="list-group-item">
          <div className="row justify-content-start pl-2 pr-1">
            <img src={Pisces} alt="Pisces glyph" className="zodiac-glyph" />
            {zodiac}
          </div>
        </li>
      );
      break;
    default:
      zodiacLi = (
        <li className="list-group-item">
          <div className="row justify-content-start pl-2 pr-1">
            <i className="material-icons sidebar-icon">help</i>
            {zodiac}
          </div>
        </li>
      );
  }

  return zodiacLi;
};

ZodiacItem.propTypes = {
  zodiac: PropTypes.string,
};

ZodiacItem.defaultProps = {
  zodiac: 'No birthday defined.',
};

export default ZodiacItem;

