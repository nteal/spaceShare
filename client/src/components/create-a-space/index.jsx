import React from 'react';
import MediaQuery from 'react-responsive';
import Axios from 'axios';
import PropTypes from 'prop-types';
import ReactS3Uploader from 'react-s3-uploader';
import TextInput from '../profile/textInput.jsx';

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

class CreateSpace extends React.Component {
  constructor(props) {
    super(props);
    /* eslint-disable */
    this.state = {
      name: 'space',
      main_image: '',
      purpose_id: 1,
      open: false,
      cost: 0,
      street_address: 'A street address has not been provided for this space',
      street_address2: 'Apt',
      city: 'New Orleans',
      zip: '70130',
      state: 'Louisiana',
      neighborhood: 'Downtown New Orleans',
      description: 'A description is not available for this space.',
      timeline_id: 2,
      capacity: 0,
      smoking_id: 2,
      pet_id: 3,
      amenities: [],
      amenity: '',
      tempImageUrl: '',
      editing: true,
      cropping: false,
      imgFile: null,
      preNext: null,
      doneCropping: false,
    };
    /* eslint-enable */
    this.onDrop = this.onDrop.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.doneEditing = this.doneEditing.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCostChange = this.handleCostChange.bind(this);
    this.handleCapacityChange = this.handleCapacityChange.bind(this);
    this.addAmenity = this.addAmenity.bind(this);
    this.updateAmenities = this.updateAmenities.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.endCrop = this.endCrop.bind(this);
  }
  componentDidMount() {
    console.log('new space did mount'); // eslint-disable-line
  }
  onDrop(acceptedFile) {
    const { filename, publicUrl } = acceptedFile;
    this.setState({
      main_image: `https://spaceshare-sfp.s3.amazonaws.com/${filename}`,  // eslint-disable-line
      tempImageUrl: publicUrl,
      editing: false,
    });
  }
  toggleEditing() {
    this.setState({ editing: true });
  }
  doneEditing() {
    this.setState({ editing: null });
  }
  handleCostChange(event) {
    let decimalFound = false;
    const cost = event.target.value.split('').reduce((number, char, i, costArray) => {
      if (((char >= '0' && char <= '9') || char === '.') && !decimalFound) {
        if (char === '.') {
          number.push(char);
          for (let j = 1; j < 3; j += 1) {
            if (costArray[i + j] >= '0' && costArray[i + j] <= '9') {
              number.push(costArray[i + j]);
            }
          }
          decimalFound = true;
        } else {
          number.push(char);
        }
      }
      return number;
    }, []);
    let price = Number.parseFloat(cost.join(''));
    if (isNaN(price)) { price = 0; } // eslint-disable-line
    this.setState({
      cost: price, // eslint-disable-line
    });
  }
  handleCapacityChange(event) {
    const capacity = event.target.value.split('').reduce((number, char) => {
      if (char >= '0' && char <= '9') {
        number.push(char);
      }
      return number;
    }, []);
    let cap = Number.parseInt(capacity.join(''), 10);
    if (isNaN(cap)) { cap = 0; } // eslint-disable-line
    this.setState({
      capacity: cap, // eslint-disable-line
    });
  }
  handleInputChange(event) {
    const { target } = event;
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }
  addAmenity() {
    if (this.state.amenities.length > 7) {
      // eslint-disable-next-line
      window.alert('you have reached the maximum limit of 8 amenities\nyou may edit any existing amenity');
    } else {
      this.setState({
        amenities: this.state.amenities.concat({ name: this.state.amenity }),
        amenity: '',
      });
    }
  }
  updateAmenities(field, value) {
    const updatedAmenities = this.state.amenities.map((amenity, i) => {
      if (i === field) {
        amenity.name = value; // eslint-disable-line
      }
      return amenity;
    });
    this.setState({
      amenities: updatedAmenities,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    Axios.post(`/api/newSpace/${localStorage.getItem('id_token')}`, {
      space: this.state,
    })
      .then((response) => {
        this.props.toggleRefresh();
        localStorage.setItem('spaceId', response.data.spaceId);
        this.props.history.push({
          pathname: '/common-area',
          state: { spaceId: response.data.spaceId },
        });
      })
      .catch((error) => {
        console.error('error adding space', error);
      });
  }

  startCrop(imgFile, next) {
    this.setState({ imgFile });
    this.setState({ preNext: next });
    this.setState({ cropping: true });
  }

  exitCrop() {
    this.setState({ imgFile: null });
    this.setState({ preNext: null });
    this.setState({ doneCropping: false });
    this.setState({ cropping: false });
  }

  endCrop() {
    this.setState({ doneCropping: true }, this.refs.cropper.props.crop);
  }


  _crop(imgFile, next, imageInputComp, cropperContext) {
    if (this.state.doneCropping) {
      this.setState({ doneCropping: false });
      const croppedDataUrl = this.refs.cropper.getCroppedCanvas();
      croppedDataUrl.toBlob((blob) => {
        const file = new File([blob], 'myFile.png');
        next(file);
      });
      this.exitCrop();
    }
  }

  uploadOrCrop() {
    const imageInputComp = this;
    const { state } = this;
    const { userId, field, imageId, category } = this.props;
    const fileReader = new FileReader();
    if (!this.state.cropping) {
      return (<ReactS3Uploader
        className="form-control image-select"
        signingUrl="/s3/sign"
        signingUrlMethod="GET"
        preprocess={(img, next) => {
          let imgInputComp = this;
          fileReader.addEventListener('load', () => {
            imgInputComp.startCrop(fileReader.result, next);
            // release dataURL?
          }, false);
          fileReader.readAsDataURL(img);
        }}
        accept="image/*"
        s3path={category}
        scrubFilename={
          filename =>
            filename.replace(/[^]*/, `${userId}_${field}_${imageId}`)
        }
        multiple={false}
        onFinish={this.onDrop}
      />);
    }
    return (
      <div style={{ width: '100%', paddingTop: '100%', position: 'relative', verticalAlign: 'top' }}>
        <Cropper
          ref="cropper"
          src={state.imgFile}
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0 }}
          aspectRatio={5 / 1}
          guides={false}
          crop={this._crop.bind(this, state.imgFile, state.preNext, imageInputComp)}
        />
      </div>);
  }

  render() {
    const { editing, tempImageUrl, cropping } = this.state;
    let imageDisplay;
    let imageDisplayMobile;
    if (editing) {
      imageDisplay = (
        <div className="content-box image-selection-box h-50 w-75">
          <div className="pl-2 pr-2 pt-2 pb-5">
            <div className="row justify-content-end mr-0 pb-2">
              <button
                className="btn btn-outline-light btn-sm pb-0"
                onClick={this.doneEditing}
                type="button"
              >
                <i className="material-icons md-sm">close</i>
              </button>
              <button
                style={{ display: cropping ? 'inline' : 'none' }}
                className="btn btn-outline-light btn-sm pb-0"
                onClick={this.endCrop}
                type="button"
              >
                <i className="material-icons md-sm">done</i>
              </button>
            </div>
            <h5 className="text-center mb-3">
              Select an image for your space.
            </h5>
            {this.uploadOrCrop()}
          </div>
        </div>
      );
      imageDisplayMobile = (
        <div className="content-box image-selection-box">
          <div className="pl-2 pr-2 pt-2 pb-2">
            <div className="row justify-content-end mr-0 pb-2">
              <button
                className="btn btn-outline-light btn-sm pb-0"
                onClick={this.doneEditing}
                type="button"
              >
                <i className="material-icons md-sm">close</i>
              </button>
            </div>
            <h6 className="text-center mb-3">
              Select an image for your space.
            </h6>
            <ReactS3Uploader
              className="form-control image-select"
              signingUrl="/s3/sign"
              signingUrlMethod="GET"
              accept="image/*"
              s3path="spaces/"
              scrubFilename={
                filename =>
                  filename.replace(/[^]*/, this.state.name)
              }
              multiple={false}
              onFinish={this.onDrop}
            />
          </div>
        </div>

      );
    } else {
      imageDisplay = (
        <div className="h-50 w-75">
          <img src={tempImageUrl} alt="Your space" className="space-preview-pic" />
          <button className="btn btn-primary btn-block mt-2" onClick={this.toggleEditing}>
            Change image
          </button>
        </div>
      );
      imageDisplayMobile = (
        <div className="w-100">
          <img src={tempImageUrl} alt="Your space" className="space-preview-pic" />
          <button className="btn btn-primary btn-block mt-2" onClick={this.toggleEditing}>
            Change image
          </button>
        </div>
      );
    }

    const states = [
      'Alabama',
      'Alaska',
      'Arizona',
      'Arkansas',
      'California',
      'Colorado',
      'Connecticut',
      'Delaware',
      'Florida',
      'Georgia',
      'Hawaii',
      'Idaho',
      'Illinois',
      'Indiana',
      'Iowa',
      'Kansas',
      'Kentucky',
      'Louisiana',
      'Maine',
      'Maryland',
      'Massachusetts',
      'Michigan',
      'Minnesota',
      'Mississippi',
      'Missouri',
      'Montana',
      'Nebraska',
      'Nevada',
      'New Hampshire',
      'New Jersey',
      'New Mexico',
      'New York',
      'North Carolina',
      'North Dakota',
      'Ohio',
      'Oklahoma',
      'Oregon',
      'Pennsylvania',
      'Rhode Island',
      'South Carolina',
      'South Dakota',
      'Tennessee',
      'Texas',
      'Utah',
      'Vermont',
      'Virginia',
      'Washington',
      'West Virginia',
      'Wisconsin',
      'Wyoming',
    ];

    return (
      <div className="container p-res">
        <div className="row">
          <MediaQuery minDeviceWidth={800}>
            <div className="heading-box descender">
              <h1>New Space</h1>
            </div>
          </MediaQuery>
          <MediaQuery maxDeviceWidth={600}>
            <div className="mobile-heading-box">
              <h2>New Space</h2>
            </div>
          </MediaQuery>
        </div>
        <div className="row justify-content-center pt-5 pl-4 pl-lg-5 pr-4 pr-lg-5">
          <form className="w-100" onSubmit={this.handleSubmit}>
            <div className="col pb-3 pb-sm-0 pb-md-0 pb-lg-0 pb-xl-0">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 pl-0 pr-0">
                  <div className="row">
                    <h5>Name</h5>
                  </div>
                  <div className="row pb-3">
                    <input className="form-control" type="text" placeholder="Your space's name" name="name" onChange={this.handleInputChange} />
                  </div>
                  <div className="row">
                    <h5>Purpose</h5>
                  </div>
                  <div className="row pb-3">
                    <div className="col form-check" onChange={this.handleInputChange}>
                      <input className="form-check-input" type="radio" id="work" name="purpose_id" value={1} />
                      <label className="form-check-label" htmlFor="work">
                        Work
                      </label>
                    </div>
                    <div className="col form-check" onChange={this.handleInputChange}>
                      <input className="form-check-input" type="radio" id="live" name="purpose_id" value={2} />
                      <label className="form-check-label" htmlFor="live">
                        Live
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <h5>Availability</h5>
                  </div>
                  <div className="row pb-3">
                    <div className="col form-check" onChange={this.handleInputChange}>
                      <input className="form-check-input" type="radio" id="open" name="open" value="true" />
                      <label className="form-check-label" htmlFor="open">
                        Open
                      </label>
                    </div>
                    <div className="col form-check" onChange={this.handleInputChange}>
                      <input className="form-check-input" type="radio" id="closed" name="open" value="false" />
                      <label className="form-check-label" htmlFor="closed">
                        Closed
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <h5>Cost</h5>
                  </div>
                  <div className="row pb-3">
                    <input className="form-control" type="text" placeholder="$000.00" name="cost" onChange={this.handleCostChange} />
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 pl-0 pr-0">
                  <MediaQuery minDeviceWidth={601}>
                    <div className="row justify-content-end">
                      {imageDisplay}
                    </div>
                  </MediaQuery>
                  <MediaQuery maxDeviceWidth={600}>
                    {imageDisplayMobile}
                  </MediaQuery>
                </div>
              </div>
            </div>
            <div className="row">
              <h5>Location</h5>
            </div>
            <div className="row">
              <div className="col">
                <p>
                  <i>Only your neighborhood, city, and state will be displayed publicly.</i>
                </p>
                <div className="form-group mb-2">
                  <label className="mb-0" htmlFor="inputAddress">Address</label>
                  <input
                    type="text"
                    name="street_address"
                    className="form-control"
                    id="inputAddress"
                    placeholder="1234 Main St"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="mb-0" htmlFor="inputAddress2">Address 2</label>
                  <input
                    type="text"
                    name="street_address2"
                    className="form-control"
                    id="inputAddress2"
                    placeholder="Apartment, studio, or floor"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="form-row mb-2">
                  <div className="form-group col-md-6">
                    <label className="mb-0" htmlFor="inputCity">City</label>
                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      id="inputCity"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className="form-group col-md-4 mb-2">
                    <label className="mb-0" htmlFor="inputState">State</label>
                    <select
                      id="inputState"
                      name="state"
                      className="form-control"
                      onChange={this.handleInputChange}
                    >
                      <option>Choose...</option>
                      {states.map(state => (
                        <option key={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-md-2 mb-2">
                    <label className="mb-0" htmlFor="inputZip">Zip</label>
                    <input
                      type="text"
                      name="zip"
                      className="form-control"
                      id="inputZip"
                      placeholder="00000"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <h5>Description</h5>
            </div>
            <div className="row pb-3">
              <textarea className="form-control" type="text-area" placeholder="Information you want space members and (if open) space seekers to know about your space" name="description" rows="6" onChange={this.handleInputChange} />
            </div>
            <div className="row">
              <h5>Time-frame</h5>
            </div>
            <div className="row pb-3">
              <div className="col form-check" onChange={this.handleInputChange}>
                <input className="form-check-input" type="radio" id="daily" name="timeline_id" value={1} />
                <label className="form-check-label" htmlFor="daily">
                  Daily
                </label>
              </div>
              <div className="col form-check" onChange={this.handleInputChange}>
                <input className="form-check-input" type="radio" id="weekly" name="timeline_id" value={2} />
                <label className="form-check-label" htmlFor="weekly">
                  Weekly
                </label>
              </div>
              <div className="col form-check" onChange={this.handleInputChange}>
                <input className="form-check-input" type="radio" id="monthly" name="timeline_id" value={3} />
                <label className="form-check-label" htmlFor="monthly">
                  Monthly
                </label>
              </div>
              <div className="col form-check" onChange={this.handleInputChange}>
                <input className="form-check-input" type="radio" id="long-term" name="timeline_id" value={4} />
                <label className="form-check-label" htmlFor="long-term">
                  Long-term
                </label>
              </div>
            </div>
            <div className="row">
              <h5>Capacity</h5>
            </div>
            <div className="row pb-3">
              <input className="form-control" type="text" placeholder="0 people" name="capacity" onChange={this.handleCapacityChange} />
            </div>
            <div className="row">
              <h5>Smoking?</h5>
            </div>
            <div className="row pb-3">
              <div className="col form-check" onChange={this.handleInputChange}>
                <input className="form-check-input" type="radio" id="smoking-outside" name="smoking_id" value={1} />
                <label className="form-check-label" htmlFor="smoking-outside">
                  Outside is fine
                </label>
              </div>
              <div className="col form-check" onChange={this.handleInputChange}>
                <input className="form-check-input" type="radio" id="smoking-anywhere" name="smoking_id" value={2} />
                <label className="form-check-label" htmlFor="smoking-anywhere">
                  Anywhere is fine
                </label>
              </div>
              <div className="col form-check" onChange={this.handleInputChange}>
                <input className="form-check-input" type="radio" id="no-smoking" name="smoking_id" value={3} />
                <label className="form-check-label" htmlFor="no-smoking">
                  Absolutely not
                </label>
              </div>
            </div>
            <div className="row">
              <h5>Pet-friendly?</h5>
            </div>
            <div className="row pb-3">
              <div className="col form-check" onChange={this.handleInputChange}>
                <input className="form-check-input" type="radio" id="pets-outside" name="pet_id" value={1} />
                <label className="form-check-label" htmlFor="pets-outside">
                  Outside is fine
                </label>
              </div>
              <div className="col form-check" onChange={this.handleInputChange}>
                <input className="form-check-input" type="radio" id="pets-anywhere" name="pet_id" value={2} />
                <label className="form-check-label" htmlFor="pets-anywhere">
                  Anywhere is fine
                </label>
              </div>
              <div className="col form-check" onChange={this.handleInputChange}>
                <input className="form-check-input" type="radio" id="no-pets" name="pet_id" value={3} />
                <label className="form-check-label" htmlFor="no-pets">
                  Absolutely not
                </label>
              </div>
            </div>
            <div className="row">
              <h5>Additional Amenities</h5>
            </div>
            <div className="col">
              <ul list-style-type="disc">
                {this.state.amenities.map((amenity, i) => (
                  <TextInput 
                    type="text"
                    glyph="store"
                    field={i}
                    placeholder="add amenity here"
                    value={amenity.name}
                    finalize={this.updateAmenities}
                  />
                ))}
              </ul>
            </div>
            <div className="row pr-0 input-group" onChange={this.handleInputChange}>
              <input type="text" className="form-control" placeholder="Add up to 8 additional amenities" name="amenity" value={this.state.amenity} />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" onClick={this.addAmenity}>Add</button>
              </div>
            </div>
            <div className="row pt-5">
              <div className="col text-center">
                <button type="submit" className="btn btn-primary">Create New Space</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

CreateSpace.propTypes = {
  toggleRefresh: PropTypes.func,
  history: PropTypes.obj, // eslint-disable-line
};
CreateSpace.defaultProps = {
  toggleRefresh: () => {},
  history: {},
};

export default CreateSpace;
