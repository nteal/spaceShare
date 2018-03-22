import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import Rocket from 'mdi-react/RocketIcon.js';

class PeopleSearch extends React.Component {
  constructor(props) {
    super(props);
    /* eslint-disable */
    this.state = {
      sleep_id: 1,
      personality_id: 1,
      age_min: '0',
      age_max: '100',
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.isValidAgeRange = this.isValidAgeRange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    console.log('person search did mount');
    this.setState({
      purpose_id: this.props.purpose_id,
      location: this.props.location,
      price_min: this.props.price_min,
      price_max: this.props.price_max,
      timeline_id: this.props.timeline_id,
      smoking_id: this.props.smoking_id,
      pet_id: this.props.pet_id,
      include_people: this.props.include_people,
      distance: this.props.distance,
    });
    /* eslint-enable */
  }
  isValidAgeRange() {
    const { age_min, age_max } = this.state;
    const ages = [age_min, age_max].reduce((numbers, num) => {
      numbers.push(num.split('').reduce((number, char) => {
        if (char >= '0' && char <= '9') { number.push(char); }
        return number;
      }, []));
      return numbers;
    }, []);
    let min = Number.parseFloat(ages[0].join(''));
    let max = Number.parseFloat(ages[1].join(''));
    if (isNaN(min)) { min = 0; } // eslint-disable-line
    if (isNaN(max)) { max = 100; } // eslint-disable-line
    if (min <= max) {
      this.setState({
        age_min: min,
        age_max: max,
      });
      return true;
    }
    return false;
  }
  handleInputChange(event) {
    const { target } = event;
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.isValidAgeRange()) {
      Axios.post(
        `/api/new-search/${localStorage.getItem('id_token')}`,
        { search: this.state },
      )
        .then((response) => {
          localStorage.setItem('id_search', response.data);
          this.props.history.push({
            pathname: '/search-results',
            state: { id_search: response.data },
          });
        });
    } else {
      // eslint-disable-next-line
      window.alert('Please enter a valid AGE range wherein\nleft-number <= right-number');
    }
  }
  render() {
    return (
      <main className="container p-res pl-4">
        <div className="row">
          <MediaQuery minDeviceWidth={800}>
            <div className="heading-box">
              <h1>Person Search</h1>
            </div>
          </MediaQuery>
          <MediaQuery maxDeviceWidth={799}>
            <div className="mobile-heading-box">
              <h2>Person Search</h2>
            </div>
          </MediaQuery>
        </div>
        <div className="row justify-content-center pt-5 pl4 pl-lg-5 pr-4 pr-lg-5">
          <form onSubmit={this.handleSubmit} className="pl-4">
            <div className="row">
              <h5>Would you prefer a...</h5>
            </div>
            <div className="row pb-3">
              <div className="col form-check" onChange={this.handleInputChange}>
                <input className="form-check-input" type="radio" id="day" name="sleep_id" value={1} />
                <label className="form-check-label" htmlFor="day">
                  Early bird
                </label>
              </div>
              <div className="col form-check" onChange={this.handleInputChange}>
                <input className="form-check-input" type="radio" id="night" name="sleep_id" value={2} />
                <label className="form-check-label" htmlFor="night">
                  Night Owl
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-5 line mt-3" />
              <div className="col-1 p-0">
                <Rocket className="mt-neg-1" height={45} width={45} fill="#6F5BC0" />
              </div>
              <div className="col-5 line mt-3" />
            </div>
            <div className="row pb-3">
              <div className="col form-check" onChange={this.handleInputChange}>
                <input className="form-check-input" type="radio" id="introvert" name="personality_id" value={1} />
                <label className="form-check-label" htmlFor="introvert">
                  Introvert
                </label>
              </div>
              <div className="col form-check" onChange={this.handleInputChange}>
                <input className="form-check-input" type="radio" id="extrovert" name="personality_id" value={2} />
                <label className="form-check-label" htmlFor="extrovert">
                  Extrovert
                </label>
              </div>
            </div>
            <div className="row">
              <h6>Age Range</h6>
            </div>
            <div className="row d-flex align-items-center pb-3">
              <div className="col-5">
                <input className="form-control" type="text" placeholder="0" name="age_min" onChange={this.handleInputChange} />
              </div>
              <div className="col-2 text-center">
                <p>to</p>
              </div>
              <div className="col-5">
                <input className="form-control" type="text" placeholder="100" name="age_max" onChange={this.handleInputChange} />
              </div>
            </div>
            <div className="row pt-3">
              <div className="col text-center">
                <button type="submit" className="btn btn-primary">Time for liftoff!</button>
              </div>
            </div>
          </form>
        </div>
      </main>
    );
  }
}

PeopleSearch.propTypes = {
  location: PropTypes.string,
  price_min: PropTypes.number,
  price_max: PropTypes.number,
  timeline_id: PropTypes.number,
  smoking_id: PropTypes.number,
  pet_id: PropTypes.number,
  include_people: PropTypes.bool,
  distance: PropTypes.number,
  history: PropTypes.obj, // eslint-disable-line
};
PeopleSearch.defaultProps = {
  location: 'New Orleans',
  price_min: 0,
  price_max: 100000000,
  timeline_id: 4,
  smoking_id: 1,
  pet_id: 2,
  include_people: true,
  distance: 20,
  history: {},
};

export default PeopleSearch;
