import React from 'react';
import Axios from 'axios';
import MediaQuery from 'react-responsive';
import Pencil from 'mdi-react/PencilIcon.js';
import TextInput from './textInput.jsx';
import DropDown from './dropDown.jsx';
import LinkInput from './linkInput.jsx';
import AboutInput from './aboutInput.jsx';
import ArrowLeftBoldCircle from 'mdi-react/ArrowLeftBoldCircleIcon.js';

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
        display_name: '',
        url: '',
      },
      link2: {
        id: 2,
        display_name: '',
        url: '',
      },
      searchable_work: false,
      searchable_live: false,
    };
    this.handleBack = this.handleBack.bind(this);
    this.finalizeEdit = this.finalizeEdit.bind(this);
    this.finalizeEditLink = this.finalizeEditLink.bind(this);
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
          searchable_work: response.data.searchable_work,
          searchable_live: response.data.searchable_live,
        });
      })
      .catch((error) => {
        console.error('error getting user profile data for editing', error);
      });
  }

  handleBack() {
    this.props.history.goBack();
  };

  finalizeEdit(field, value) {
    this.setState({ [field]: value }, () => {
      console.log('new value', this.state[field]);
    });
  }

  finalizeEditLink(field, displayName, value) {
    const { id } = this.state[field];
    this.setState({ [field]: {
      id,
      display_name: displayName,
      url: value,
    }}, () => {
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
      link1,
      link2,
      searchable_work,
      searchable_live,
    } = this.state;

    return (
      <div className="container-fluid">
        <MediaQuery minDeviceWidth={800}>
          <div className="row pb-5">
            <button className="custom-btn" onClick={this.handleBack}>
              <ArrowLeftBoldCircle className="mdi-btn" height={50} width={50} fill="#6F5BC0" />
            </button>
            <div className="heading-box">
              <h1>Edit Your Profile</h1>
            </div>
          </div>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={600}>
          <div className="row pb-3">
            <button className="custom-btn" onClick={this.handleBack}>
              <ArrowLeftBoldCircle className="mdi-btn" height={30} width={30} fill="#6F5BC0" />
            </button>
            <div className="mobile-heading-box">
              <h2>Edit Your Profile</h2>
            </div>
          </div>
        </MediaQuery>
        <div className="row row-eq-height">
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
                <TextInput field="phone" glyph="phone" type="tel" placeholder="Your phone number" value={phone} finalize={this.finalizeEdit} />
                <TextInput field="email" glyph="email" type="email" placeholder="Your email address" value={email} finalize={this.finalizeEdit} />
                {/* gender: choose from existing or add new one */}
                <DropDown field="gender" glyph="filter_vintage" placeholder="Your gender" value={gender} options={['Male', 'Female']} finalize={this.finalizeEdit} />
                <TextInput field="profession" glyph="work" type="text" placeholder="Your profession" value={profession} finalize={this.finalizeEdit} />
                <DropDown field="personality" glyph="mood" placeholder="Your personality" value={personality} options={['Introvert', 'Extrovert']} finalize={this.finalizeEdit} />
                <DropDown field="sleep" glyph="brightness_medium" placeholder="Your sleep schedule" value={sleep} options={['Early bird', 'Night owl']} finalize={this.finalizeEdit} />
                <LinkInput field="link1" display_name={link1.display_name} url={link1.url} finalize={this.finalizeEditLink} />
                <LinkInput field="link2" display_name={link2.display_name} url={link2.url} finalize={this.finalizeEditLink} />
              </ul>
            </div>
          </div>
          <div className="col-12 col-sm-10 col-md-8 col-lg-8">
            <AboutInput field="about" value={about} finalize={this.finalizeEdit} />
            {/* searchable checkbox */}

          </div>
        </div>
      </div>
    );
  }
}

export default EditProfile;
