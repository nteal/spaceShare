import React from 'react';
import Axios from 'axios';
import SearchResults from '../search-results/index.jsx';

class PeopleSearch extends React.Component {
  constructor(props) {
    super(props);
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
      city: this.props.city,
      price_min: this.props.price_min,
      price_max: this.props.price_max,
      timeline_id: this.props.timeline_id,
      smoking_id: this.props.smoking_id,
      pet_id: this.props.pet_id,
      include_people: this.props.include_people,
    });
  }
  isValidAgeRange() {
    const { age_min, age_max } = this.state;
    const ages = [age_min, age_max].reduce((numbers, num) => {
      numbers.push(num.split('').reduce((number, char, i, numArray) => {
        if (char >= '0' && char <= '9') { number.push(char); }
        return number;
      }, []));
      return numbers;
    }, []);
    let min = Number.parseFloat(ages[0].join(''));
    let max = Number.parseFloat(ages[1].join(''));
    if (isNaN(min)) { min = 0; }
    if (isNaN(max)) { max = 100; }
    if (min <= max) {
      this.setState({
        age_min: min,
        age_max: max,
      }, () => {
        Axios.post(`/api/new-search/token/${localStorage.getItem('id_token')}/search/${this.state}`) 
        // {
          // search: this.state,
          // token: localStorage.getItem('id_token'),
        // })
          .then((response) => {
            localStorage.setItem('id_search', response.data);
            this.props.history.push('/search-results');
          });
        this.props.history.push('/search-results');
      });
    } else {
      return false;
    }
    return true;
  }
  handleInputChange(event) {
    const { target } = event;
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(event) {
    if (!this.isValidAgeRange()) {
      event.preventDefault();
      window.alert('Please enter a valid AGE range wherein\nleft-number <= right-number');
    }
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <h1>Person Search</h1>
        </div>
        <div className="row">
          <h5>Would you prefer a...</h5>
        </div>
        <div className="row">
          <div className="col-2 form-check" onChange={this.handleInputChange}>
            <input className="form-check-input" type="radio" id="day" name="sleep_id" value={1} />
            <label className="form-check-label" htmlFor="day">
              Early bird
            </label>
          </div>
          <div className="col-2 form-check" onChange={this.handleInputChange}>
            <input className="form-check-input" type="radio" id="night" name="sleep_id" value={2} />
            <label className="form-check-label" htmlFor="night">
              Night Owl
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-2 form-check" onChange={this.handleInputChange}>
            <input className="form-check-input" type="radio" id="introvert" name="personality_id" value={1} />
            <label className="form-check-label" htmlFor="introvert">
              Introvert
            </label>
          </div>
          <div className="col-2 form-check" onChange={this.handleInputChange}>
            <input className="form-check-input" type="radio" id="extrovert" name="personality_id" value={2} />
            <label className="form-check-label" htmlFor="extrovert">
              Extrovert
            </label>
          </div>
        </div>
        <div className="row">
          <h5>Age Range</h5>
        </div>
        <div className="row">
          <div className="col-3">
            <input className="form-control" type="text" placeholder="0" name="age_min" onChange={this.handleInputChange} />
          </div>
          <div className="col-1 text-center">
            <h6>to</h6>
          </div>
          <div className="col-3">
            <input className="form-control" type="text" placeholder="100" name="age_max" onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="row">
          <div className="col-8 text-center">
            <button type="submit" className="btn btn-outline-primary">Time for liftoff!</button>
          </div>
        </div>
      </form>
    );
  }
}

export default PeopleSearch;
