import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';

import Pencil from 'mdi-react/PencilIcon.js';
import TextInput from './textInput.jsx';
import DateInput from './dateInput.jsx';
import DropDown from './dropDown.jsx';
import LinkInput from './linkInput.jsx';
import AboutInput from './aboutInput.jsx';
import ImageInput from './imageInput.jsx';
import Footer from '../nav/footer.jsx';
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
        display: '',
        url: '',
      },
      link2: {
        id: 2,
        display: '',
        url: '',
      },
      searchable_work: false,
      searchable_live: false,
    };
    this.handleBack = this.handleBack.bind(this);
    this.finalizeEdit = this.finalizeEdit.bind(this);
    this.finalizeEditLink = this.finalizeEditLink.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    Axios.get(`/user/currentUser/${localStorage.getItem('id_token')}`)
      .then((response) => {
        console.log('current! user! data!', response.data);
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
          link1: response.data.links.length ? response.data.links[0] : { display: '', url: '' },
          link2: response.data.links.length > 1 ? response.data.links[1] : { display: '', url: '' },
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
  }

  finalizeEdit(field, value) {
    this.setState({ [field]: value }, () => {
      console.log('new value', this.state[field]);
    });
  }

  finalizeEditLink(field, displayName, value) {
    const { id } = this.state[field];
    this.setState({
      [field]: {
        id,
        display: displayName,
        url: value,
      },
    }, () => {
      console.log('new value', this.state[field]);
    });
  }

  handleCheckboxChange(event) {
    const { name } = event.target;
    const value = event.target.checked;
    this.setState({ [name]: value });
  }

  handleSubmit() {
    const {
      id,
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

    const fieldIds = {
      Male: 1,
      Female: 2,
      Introvert: 1,
      Extrovert: 2,
      'Early bird': 1,
      'Night owl': 2,
    };

    console.log({
      id,
      about,
      image_url,
      phone,
      email,
      birthdate,
      gender: fieldIds[gender],
      personality: fieldIds[personality],
      sleep: fieldIds[sleep],
      profession,
      links: [link1, link2],
      searchable_work,
      searchable_live,
      token: localStorage.getItem('id_token'),
    });

    Axios.post(`/user/editProfile/${localStorage.getItem('id_token')}`, {
      id,
      about,
      image_url,
      phone,
      email,
      birthdate,
      gender_id: fieldIds[gender],
      personality_id: fieldIds[personality],
      sleep_id: fieldIds[sleep],
      profession,
      links: [link1, link2],
      searchable_work,
      searchable_live,
      token: localStorage.getItem('token_id'),
    })
      .then((response) => {
        console.log('profile updated!', response);
        this.props.toggleRefresh();
      })
      .catch((error) => {
        console.error('error updating profile', error);
      });
  }

  render() {
    const { id, name_first, name_last } = this.state;
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
                <h1>Edit Your Profile</h1>
              </div>
            </div>
          </MediaQuery>
          <MediaQuery maxDeviceWidth={799}>
            <div className="row">
              <button className="custom-btn" onClick={this.handleBack}>
                <ArrowLeftBoldCircle className="mdi-btn" height={38} width={38} fill="#6F5BC0" />
              </button>
              <div className="mobile-heading-box">
                <h2>Edit Your Profile</h2>
              </div>
            </div>
          </MediaQuery>
          <div className="row justify-content-center pt-res">
            <div className="col-12 col-sm-10 col-md-6 col-lg-4 d-flex flex-column align-items-start">
              {/* user stats sidebar */}
              <div className="content-box">
                <ImageInput field="image_url" category="users/" imageId="0" userId={id} value={image_url} finalize={this.finalizeEdit} aspectRatio={1} />
                <div className="mini-heading-box-side mt-0">
                  <span>
                    <h5>{name_first} {name_last}</h5>
                  </span>
                </div>
                <ul className="list-group list-group-flush">
                  <TextInput field="phone" glyph="phone" type="tel" placeholder="Your phone number" value={phone} finalize={this.finalizeEdit} />
                  <TextInput field="email" glyph="email" type="email" placeholder="Your email address" value={email} finalize={this.finalizeEdit} />
                  {/* gender: choose from existing or add new one */}
                  <DropDown field="gender" glyph="filter_vintage" placeholder="Your gender" value={gender} options={['Male', 'Female']} finalize={this.finalizeEdit} />
                  <DateInput field="birthdate" glyph="date_range" value={birthdate} finalize={this.finalizeEdit} />
                  <TextInput field="profession" glyph="work" type="text" placeholder="Your profession" value={profession} finalize={this.finalizeEdit} />
                  <DropDown field="personality" glyph="mood" placeholder="Your personality" value={personality} options={['Introvert', 'Extrovert']} finalize={this.finalizeEdit} />
                  <DropDown field="sleep" glyph="brightness_medium" placeholder="Your sleep schedule" value={sleep} options={['Early bird', 'Night owl']} finalize={this.finalizeEdit} />
                  <LinkInput field="link1" display={link1.display} url={link1.url} finalize={this.finalizeEditLink} />
                  <LinkInput field="link2" display={link2.display} url={link2.url} finalize={this.finalizeEditLink} />
                </ul>
              </div>
            </div>
            <div className="col-12 col-sm-10 col-md-6 col-lg-8 d-flex flex-column align-items-start">
              <AboutInput field="about" placeholder="A description of you for others to see" header="About" value={about} finalize={this.finalizeEdit} />
              {/* searchable checkboxes */}
              <div className="content-box auto-height-box">
                <MediaQuery minDeviceWidth={800}>
                  <div className="mini-heading-box-top">
                    <h5>Searchable</h5>
                  </div>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={600}>
                  <div className="mini-heading-box-top-mobile">
                    <h5>Searchable</h5>
                  </div>
                </MediaQuery>
                <div className="invisible-content-box">
                  <div className="form-group row ml-1">
                    <div className="form-check">
                      <input
                        id="searchable-work-checkbox"
                        className="form-check-input"
                        type="checkbox"
                        name="searchable_work"
                        checked={searchable_work}
                        onChange={this.handleCheckboxChange}
                      />
                      <label className="form-check-label">
                        Yes, make me available in search results for people looking for a work space partner.
                      </label>
                    </div>
                  </div>
                  <div className="form-group row ml-1">
                    <div className="form-check">
                      <input
                        id="searchable-live-checkbox"
                        className="form-check-input"
                        type="checkbox"
                        name="searchable_live"
                        checked={searchable_live}
                        onChange={this.handleCheckboxChange}
                      />
                      <label className="form-check-label">
                        Yes, make me available in search results for people looking for a living space partner.
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <Link to="/dashboard" className="btn btn-primary btn-lg align-self-end" onClick={this.handleSubmit}>
                Submit changes
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default EditProfile;
