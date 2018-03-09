import React from 'react';
import Axios from 'axios';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name_first: '',
      name_last: '',
      editable: {
        about: '',
        image_url: '',
        phone: 0,
        email: '',
        birthdate: new Date(),
        gender: '',
        personality: '',
        sleep: '',
        profession: '',
        links: [{
          id: 1,
          url: '',
        }, {
          id: 2,
          url: '',
        }],
      },
    };
  }
  componentDidMount() {
    Axios.get('http://localhost:3003/api/currentUser', {
      params: { token: localStorage.getItem('token_id') },
    })
      .then((response) => {
        this.setState({
          id: response.data.id,
          name_first: response.data.name_first,
          name_last: response.data.name_last,
          editable: {
            about: response.data.about,
            image_url: response.data.image_url,
            phone: response.data.phone,
            email: response.data.email,
            birthdate: response.data.birthdate,
            gender: response.data.gender,
            personality: response.data.personality,
            sleep: response.data.sleep,
            profession: response.data.profession,
            links: response.data.links,
          },
        });
      })
      .catch((error) => {
        console.error('error getting user profile data for editing', error);
      });
  }
  handleSubmit() {

  }
  render() {
    const { name_first, name_last } = this.state;
    const {
      about,
      image_url,
      phone,
      email,
      birthdate,
      gender,
      personality,
      sleep,
      profession,
      links,
    } = this.state.editable;

    return (
      <div className="container">
        <div className="row">
          <h1>Edit Your Profile</h1>
        </div>
        <div className="row">
          <div className="col-12 col-sm-10 col-md-4 col-lg-4">
            {/* user stats sidebar */}
            <div className="content-box">
              <img src={image_url} alt="user profile" className="user-profile-pic" />
              <div className="mini-heading-box-side">
                <span>
                  <h5>{name_first} {name_last}</h5>
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
                {/* gender: choose from existing or add new one */}
              </ul>
            </div>
          </div>
          <div className="col-12 col-sm-10 col-md-8 col-lg-8">
          </div>
        </div>
      </div>
    );
  }
}

export default EditProfile;
