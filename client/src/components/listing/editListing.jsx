import React from 'react';
import Axios from 'axios';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';
import Pencil from 'mdi-react/PencilIcon.js';
import ArrowLeftBoldCircle from 'mdi-react/ArrowLeftBoldCircleIcon.js';
import Email from 'mdi-react/EmailIcon.js';
import ListingDropDown from './listingDropDown.jsx';
import ListingTextInput from './listingTextInput.jsx';
import Location from './location.jsx';
import AboutInput from '../profile/aboutInput.jsx';
import Amenities from './amenities.jsx';
import Gallery from './gallery.jsx';

class EditListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      main_image: 'https://s3.amazonaws.com/spaceshare-sfp/spaces/space.jpg',
      members: [],
      amenities: [],
      amenities0: {},
      amenities1: {},
      amenities2: {},
      amenities3: {},
      amenities4: {},
      amenities5: {},
      amenities6: {},
      amenities7: {},
      gallery: [],
      gallery0: {},
      gallery1: {},
      gallery2: {},
      gallery3: {},
    };
    this.handleBack = this.handleBack.bind(this);
    this.finalizeEdit = this.finalizeEdit.bind(this);
    this.finalizeExistingAmenity = this.finalizeExistingAmenity.bind(this);
    this.finalizeNewAmenity = this.finalizeNewAmenity.bind(this);
    this.finalizeEditLocation = this.finalizeEditLocation.bind(this);
    this.finalizeEditImage = this.finalizeEditImage.bind(this);
    this.finalizeEditOwner = this.finalizeEditOwner.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const spaceId = this.props.location.state ? this.props.location.state.spaceId : 0;
    Axios.get('/api/currentSpace', {
      params: { 
        spaceId,
        token: localStorage.getItem('id_token'),
      },
    })
      .then((response) => {
        const {
          id,
          main_image,
          name,
          purpose,
          owner_fb_id,
          owner_name,
          members,
          cost,
          timeline,
          capacity,
          open,
          description,
          neighborhood,
          street_address,
          street_address2,
          city,
          state,
          zip,
          pet,
          smoking,
          amenities,
          gallery,
        } = response.data;
        this.setState({
          id,
          main_image,
          name,
          purpose,
          owner_fb_id,
          owner_name,
          members,
          cost,
          timeline,
          capacity,
          open,
          description,
          neighborhood,
          street_address,
          street_address2,
          city,
          state,
          zip,
          pet,
          smoking,
          amenities,
          gallery,
        });

        const setMultipleStates = (propertyName, field) => {
          field.forEach((value, i) => {
            const name = `${propertyName}${i}`;
            this.setState({ [name]: value });
          });
        }
        setMultipleStates('amenities', amenities);
        setMultipleStates('gallery', gallery);
      })
      .catch((error) => {
        console.error('error getting listing info', error);
      });
  }


  handleBack() {
    this.props.history.goBack();
  }

  finalizeEdit(field, value) {
    this.setState({ [field]: value }, () => {
      console.log('new value', field, this.state[field]);
    });
  }

  finalizeExistingAmenity(field, value) {
    const { id } = this.state[field];
    this.setState({
      [field]: {
        id,
        text: value,
      },
    });
  }

  finalizeNewAmenity(field, value) {
    this.setState({
      [field]: { text: value },
    });
  }

  finalizeEditLocation(address, address2, city, state, zip) {
    this.setState({
      street_address: address,
      street_address2: address2,
      city,
      state,
      zip,
    }, () => {
      console.log('new address', this.state.street_address, this.state.street_address2, this.state.city, this.state.state, this.state.zip);
    });
  }

  finalizeEditImage(field, tempUrl, fileName) {
    this.setState({
      [field]: {
        display: tempUrl,
        edited: fileName,
      },
    });
  }

  finalizeEditOwner(newOwnerName, newOwnerFbId) {
    this.setState({
      owner_name: newOwnerName,
      owner_fb_id: newOwnerFbId,
    });
  }

  handleCheckboxChange(event) {
    const { name } = event.target;
    const value = event.target.checked;
    this.setState({ [name]: value });
  }

  handleSubmit() {
    const {
      open,
      main_image,
      name,
      purpose,
      owner_fb_id,
      cost,
      timeline,
      capacity,
      description,
      neighborhood,
      street_address,
      street_address2,
      city,
      state,
      zip,
      pet,
      smoking,
      amenities,
      gallery,
    } = this.state;

    const fieldIds = {
      'Outside is fine': 1,
      'Anywhere is fine': 2,
      'Absolutely not': 3,
      'Daily': 1,
      'Weekly': 2,
      'Monthly': 3,
      'Long-term': 4,
      'Work': 1,
      'Live': 2,
    };

    Axios.post(`/api/updateSpace/${localStorage.getItem('id_token')}/${spaceId}`, {
      open,
      main_image,
      name,
      purpose_id: fieldIds[purpose],
      owner_fb_id,
      cost,
      timeline_id: fieldIds[timeline],
      capacity,
      description,
      neighborhood,
      street_address,
      street_address2,
      city,
      state,
      zip,
      pet: fieldIds[pet],
      smoking: fieldIds[smoking],
      amenities: [
        amenities0,
        amenities1,
        amenities2,
        amenities3,
        amenities4,
        amenities5,
        amenities6,
        amenities7,
      ],
      gallery: [
        gallery0,
        gallery1,
        gallery2,
        gallery3,
      ],
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error('error updating your space info', error);
      });
  }

  render() {
    const {
      id,
      open,
      main_image,
      name,
      purpose,
      owner_fb_id,
      owner_name,
      members,
      cost,
      timeline,
      capacity,
      description,
      neighborhood,
      street_address,
      street_address2,
      city,
      state,
      zip,
      pet,
      smoking,
      amenities,
      gallery,
    } = this.state;

    const memberNames = members.map(member => `${member.name_first} ${member.name_last}`);

    const purposeGlyph = purpose === 'Live' ? (
      <i className="material-icons md-h3 mr-1">home</i>
    ) : (
      <i className="material-icons md-h3 mr-1">business</i>
    );

    return (
      <div>
        <div className="row justify-content-around">
          <div className="space-main-img-container">
            <img
              className="img-fluid space-main-img"
              src={main_image}
              alt="Your lovely space"
            />
          </div>
        </div>
        <main>
          <MediaQuery maxDeviceWidth={799}>
            <button className="custom-btn mobile-back-btn" onClick={this.handleBack}>
              <ArrowLeftBoldCircle className="mdi-btn" height={75} width={75} fill="#6F5BC0" />
            </button>
          </MediaQuery>
          <MediaQuery minDeviceWidth={800}>
            <button className="custom-btn" onClick={this.handleBack}>
              <ArrowLeftBoldCircle className="mdi-btn" height={50} width={50} fill="#6F5BC0" />
            </button>
          </MediaQuery>
          <div className="container mt-neg-3">
            <div className="row">
              <MediaQuery minDeviceWidth={800}>
                <div className="heading-box mt-neg">
                  <h1>{name}</h1>
                </div>
              </MediaQuery>
              <MediaQuery maxDeviceWidth={600}>
                <div className="mobile-heading-box mt-neg-3">
                  <h2>{name}</h2>
                </div>
              </MediaQuery>
            </div>
            <div className="row pt-1">
              <div className="col">
                <MediaQuery minDeviceWidth={800}>
                  <ListingDropDown 
                    displayGlyph
                    field="purpose"
                    placeholder="The purpose of your space"
                    value={purpose}
                    options={['Work', 'Live']}
                    headingSize="3"
                    finalize={this.finalizeEdit}
                  />
                  <ListingDropDown 
                    displayGlyph
                    field="owner_fb_id"
                    placeholder="The owner of your space"
                    value={owner_name}
                    options={memberNames}
                    headingSize="5"
                    finalize={this.finalizeEditOwner}
                    additionalData={members}
                  />
                </MediaQuery>
                <MediaQuery maxDeviceWidth={600}>
                  <ListingDropDown 
                    displayGlyph
                    field="purpose"
                    placeholder="The purpose of your space"
                    value={purpose}
                    options={['Work', 'Live']}
                    headingSize="4"
                    finalize={this.finalizeEdit}
                  />
                  <ListingDropDown 
                    displayGlyph
                    field="owner_fb_id"
                    placeholder="The owner of your space"
                    value={owner_name}
                    options={memberNames}
                    headingSize="6"
                    finalize={this.finalizeEditOwner}
                    additionalData={members}
                  />
                </MediaQuery>
              </div>
              <div className="col">
                <MediaQuery minDeviceWidth={800}>
                  <div className="row justify-content-end d-flex flex-no-wrap one-line">
                    {/* <h4 className="mb-0">${cost} / {timeline}</h4> */}
                    <h4 className="d-inline-block one-line">
                      <ListingTextInput
                        field="cost"
                        type="number"
                        placeholder="How much you are charging"
                        value={cost}
                        headingSize="0"
                        finalize={this.finalizeEdit}
                      />
                      
                      <ListingDropDown
                        field="timeline"
                        placeholder="The time for which your space will be available"
                        value={timeline}
                        options={['Daily', 'Weekly', 'Monthly', 'Long-term']}
                        headingSize="0"
                        finalize={this.finalizeEdit}
                      />
                    </h4>
                  </div>
                  <div className="row justify-content-end">
                    {/* <h5>Space available for {capacity} {pronoun}</h5> */}
                    <ListingTextInput
                      field="capacity"
                      type="number"
                      placeholder="How many people would you like"
                      value={capacity}
                      finalize={this.finalizeEdit}
                    />
                  </div>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={600}>
                  <div className="row justify-content-end">
                    <h5 className="mb-0">${cost} / {timeline}</h5>
                  </div>
                  <div className="row justify-content-end">
                    <ListingTextInput
                      field="capacity"
                      type="number"
                      placeholder="How many people would you like"
                      value={capacity}
                      finalize={this.finalizeEdit}
                    />
                  </div>
                </MediaQuery>
              </div>
            </div>
            <div className="row pt-res">
              <div className="col-12 col-sm-12 col-md-8 col-lg-8 d-flex flex-column pl-0 pr-0 pr-sm-0 pr-md-2 pr-lg-2 pr-xl-2">
                <AboutInput field="description" header="About your space" placeholder="A description of your space" value={description} finalize={this.finalizeEdit} />
                <Location editView address={street_address} address2={street_address2} neighborhood={neighborhood} city={city} state={state} zip={zip} finalize={this.finalizeEditLocation} />
              </div>
              <div className="col-12 col-sm-12 col-md-4 col-lg-4 d-flex flex-column pr-0 pl-0 pl-sm-0 pl-md-2 pl-lg-2 pl-xl-2">
                <Amenities
                  pet={pet}
                  smoking={smoking}
                  amenities={amenities}
                  editView
                  finalize={this.finalizeEdit}
                  finalizeExisting={this.finalizeExistingAmenity}
                  finalizeNew={this.finalizeNewAmenity}
                />
              </div>
            </div>
            <div className="row">
              <Gallery editView images={gallery} />
            </div>
            <div className="row justify-content-center">
              <Link to={{ pathname: '/listing', state: { spaceId: id } }} className="btn btn-primary btn-lg align-self-end" onClick={this.handleSubmit}>
                Submit changes
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default EditListing;
