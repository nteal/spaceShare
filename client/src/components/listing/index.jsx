import React from 'react';
import Axios from 'axios';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';
import ArrowLeftBoldCircle from 'mdi-react/ArrowLeftBoldCircleIcon.js';
import MessageText from 'mdi-react/MessageTextIcon.js';
import Location from './location.jsx';
import AboutBox from './aboutBox.jsx';
import Amenities from './amenities.jsx';
import Gallery from './gallery.jsx';
import Footer from '../nav/footer.jsx';

class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOwner: false,
      main_image: 'https://s3.amazonaws.com/spaceshare-sfp/spaces/space.jpg',
      amenities: [],
      gallery: [],
    };
    this.handleBack = this.handleBack.bind(this);
    this.messageOwner = this.messageOwner.bind(this);
  }
  componentDidMount() {
    const spaceId = this.props.location.state ? this.props.location.state.spaceId : 0;
    Axios.get(`/space/currentListing/${localStorage.getItem('id_token')}/${spaceId}`)
      .then((response) => {
        const {
          id,
          main_image,
          name,
          purpose,
          owner_fb_id,
          owner_name,
          owner_name_first,
          owner_name_last,
          owner_nexmo_id,
          cost,
          timeline,
          capacity,
          open,
          description,
          neighborhood,
          city,
          state,
          pet,
          smoking,
          amenities,
          gallery,
        } = response.data;
        console.log('response', response.data);
        this.setState({
          id,
          main_image,
          name,
          purpose,
          owner_fb_id,
          owner_name,
          owner_name_first,
          owner_name_last,
          owner_nexmo_id,
          cost,
          timeline,
          capacity,
          open,
          description,
          neighborhood,
          city,
          state,
          pet,
          smoking,
          amenities: amenities || [],
          gallery: gallery || [],
        });

        Axios.get(`/user/isOwner/${localStorage.getItem('id_token')}/${id}`)
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
        localStorage.removeItem('id_token');
        location.reload();
      });
  }

  handleBack() {
    this.props.history.goBack();
  }

  messageOwner() {
    const { owner_nexmo_id, owner_name_first, owner_name_last } = this.state;
    const { startNewChat } = this.props;
    console.log('trying to start new chat', owner_nexmo_id, owner_name_first, owner_name_last);

    startNewChat(owner_nexmo_id, owner_name_first, owner_name_last);
  }

  render() {
    const {
      id,
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
      neighborhood,
      city,
      state,
      pet,
      smoking,
      amenities,
      gallery,
    } = this.state;

    const purposeGlyph = purpose === 'Live' ? (
      <i className="material-icons md-h3 mr-1">home</i>
    ) : (
      <i className="material-icons md-h3 mr-1">business</i>
    );

    const pronoun = capacity > 1 ? 'people' : 'person';
    const heading = (/[qypg]/).test(name) ? (
      <div className="heading-box descender mt-neg">
        <h1>
          {name}
          {isOwner && (
            <Link to={{ pathname: '/edit-listing', state: { spaceId: id } }} className="heading-box-edit">
              <i className="material-icons">edit</i>
            </Link>
          )}
        </h1>
      </div>
    ) : (
      <div className="heading-box mt-neg">
        <h1>
          {name}
          {isOwner && (
            <Link to={{ pathname: '/edit-listing', state: { spaceId: id } }} className="heading-box-edit">
              <i className="material-icons">edit</i>
            </Link>
          )}
        </h1>
      </div>

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
              <MediaQuery minDeviceWidth={601}>
                {heading}
              </MediaQuery>
              <MediaQuery maxDeviceWidth={600}>
                <div className="mobile-heading-box mt-neg-3">
                  <h2>
                    {name}
                    {isOwner && (
                      <Link to={{ pathname: '/edit-listing', state: { spaceId: id } }} className="mobile-heading-box-edit">
                        <i className="material-icons">edit</i>
                      </Link>
                    )}
                  </h2>
                </div>
              </MediaQuery>
            </div>
            <div className="row pt-1">
              <div className="col">
                <MediaQuery minDeviceWidth={800}>
                  <div className="d-flex flex-row align-items-center">
                    {purposeGlyph}<h3 className="mb-0">{purpose}</h3>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <Link to="/messages" onClick={this.messageOwner}>
                      <MessageText className="mdi-btn ml-1 mr-2" height={20} width={20} fill="#6F5BC0" />
                    </Link>
                    <h5>
                      {owner_name}
                    </h5>
                  </div>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={600}>
                  <div className="d-flex flex-row align-items-center">
                    {purposeGlyph}<h4 className="mb-0">{purpose}</h4>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <Link to="/messages" onClick={this.messageOwner}>
                      <MessageText className="mdi-btn ml-1 mr-2" height={20} width={20} fill="#6F5BC0" />
                    </Link>
                    <h6>
                      {owner_name}
                    </h6>
                  </div>
                </MediaQuery>
              </div>
              <div className="col">
                <MediaQuery minDeviceWidth={800}>
                  <div className="row justify-content-end">
                    <h4 className="mb-0">${cost} / {timeline}</h4>
                  </div>
                  <div className="row justify-content-end">
                    <h5>Space available for {capacity} {pronoun}</h5>
                  </div>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={600}>
                  <div className="row justify-content-end">
                    <h5 className="mb-0">${cost} / {timeline}</h5>
                  </div>
                  <div className="row justify-content-end">
                    <h6>Space available for {capacity} {pronoun}</h6>
                  </div>
                </MediaQuery>
              </div>
            </div>
            <div className="row pt-res">
              <div className="col-12 col-sm-12 col-md-8 col-lg-8 d-flex flex-column pl-0 pr-0 pr-sm-0 pr-md-2 pr-lg-2 pr-xl-2">
                <AboutBox heading="About this space" text={description} />
                <Location neighborhood={neighborhood} city={city} state={state} />
              </div>
              <div className="col-12 col-sm-12 col-md-4 col-lg-4 d-flex flex-column pr-0 pl-0 pl-sm-0 pl-md-2 pl-lg-2 pl-xl-2">
                <Amenities pet={pet} smoking={smoking} amenities={amenities} />
              </div>
            </div>
            <div className="row">
              <Gallery images={gallery} />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Listing;
