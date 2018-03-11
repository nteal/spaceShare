import React from 'react';
import TextInput from '../profile/textInput.jsx';

class CreateSpace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'space',
      purpose_id: 1,
      open: false,
      cost: '0',
      location: '',
      street_address: 'A street address has not been provided for this space',
      city: 'unknown',
      zip: 'unknown',
      state: 'unknown',
      neighborhood: 'unknown',
      description: 'A description is not available for this space.',
      timeline_id: 2,
      capacity: '0',
      smoking_id: 2,
      pet_id: 3,
      amenities: [],
      amenity: '',
      main_image: {},
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCostChange = this.handleCostChange.bind(this);
    this.handleCapacityChange = this.handleCapacityChange.bind(this);
    this.addAmenity = this.addAmenity.bind(this);
    this.updateAmenities = this.updateAmenities.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    console.log('new space did mount');
  }
  handleCostChange(event) {
    let decimalFound = false;
    let cost = event.target.value.split('').reduce((number, char, i, costArray) => {
      if (((char >= '0' && char <= '9') || char === '.') && !decimalFound) {
        if (char === '.') {
          number.push(char);
          for (let j = 1; j < 3; j++) {
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
    if (isNaN(price)) { price = 0; }
    this.setState({
      cost: price,
    });
  }
  handleCapacityChange(event) {
    let capacity = event.target.value.split('').reduce((number, char, i, costArray) => {
      if (char >= '0' && char <= '9') {
          number.push(char);
      }
      return number;
    }, []);
    let cap = Number.parseInt(cost.join(''));
    if (isNaN(cap)) { cap = 0; }
    this.setState({
      capacity: cap,
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
      window.alert('you have reached the maximum limit of 8 amenities\nyou may edit any existing amenity');
    } else {
      this.setState({
        amenities: this.state.amenities.concat({name: this.state.amenity}),
        amenity: '',
      })
    }
  }
  updateAmenities(field, value) {
    const updatedAmenities = this.state.amenities.map((amenity, i) => {
      if (i === field) {
        amenity.name = value;
      }
      return amenity;
    });
    this.setState({
      amenities: updatedAmenities,
    })
  }
  handleSubmit() {
    // Axios.post('/api/new-space', {
    //   space: this.state,
    //   token: localstorage.getItem('id_token'),
    // })
    //   .then((response) => {
    //     localStorage.setItem('id_space', response.data)
    //     this.props.history.push('/common-area');
    //   });
    this.props.history.push('/common-area');
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="rom">
          <h1>New Space</h1>
        </div>
        <div className="rom">
          <h5>Name</h5>
        </div>
        <div className="col-3">
          <input className="form-control" type="text" placeholder="edit the name of your space here" name="name" onChange={this.handleInputChange} />
        </div>
        <div className="rom">
          <h5>Purpose</h5>
        </div>
        <div className="row">
          <div className="col-2 form-check" onChange={this.handleInputChange}>
            <input className="form-check-input" type="radio" id="work" name="purpose_id" value={1} />
            <label className="form-check-label" htmlFor="work">
              Work
              </label>
          </div>
          <div className="col-2 form-check" onChange={this.handleInputChange}>
            <input className="form-check-input" type="radio" id="live" name="purpose_id" value={2} />
            <label className="form-check-label" htmlFor="live">
              Live
              </label>
          </div>
        </div>
        <div className="rom">
          <h5>Availability</h5>
        </div>
        <div className="row">
          <div className="col-2 form-check" onChange={this.handleInputChange}>
            <input className="form-check-input" type="radio" id="open" name="open" value={'true'} />
            <label className="form-check-label" htmlFor="open">
              Open
              </label>
          </div>
          <div className="col-2 form-check" onChange={this.handleInputChange}>
            <input className="form-check-input" type="radio" id="closed" name="open" value={'false'} />
            <label className="form-check-label" htmlFor="closed">
              Closed
              </label>
          </div>
        </div>
        <div className="rom">
          <h5>Cost</h5>
        </div>
        <div className="col-2">
          <input className="form-control" type="text" placeholder="$000.00" name="cost" onChange={this.handleCostChange} />
        </div>
        <div className="rom">
          <h5>Location</h5>
        </div>
        <div className="col-6">
          <input className="form-control" type="text" placeholder="Enter address" name="location" onChange={this.handleInputChange} />
        </div>
        <div className="rom">
          <h6>When availability is set to open your neighborhood will be displayed</h6>
        </div>
        <div className="rom">
          <h5>Description</h5>
        </div>
        <div className="col-6">
          <textarea className="form-control" type="text-area" placeholder="Information you want space members and (if open) space seekers to know about your space" name="description" rows="6" onChange={this.handleInputChange} />
        </div>
        <div className="rom">
          <h5>Timeframe</h5>
        </div>
        <div className="row">
          <div className="col-2 form-check" onChange={this.handleInputChange}>
            <input className="form-check-input" type="radio" id="daily" name="timeline_id" value={1} />
            <label className="form-check-label" htmlFor="daily">
              Daily
              </label>
          </div>
          <div className="col-2 form-check" onChange={this.handleInputChange}>
            <input className="form-check-input" type="radio" id="weekly" name="timeline_id" value={2} />
            <label className="form-check-label" htmlFor="weekly">
              Weekly
              </label>
          </div>
          <div className="col-2 form-check" onChange={this.handleInputChange}>
            <input className="form-check-input" type="radio" id="monthly" name="timeline_id" value={3} />
            <label className="form-check-label" htmlFor="monthly">
              Monthly
              </label>
          </div>
          <div className="col-2 form-check" onChange={this.handleInputChange}>
            <input className="form-check-input" type="radio" id="long-term" name="timeline_id" value={4} />
            <label className="form-check-label" htmlFor="long-term">
              Long-term
              </label>
          </div>
        </div>
        <div className="rom">
          <h5>Capacity</h5>
        </div>
        <div className="col-2">
          <input className="form-control" type="text" placeholder="0 people" name="capacity" onChange={this.handleCapacityChange} />
        </div>
        <div className="row">
          <h5>Smoking?</h5>
        </div>
        <div className="row">
          <div className="col-3 form-check" onChange={this.handleInputChange}>
            <input className="form-check-input" type="radio" id="outside" name="smoking_id" value={1} />
            <label className="form-check-label" htmlFor="outside">
              Outside is fine
              </label>
          </div>
          <div className="col-3 form-check" onChange={this.handleInputChange}>
            <input className="form-check-input" type="radio" id="anywhere" name="smoking_id" value={2} />
            <label className="form-check-label" htmlFor="anywhere">
              Anywhere is fine
              </label>
          </div>
          <div className="col-3 form-check" onChange={this.handleInputChange}>
            <input className="form-check-input" type="radio" id="no-smoking" name="smoking_id" value={3} />
            <label className="form-check-label" htmlFor="no-smoking">
              Absolutely not
              </label>
          </div>
        </div>
        <div className="row">
          <h5>Pet-friendly?</h5>
        </div>
        <div className="row">
          <div className="col-3 form-check" onChange={this.handleInputChange}>
            <input className="form-check-input" type="radio" id="outside" name="pet_id" value={1} />
            <label className="form-check-label" htmlFor="outside">
              Outside is fine
              </label>
          </div>
          <div className="col-3 form-check" onChange={this.handleInputChange}>
            <input className="form-check-input" type="radio" id="anywhere" name="pet_id" value={2} />
            <label className="form-check-label" htmlFor="anywhere">
              Anywhere is fine
              </label>
          </div>
          <div className="col-3 form-check" onChange={this.handleInputChange}>
            <input className="form-check-input" type="radio" id="no-pets" name="pet_id" value={3} />
            <label className="form-check-label" htmlFor="no-pets">
              Absolutely not
              </label>
          </div>
        </div>
        <div className="row">
          <h5>Additional Amenities</h5>
        </div>
        <div className="col-3">
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
        <div className="col-3 mb-3 input-group" onChange={this.handleInputChange}>
          <input type="text" className="form-control" placeholder="add up to 8 additional amenities" name="amenity" value={this.state.amenity} />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button" onClick={this.addAmenity}>Add</button>
            </div>
        </div>
        <div className="row">
          <div className="col-8 text-center">
            <button type="submit" className="btn btn-outline-primary">Create New Space</button>
          </div>
        </div>
      </form>
    );
  }
}

export default CreateSpace;
