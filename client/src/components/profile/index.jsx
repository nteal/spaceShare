import React from 'react';
import Axios from 'axios';
import MediaQuery from 'react-responsive';
import ArrowLeftBoldCircle from 'mdi-react/ArrowLeftBoldCircleIcon.js';
import FacebookBox from 'mdi-react/FacebookBoxIcon.js';
import UserStats from './userStats.jsx';
import AboutBox from '../listing/aboutBox.jsx';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name_first: 'Bobo',
        name_last: 'Boberton',
        image_url: 'http://vectips.com/wp-content/uploads/2017/04/14-astronaut-flat.jpg',
        gender: 'Female',
        profession: 'Professional pickler',
        personality: 'Extrovert',
        sleep: 'Early bird',
        zodiac: 'Aquarius',
        links: [
          {
            id: 1,
            display: 'I love pickles',
            url: 'http://www.nytimes.com/2012/02/19/magazine/adam-davidson-craft-business.html',
          },
        ],
        about: 'I\'m me! and no one else.',
      },
    };
    this.handleBack = this.handleBack.bind(this);
  }
  componentDidMount() {
    Axios.get(`/api/userPublic/${localStorage.getItem('id_token')}/${this.props.location.state ? this.props.location.state.userId : 0}`)
      .then((response) => {
        this.setState({ user: response.data });
      })
      .catch(error => console.error('error retrieving user public data', error));
  }
  handleBack() {
    this.props.history.goBack();
  }
  render() {
    const { user } = this.state;
    const { name_first } = user;

    return (
      <div>
        <MediaQuery minDeviceWidth={800}>
          <button id="edit-profile-back" className="custom-btn" onClick={this.handleBack}>
            <ArrowLeftBoldCircle className="mdi-btn" height={50} width={50} fill="#6F5BC0" />
          </button>
        </MediaQuery>
        <div className="container p-res">
          <MediaQuery minDeviceWidth={800}>
            <div className="row mt-neg-3">
              <div className="heading-box">
                <h1>{name_first}&apos;s Profile</h1>
              </div>
            </div>
          </MediaQuery>
          <MediaQuery maxDeviceWidth={799}>
            <div className="row">
              <button className="custom-btn" onClick={this.handleBack}>
                <ArrowLeftBoldCircle className="mdi-btn" height={38} width={38} fill="#6F5BC0" />
              </button>
              <div className="mobile-heading-box">
                <h2>{name_first}&apos;s Profile</h2>
              </div>
            </div>
          </MediaQuery>
          <div className="row justify-content-center pt-res">
            <div className="col-12 col-sm-10 col-md-6 col-lg-4 d-flex flex-column align-items-start">
              <UserStats user={user} />
            </div>
            <div className="col-12 col-sm-10 col-md-6 col-lg-8 d-flex flex-column">
              <MediaQuery maxDeviceWidth={799}>
                <a href="#" className="btn btn-primary btn-block mb-5">
                  <div className="row pl-3">
                    <FacebookBox className="mdi-btn-alt sidebar-icon" height={25} width={25} fill="#FFF" />
                    <span className="pt-1">View this user&apos;s Facebook profile</span>
                  </div>
                </a>
              </MediaQuery>
              <MediaQuery minDeviceWidth={800}>
                <a href="#" className="btn btn-primary btn-block btn-lg mb-5">
                  <div className="row pl-3">
                    <FacebookBox className="mdi-btn-alt sidebar-icon" height={25} width={25} fill="#FFF" />
                    <span className="pb-1">View this user&apos;s Facebook profile</span>
                  </div>
                </a>
              </MediaQuery>
              <AboutBox heading={`A little about ${user.name_first}`} text={user.about} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;

