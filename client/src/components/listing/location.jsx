import React from 'react';
import MediaQuery from 'react-responsive';
import Pencil from 'mdi-react/PencilIcon.js';

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: null,
      address: '',
      address2: '',
      city: '',
      state: '',
      zip: 0,
    };
    this.toggleEditing = this.toggleEditing.bind(this);
    this.doneEditing = this.doneEditing.bind(this);
    this.handleEditing = this.handleEditing.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleEditing(event) {
    const { address, address2, city, state, zip } = this.props;
    this.setState({
      editing: true,
      address,
      address2,
      city,
      state,
      zip,
    });
  }

  doneEditing() {
    this.setState({ editing: null });
  }

  handleEditing(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit() {
    const { address, address2, city, state, zip } = this.state;
    this.props.finalize(address, address2, city, state, zip);
    this.doneEditing();
  }

  render() {
    const { editView, open, neighborhood, city, state, zip } = this.props;
    if (editView) {
      const { address } = this.props;
    }
    const { editing } = this.state;

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
    // let displayText;
    // if (isMember) {
    //   const { address, city, state, zip } = props;
    //   displayText = (
    //     <h6>
    //       {address}<br />
    //       {city}, {state} {zip}
    //     </h6>
    //   );
    // } else {
    //   const { neighborhood } = props;
    //   displayText = <h6>{neighborhood}</h6>;
    // }
    
    let displayed;
    if (editing) {
      displayed = (
        <div>
          <p>
            Only your neighborhood, city, and state will be displayed publicly.
          </p>
          <div>
            <div className="form-group">
              <label htmlFor="inputAddress">Address</label>
              <input 
                type="text"
                name="address"
                value={this.state.address}
                className="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
                onChange={this.handleEditing}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputAddress2">Address 2</label>
              <input
                type="text"
                name="address2"
                value={this.state.address2}
                className="form-control"
                id="inputAddress2"
                placeholder="Apartment, studio, or floor"
                onChange={this.handleEditing}
              />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputCity">City</label>
                <input 
                  type="text"
                  name="city"
                  value={this.state.city}
                  className="form-control"
                  id="inputCity"
                  onChange={this.handleEditing}
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="inputState">State</label>
                <select 
                  id="inputState"
                  name="state"
                  value={this.state.state}
                  className="form-control"
                  onChange={this.handleEditing}
                >
                  <option>Choose...</option>
                  {states.map(state => (
                    <option key={state}>{state}</option>
                  ))}
                </select>
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="inputZip">Zip</label>
                <input
                  type="text"
                  name="zip"
                  value={this.state.zip}
                  className="form-control"
                  id="inputZip"
                  placeholder="00000"
                  onChange={this.handleEditing}
                />
              </div>
            </div>
            <div className="row justify-content-end mr-0">
              <button className="btn btn-outline-secondary pb-0 mr-2" onClick={this.handleSubmit} type="submit">
                <i className="material-icons">check</i>
              </button>
              <button className="btn btn-outline-secondary pb-0" onClick={this.doneEditing} type="button">
                <i className="material-icons">close</i>
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      displayed = (
        <div>
          {editView && (<h6>{this.props.address}</h6>)}
          {!editView && (<h6>{neighborhood}</h6>)}
          <h6>{city}, {state}</h6>
        </div>
      );
    }

    return (
      <div className="content-box">
        <MediaQuery minDeviceWidth={800}>
          <div className="mini-heading-box-top">
            <h5>Location</h5>
          </div>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={600}>
          <div className="mini-heading-box-top-mobile">
            <h5>Location</h5>
          </div>
        </MediaQuery>
        {editView && (
          <div>
            <MediaQuery minDeviceWidth={800}>
              <div className="row justify-content-end mr-0 pr-3">
                <Pencil className="mdi-btn" onClick={this.toggleEditing} height={20} width={20} fill="#6F5BC0" />
              </div>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={600}>
              <div className="row justify-content-end mr-0 mt-0 pt-1 pr-1">
                <Pencil className="mdi-btn" onClick={this.toggleEditing} height={20} width={20} fill="#6F5BC0" />
              </div>
            </MediaQuery>
          </div>
        )}
        <div className="invisible-content-box">
          {displayed}
        </div>
      </div>
    );
  }
};

export default Location;
