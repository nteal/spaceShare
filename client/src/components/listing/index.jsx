import React from 'react';
import Axios from 'axios';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';
import Pencil from 'mdi-react/PencilIcon.js';
import ArrowLeftBoldCircle from 'mdi-react/ArrowLeftBoldCircleIcon.js';
import Email from 'mdi-react/EmailIcon.js';

class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOwner: false,
      main_image: 'https://s3.amazonaws.com/spaceshare-sfp/spaces/space.jpg',
    };
    this.handleBack = this.handleBack.bind(this);
  }
  componentDidMount() {
    const spaceId = this.props.location.state ? this.props.location.state.spaceId : 0;
    Axios.get('http://localhost:3003/api/currentListing', {
      params: { spaceId },
    })
      .then((response) => {
        const {
          id,
          main_image,
          name,
          purpose,
          owner_fb_id,
          owner_name,
          cost,
          timeline,
          capacity,
          open,
          description,
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
          cost,
          timeline,
          capacity,
          open,
          description,
          amenities,
          gallery,
        });
        if (open) {
          const { neighborhood } = response.data;
          this.setState({ neighborhood });
        } else {
          const { street_address, city, state, zip } = response.data;
          this.setState({ street_address, city, state, zip });
        }
        Axios.get('http://localhost:3003/api/isOwner', {
          params: {
            token: localStorage.getItem('id_token'),
            spaceId: id,
          },
        })
          .then((response) => {
            if (response.data) {
              this.setState({ isOwner: true });
            }
          })
          .catch((error) => {
            console.error('error checking if owner', error);
          });
      })
      .catch((error) => {
        console.error('error getting listing info', error);
      });
  }

  handleBack() {
    this.props.history.goBack();
  };

  render() {
    const {
      isOwner,
      open,
      main_image,
      name,
      purpose,
      owner_fb_id,
      owner_name,
      cost,
      timeline,
      capacity,
      description,
      amenities,
      gallery,
    } = this.state;

    const purposeGlyph = purpose === 'Live' ? (
      <i className="material-icons md-h3 mr-1">home</i>
    ) : (
      <i className="material-icons md-h3 mr-1">business</i>
    );

    const pronoun = capacity > 1 ? 'people' : 'person';

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
        <button className="custom-btn" onClick={this.handleBack}>
          <ArrowLeftBoldCircle className="mdi-btn" height={50} width={50} fill="#6F5BC0" />
        </button>
        <div className="container mt-neg-3">
          <div className="row">
            <MediaQuery minDeviceWidth={800}>
              <div className="heading-box mt-neg">
                <h1>{name}</h1>
              </div>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={600}>
              <div className="mobile-heading-box mt-neg">
                <h2>{name}</h2>
              </div>
            </MediaQuery>
          </div>
          <div className="row pt-1">
            <div className="col">
              <div className="d-flex flex-row align-items-center">
                {purposeGlyph}<h3 className="mb-0">{purpose}</h3>
              </div>
              <div className="d-flex flex-row align-items-center">
                <Link to={{ pathname: '/messages', state: { userId: owner_fb_id } }}>
                  <Email className="mdi-btn ml-1 mr-2" height={20} width={20} fill="#6F5BC0" />
                </Link>
                <h5>
                  {owner_name}
                </h5>
              </div>
            </div>
            <div className="col">
              <div className="row justify-content-end">
                <h4 className="mb-0">${cost} / {timeline}</h4>
              </div>
              <div className="row justify-content-end">
                <h5>Space available for {capacity} {pronoun}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Listing;
