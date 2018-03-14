import React from 'react';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import ZodiacItem from '../profile/zodiacItem.jsx';

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
        <div className="row justify-content-start pl-2 pr-1">
          <i className="material-icons sidebar-icon">brightness_2</i>
          {sleep}
        </div>
      </li>
    ) : (
      <li className="list-group-item">
        <div className="row justify-content-start pl-2 pr-1">
          <i className="material-icons sidebar-icon">brightness_5</i>
          {sleep}
        </div>
      </li>
    );


    return (
      <div className="content-box">
        <img src={image_url} alt="user profile" className="user-profile-pic" />
        <div className="mini-heading-box-side">
          <span>
            <h5>{name_first} {name_last}
              <Link to="/edit-profile">
                <i className="material-icons ml-4">edit</i>
              </Link>
            </h5>
          </span>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <div className="row justify-content-start pl-2 pr-1">
              <i className="material-icons sidebar-icon">work</i>
              {profession}
            </div>
          </li>
          <li className="list-group-item">
            <div className="row justify-content-start pl-2 pr-1">
              <i className="material-icons sidebar-icon">filter_vintage</i>
              {gender}
            </div>
          </li>
          <li className="list-group-item">
            <div className="row justify-content-start pl-2 pr-1">
              <i className="material-icons sidebar-icon">mood</i>
              {personality}
            </div>
          </li>
          {sleepLi}
          <ZodiacItem zodiac={zodiac} />
        </ul>
      </div>
    );
  }
}

export default DashProfile;
