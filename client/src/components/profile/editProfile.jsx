import React from 'react';
import Axios from 'axios';
import MediaQuery from 'react-responsive';
import Pencil from 'mdi-react/PencilIcon.js';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: null,
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
      links: [{
        id: 1,
        url: '',
      }, {
        id: 2,
        url: '',
      }],
    };
    this.toggleEditing = this.toggleEditing.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
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
          links: response.data.links,
        });
      })
      .catch((error) => {
        console.error('error getting user profile data for editing', error);
      });
  }

  toggleEditing(event) {
    const { value } = event;
    this.setState({ editing: [value] });
  }

  handleEdit(event) {
    const { target, value } = event;
    const { name } = target;
    this.setState({ [name]: value });
  }

  handleSubmit() {
    // submit edited fields
  }

  render() {
    const { editing, name_first, name_last } = this.state;
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

    let aboutField;
    let phoneField;
    let emailField;
    let birthdateField;
    let genderField;
    let personalityField;
    let sleepField;
    let professionField;
    let linkField;

    if (editing === 'profession') {
      professionField = (
        <div className="input-group">
          <input 
            type="text"
            name="profession"
            value={profession}
            className="form-control"
            placeholder="Your profession"
            aria-label="Your profession"
            aria-describedby="basic-addon2"
            onSubmit={this.handleEdit}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button">
              <i className="material-icons">check</i>
            </button>
          </div>
        </div>
      );
    } else {
      professionField = (
        <li className="list-group-item">
          <div className="row justify-content-between">
            <span>
              <i className="material-icons sidebar-icon">work</i>
              {profession}
            </span>
            <Pencil className="mdi-btn" value="profession" onClick={this.toggleEditing} height={20} width={20} fill="#6F5BC0" />
          </div>
        </li>
      );
    }

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
                {professionField}
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
