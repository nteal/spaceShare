import React from 'react';

class CreateSpace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'space',
      purpose_id: 1,
      open: false,
      cost: '0',
      street_address: 'A street address has not been provided for this space',
      city: 'unknown',
      zip: 'unknown',
      state: 'unknown',
      neighborhood: 'unknown',
      location_display: 'Make my address public',
      description: 'A description is not available for this space.',
      timeline_id: 2,
      capacity: '0',
      smoking_id: 2,
      pet_id: 3,
      amenities: [],
      main_image: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidMount() {
    console.log('new space did mount');
  }
  handleInputChange(event) {
    const { target } = event;
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }
  render() {
    return (
      <form>
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
      </form>
    );
  }
}

export default CreateSpace;
