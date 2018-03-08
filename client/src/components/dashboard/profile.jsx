import React from 'react';
import { Link } from 'react-router-dom';

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

    return (
      <div className="content-box">
        <div className="row justify-content-center">
          <div className="flex-column">
            <img src={image_url} alt="user profile" className="user-profile-pic" />
          </div>
        </div>
        <div className="mini-heading-box">
          <span>
            <h4>{name_first} {name_last}
              <Link to="/edit-profile">
                <i className="material-icons">edit</i>
              </Link>
            </h4>
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
        </ul>

      </div>
    );
  }
}

export default DashProfile;
