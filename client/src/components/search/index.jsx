import React from 'react';
import Axios from 'axios';
import PeopleSearch from './peopleSearch.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purpose_id: 2,
      location: 'New Orleans',
      price_min: '0',
      price_max: '1000000',
      timeline_id: 4,
      smoking_id: 1,
      pet_id: 2,
      include_people: true,
      peopleSearch: false,
      personality_id: 1,
      pet_id: 1,
      sleep_id: 1,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.isValidBudgetEntry = this.isValidBudgetEntry.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    // eslint-disable-next-line
    console.log('new search did mount');
  }
  isValidBudgetEntry() {
    const { price_min, price_max } = this.state;
    let decimalFound = false;
    const nums = [price_min, price_max].reduce((numbers, num) => {
      numbers.push(num.split('').reduce((number, char, i, numArray) => {
        if (i === 0) { decimalFound = false; }
        if (((char >= '0' && char <= '9') || char === '.') && !decimalFound) {
          if (char === '.') {
            number.push(char);
            for (let j = 1; j < 3; j += 1) {
              if (numArray[i + j] >= '0' && numArray[i + j] <= '9') {
                number.push(numArray[i + j]);
              }
            }
            decimalFound = true;
          } else {
            number.push(char);
          }
        }
        if (i === numArray.length - 1) {
          if (number.includes('.')) {
            const decimal = number.indexOf('.');
            if (decimal === number.length - 3) { return number; }
            if (decimal === number.length - 2) { return number.concat('0'); }
            if (decimal === number.length - 1) { return number.concat(['0', '0']); }
          }
          return number.concat(['.', '0', '0']);
        }
        return number;
      }, []));
      return numbers;
    }, []);
    let min = Number.parseFloat(nums[0].join(''));
    let max = Number.parseFloat(nums[1].join(''));
    if (isNaN(min)) { min = 0.00; }
    if (isNaN(max)) { max = 0.00; }
    if (min <= max) {
      this.setState({
        price_min: min,
        price_max: max,
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
    if (this.isValidBudgetEntry()) {
      if (this.state.include_people !== 'false') {
        event.preventDefault();
        this.setState({
          include_people: true,
          peopleSearch: true,
        });
      } else {
        this.setState({
          include_people: false,
        }, () => {
          Axios.post(
            `/api/new-search/${localStorage.getItem('id_token')}`,
            { search: this.state },
          )
            .then((response) => {
              localStorage.setItem('id_search', response.data);
              this.props.history.push('/search-results');
            });
        });
      }
    } else {
      event.preventDefault();
      // eslint-disable-next-line
      window.alert('Please enter a valid BUDGET range wherein\nleft-number <= right-number');
    }
  }
  render() {
    if (this.state.peopleSearch) {
      return (
        <PeopleSearch
          purpose_id={this.state.purpose_id}
          location={this.state.location}
          price_min={this.state.price_min}
          price_max={this.state.price_max}
          timeline_id={this.state.timeline_id}
          smoking_id={this.state.smoking_id}
          pet_id={this.state.pet_id}
          include_people={this.state.include_people}
          history={this.props.history}
        />
      );
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <h1>New Search</h1>
        </div>
        <div className="row">
          <h3>Purpose</h3>
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
        <div className="row">
          <h3>Location</h3>
        </div>
        <div className="row">
          <div className="col-8">
            <input className="form-control" type="text" placeholder="" name="location" onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="row">
          <h3>Budget</h3>
        </div>
        <div className="row">
          <div className="col-3">
            <input className="form-control" type="text" placeholder="$000.00" name="price_min" onChange={this.handleInputChange} />
          </div>
          <div className="col-1 text-center">
            <h6>to</h6>
          </div>
          <div className="col-3">
            <input className="form-control" type="text" placeholder="$000.00" name="price_max" onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="row">
          <h3>Time-frame</h3>
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
        <div className="row">
          <h3>Smoking?</h3>
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
          <h3>Pet-friendly?</h3>
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
          <h3>Include people in your search?</h3>
        </div>
        <div className="row">
          <div className="col-2 form-check" onChange={this.handleInputChange}>
            <input className="form-check-input" type="radio" id="yes" name="include_people" value="true" />
            <label className="form-check-label" htmlFor="yes">
              Yes
            </label>
          </div>
          <div className="col-2 form-check" onChange={this.handleInputChange}>
            <input className="form-check-input" type="radio" id="no" name="include_people" value="false" />
            <label className="form-check-label" htmlFor="no">
              No
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-8 text-center">
            <button type="submit" className="btn btn-outline-primary">Let&apos;s go</button>
          </div>
        </div>
      </form>
    );
  }
}

export default Search;
