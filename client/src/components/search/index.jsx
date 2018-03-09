import React from 'react';
import Axios from 'axios';
import PeopleSearch from './peopleSearch.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purpose: 'live',
      location: '',
      min_cost: '0.00',
      max_cost: '1,000,000.00',
      timeline: 'long-term',
      smoking: 'outside is fine',
      pet: 'anywhere is fine',
      people: true,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.isValidBudgetEntry = this.isValidBudgetEntry.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    console.log('new search did mount');
  }
  isValidBudgetEntry() {
    const { min_cost, max_cost } = this.state;
    let decimalFound = false;
    const nums = [ min_cost, max_cost ].reduce((numbers, num) => {
      numbers.push(num.split('').reduce((number, char, i, numArray) => {
        if (i === 0) { decimalFound = false; }
        if (((char >= '0' && char <= '9') || char === '.') && !decimalFound) {
          if (char === '.') {
            for (let j = 0; j < 3; j++) {
              if (numArray[i + j] >= '0' && numArray[i + j] <= '9') {
                number.push(numArray[i + j]);
              }
            }
            decimalFound = true;
          } else {
            number.push(char);
          }
        }
        return number;
      }, []));
      return numbers;
    }, []);
    console.dir(nums);
    return parseInt(nums[0].join(''), 10) < parseInt(nums[1].join(''), 10);
  }
  handleInputChange(event) {
    const { target } = event;
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(event) {
    console.dir(this.state);
    console.log(this.isValidBudgetEntry());
    // Axios.post('/api/new-search', this.state);
    event.preventDefault();
  }
  render() {
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
            <input className="form-check-input" type="radio" id="work" name="purpose" value="work" />
            <label className="form-check-label" htmlFor="work">
              Work
            </label>
          </div>
          <div className="col-2 form-check" onChange={this.handleInputChange}>
            <input className="form-check-input" type="radio" id="live" name="purpose" value="live" />
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
            <input className="form-control" type="text" placeholder="$000.00" name="min_cost" onChange={this.handleInputChange} />
        </div>
          <div className="col-1 text-center">
          <h6>to</h6>
        </div>
          <div className="col-3">
            <input className="form-control" type="text" placeholder="$000.00" name="max_cost" onChange={this.handleInputChange} />
        </div>
        </div>
        <div className="row">
          <h3>Timeframe</h3>
        </div>
        <div className="row">
          <div className="col-2 form-check" onChange={this.handleInputChange}>
            <input className="form-check-input" type="radio" id="daily" name="timeline" value="daily" />
            <label className="form-check-label" htmlFor="daily">
              Daily
            </label>
          </div>
          <div className="col-2 form-check" onChange={this.handleInputChange}>
            <input className="form-check-input" type="radio" id="weekly" name="timeline" value="weekly" />
            <label className="form-check-label" htmlFor="weekly">
              Weekly
            </label>
          </div>
          <div className="col-2 form-check" onChange={this.handleInputChange}>
            <input className="form-check-input" type="radio" id="monthly" name="timeline" value="monthly" />
            <label className="form-check-label" htmlFor="monthly">
              Monthly
            </label>
          </div>
          <div className="col-2 form-check" onChange={this.handleInputChange}>
            <input className="form-check-input" type="radio" id="long-term" name="timeline" value="long-term" />
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
            <input className="form-check-input" type="radio" id="outside" name="smoking" value="outside is fine" />
            <label className="form-check-label" htmlFor="outside">
              Outside is fine
            </label>
          </div>
          <div className="col-3 form-check" onChange={this.handleInputChange}>
            <input className="form-check-input" type="radio" id="anywhere" name="smoking" value="anywhere is fine" />
            <label className="form-check-label" htmlFor="anywhere">
              Anywhere is fine
            </label>
          </div>
          <div className="col-3 form-check" onChange={this.handleInputChange}>
            <input className="form-check-input" type="radio" id="no-smoking" name="smoking" value="absolutely not" />
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
            <input className="form-check-input" type="radio" id="outside" name="pet" value="outside is fine" />
            <label className="form-check-label" htmlFor="outside">
              Outside is fine
            </label>
          </div>
          <div className="col-3 form-check" onChange={this.handleInputChange}>
            <input className="form-check-input" type="radio" id="anywhere" name="pet" value="anywhere is fine" />
            <label className="form-check-label" htmlFor="anywhere">
              Anywhere is fine
            </label>
          </div>
          <div className="col-3 form-check" onChange={this.handleInputChange}>
            <input className="form-check-input" type="radio" id="no-pets" name="pet" value="absolutely not" />
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
            <input className="form-check-input" type="radio" id="yes" name="people" value="yes" />
            <label className="form-check-label" htmlFor="yes">
              Yes
            </label>
          </div>
          <div className="col-2 form-check" onChange={this.handleInputChange}>
            <input className="form-check-input" type="radio" id="no" name="people" value="no" />
            <label className="form-check-label" htmlFor="no">
              No
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-8 text-center">
            <button type="submit" className="btn btn-outline-primary">Let's go</button>
          </div>
        </div>
        {/* if conditional is meet: */}
        <PeopleSearch />
      </form>
    );
  }
}

export default Search;
