import React from 'react';
import Axios from 'axios';
import MediaQuery from 'react-responsive';
import Pencil from 'mdi-react/PencilIcon.js';
import TextInput from './textInput.jsx';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name_first: '',
      name_last: '',
      about: '',
      image_url: '',
      phone: 0,
      email: '',
      birthdate: new Date(),
      gender: '',
      personality: '',
      sleep: '',
      profession: '',
      link1: {
        id: 1,
        url: '',
      },
      link2: {
        id: 2,
        url: '',
      },
    };
    this.finalizeEdit = this.finalizeEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
          about: response.data.about,
          image_url: response.data.image_url,
          phone: response.data.phone,
          email: response.data.email,
          birthdate: response.data.birthdate,
          gender: response.data.gender,
          personality: response.data.personality,
          sleep: response.data.sleep,
          profession: response.data.profession,
          link1: response.data.links[0],
          link2: response.data.links[1],
        });
      })
      .catch((error) => {
        console.error('error getting user profile data for editing', error);
      });
  }

  finalizeEdit(field, value) {
    this.setState({ [field]: value }, () => {
      console.log('new value', this.state[field]);
    });
  }

  handleSubmit() {
    // submit edited fields
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
    } = this.state;

    return (
      <div className="container">
        <MediaQuery minDeviceWidth={800}>
          <div className="row pb-5">
            <div className="heading-box">
              <h1>Edit Your Profile</h1>
            </div>
          </div>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={600}>
          <div className="row pb-3">
            <div className="mobile-heading-box">
              <h2>Edit Your Profile</h2>
            </div>
          </div>
        </MediaQuery>
        <div className="row">
          <div className="col-12 col-sm-10 col-md-4 col-lg-4">
            {/* user stats sidebar */}
            <div className="content-box">
              {/* change profile pic btn */}
              <img src={image_url} alt="user profile" className="user-profile-pic" />
              <div className="mini-heading-box-side">
                <span>
                  <h5>{name_first} {name_last}</h5>
                </span>
              </div>
              <ul className="list-group list-group-flush">
                <TextInput field="profession" glyph="work" placeholder="Your profession" value={profession} finalize={this.finalizeEdit} />
                <TextInput field="phone" glyph="phone" placeholder="Your phone number" value={phone} finalize={this.finalizeEdit} />
                <TextInput field="email" glyph="email" placeholder="Your email address" value={email} finalize={this.finalizeEdit} />
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
          <div className="col-12 col-sm-10 col-md-8 col-lg-8" />
        </div>
      </div>
    );
  }
}

export default EditProfile;
