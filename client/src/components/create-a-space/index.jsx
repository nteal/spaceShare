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
      </form>
    );
  }
}

export default CreateSpace;
