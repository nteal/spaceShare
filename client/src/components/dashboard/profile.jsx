import React from 'react';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';

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

class DashProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log(this.props.user);
  }
  render() {
    const {
      image_url,
      planet,
      name_first,
      name_last,
      gender,
      profession,
      personality,
      sleep,
      zodiac,
    } = this.props.user;

    const sleepLi = sleep === 'Night owl' ? (
      <li className="list-group-item">
        <i className="material-icons sidebar-icon">brightness_2</i>
        {sleep}
      </li>
    ) : (
      <li className="list-group-item">
        <i className="material-icons sidebar-icon">brightness_5</i>
        {sleep}
      </li>
    );

    let zodiacLi;
    switch (zodiac) {
      case 'Aries':
        zodiacLi = (
          <li className="list-group-item">
            <img src={Aries} alt="Aries glyph" className="zodiac-glyph" />
            {zodiac}
          </li>
        );
        break;
      case 'Taurus':
        zodiacLi = (
          <li className="list-group-item">
            <img src={Taurus} alt="Taurus glyph" className="zodiac-glyph" />
            {zodiac}
          </li>
        );
        break;
      case 'Gemini':
        zodiacLi = (
          <li className="list-group-item">
            <img src={Gemini} alt="Gemini glyph" className="zodiac-glyph" />
            {zodiac}
          </li>
        );
        break;
      case 'Cancer':
        zodiacLi = (
          <li className="list-group-item">
            <img src={Cancer} alt="Cancer glyph" className="zodiac-glyph" />
            {zodiac}
          </li>
        );
        break;
      case 'Leo':
        zodiacLi = (
          <li className="list-group-item">
            <img src={Leo} alt="Leo glyph" className="zodiac-glyph" />
            {zodiac}
          </li>
        );
        break;
      case 'Virgo':
        zodiacLi = (
          <li className="list-group-item">
            <img src={Virgo} alt="Virgo glyph" className="zodiac-glyph" />
            {zodiac}
          </li>
        );
        break;
      case 'Libra':
        zodiacLi = (
          <li className="list-group-item">
            <img src={Libra} alt="Libra glyph" className="zodiac-glyph" />
            {zodiac}
          </li>
        );
        break;
      case 'Scorpio':
        zodiacLi = (
          <li className="list-group-item">
            <img src={Scorpio} alt="Scorpio glyph" className="zodiac-glyph" />
            {zodiac}
          </li>
        );
        break;
      case 'Sagittarius':
        zodiacLi = (
          <li className="list-group-item">
            <img src={Sagittarius} alt="Sagittarius glyph" className="zodiac-glyph" />
            {zodiac}
          </li>
        );
        break;
      case 'Capricorn':
        zodiacLi = (
          <li className="list-group-item">
            <img src={Capricorn} alt="Capricorn glyph" className="zodiac-glyph" />
            {zodiac}
          </li>
        );
        break;
      case 'Aquarius':
        zodiacLi = (
          <li className="list-group-item">
            <img src={Aquarius} alt="Aquarius glyph" className="zodiac-glyph" />
            {zodiac}
          </li>
        );
        break;
      case 'Pisces':
        zodiacLi = (
          <li className="list-group-item">
            <img src={Pisces} alt="Pisces glyph" className="zodiac-glyph" />
            {zodiac}
          </li>
        );
        break;
      default:
        zodiacLi = (
          <li className="list-group-item">
            <i className="material-icons sidebar-icon">help</i>
            You haven&apos;t entered a birthday!
          </li>
        );
    }

    return (
      <div className="content-box">
        <img src={image_url} alt="user profile" className="user-profile-pic" />
        <div className="mini-heading-box-side">
          <span>
            <h5>{name_first} {name_last}
              <Link to="/edit-profile">
                <i className="material-icons ml-2">edit</i>
              </Link>
            </h5>
          </span>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <i className="material-icons sidebar-icon">work</i>
            {profession}
          </li>
          <li className="list-group-item">
            <i className="material-icons sidebar-icon">filter_vintage</i>
            {gender}
          </li>
          <li className="list-group-item">
            <i className="material-icons sidebar-icon">mood</i>
            {personality}
          </li>
          {sleepLi}
          {zodiacLi}
        </ul>
      </div>
    );
  }
}

export default DashProfile;
