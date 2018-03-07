import React from 'react';

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
      personality,
      sleep,
    } = this.props.user;

    const sleepLi = sleep === 'Night owl' ? (
      <li>
        <i className="material-icons sidebar-icon">brightness_2</i>
        {sleep}
      </li>
    ) : (
      <li>
        <i className="material-icons sidebar-icon">brightness_5</i>
        {sleep}
      </li>
    );

    return (
      <div className="content-box">
        <img src={image_url} alt="user profile" className="user-profile-pic" />
        <div className="mini-heading-box">
          <h4>{name_first} {name_last}</h4>
        </div>
        <ul>
          <li>
            {gender}
          </li>
          <li>
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
