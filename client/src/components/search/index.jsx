import React from 'react';
import Axios from 'axios';
import PeopleSearch from './peopleSearch.jsx';
import SearchResults from '../search-results/index.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purpose: 'Live',
      city: 'New Orleans',
      price_min: 0,
      price_max: 1000000,
      timeline: 'Long-term',
      smoking: 'Outside is fine',
      pet: 'Anywhere is fine',
      include_people: true,
      peopleSearch: false,
      getResults: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.isValidBudgetEntry = this.isValidBudgetEntry.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    console.log('new search did mount');
  }
  // getLocation() {
  //   Axios.get('/api/get-location/', {
  //     params: {
  //       address: this.state.city,
  //     },
  //   })
  //     .then((city) => {
  //       this.setState({ city: city.data });
  //     });
  // }
  isValidBudgetEntry() {
    const { price_min, price_max } = this.state;
    let decimalFound = false;
    const nums = [price_min, price_max].reduce((numbers, num) => {
      numbers.push(num.split('').reduce((number, char, i, numArray) => {
        if (i === 0) { decimalFound = false; }
        if (((char >= '0' && char <= '9') || char === '.') && !decimalFound) {
          if (char === '.') {
            number.push(char);
            for (let j = 1; j < 3; j++) {
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
    console.log(`min: ${min}\nmax: ${max}`);
    debugger;
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
    console.log(this.isValidBudgetEntry());
    console.dir(this.state);
    if (this.isValidBudgetEntry()) {
      if (this.state.include_people === 'yes') {
        this.setState({
          peopleSearch: true,
        });
      } else {
        // Axios.post('/api/new-search', this.state);
        this.setState({
          getResults: true,
        });
      }
    } else {
      window.alert('Please enter a valid BUDGET range wherein\nleft-number <= right-number');
    }
    event.preventDefault();
  }
  render() {
    if (this.state.getResults) {
      return <SearchResults />;
    }
    if (!this.state.peopleSearch) {
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
              <input className="form-check-input" type="radio" id="work" name="purpose" value="Work" />
              <label className="form-check-label" htmlFor="work">
                Work
              </label>
            </div>
            <div className="col-2 form-check" onChange={this.handleInputChange}>
              <input className="form-check-input" type="radio" id="live" name="purpose" value="Live" />
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
              <input className="form-control" type="text" placeholder="" name="city" onChange={this.handleInputChange} />
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
            <h3>Timeframe</h3>
          </div>
          <div className="row">
            <div className="col-2 form-check" onChange={this.handleInputChange}>
              <input className="form-check-input" type="radio" id="daily" name="timeline" value="Daily" />
              <label className="form-check-label" htmlFor="daily">
                Daily
              </label>
            </div>
            <div className="col-2 form-check" onChange={this.handleInputChange}>
              <input className="form-check-input" type="radio" id="weekly" name="timeline" value="Weekly" />
              <label className="form-check-label" htmlFor="weekly">
                Weekly
              </label>
            </div>
            <div className="col-2 form-check" onChange={this.handleInputChange}>
              <input className="form-check-input" type="radio" id="monthly" name="timeline" value="Monthly" />
              <label className="form-check-label" htmlFor="monthly">
                Monthly
              </label>
            </div>
            <div className="col-2 form-check" onChange={this.handleInputChange}>
              <input className="form-check-input" type="radio" id="long-term" name="timeline" value="Long-term" />
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
              <input className="form-check-input" type="radio" id="outside" name="smoking" value="Outside is fine" />
              <label className="form-check-label" htmlFor="outside">
                Outside is fine
              </label>
            </div>
            <div className="col-3 form-check" onChange={this.handleInputChange}>
              <input className="form-check-input" type="radio" id="anywhere" name="smoking" value="Anywhere is fine" />
              <label className="form-check-label" htmlFor="anywhere">
                Anywhere is fine
              </label>
            </div>
            <div className="col-3 form-check" onChange={this.handleInputChange}>
              <input className="form-check-input" type="radio" id="no-smoking" name="smoking" value="Absolutely not" />
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
              <input className="form-check-input" type="radio" id="outside" name="pet" value="Outside is fine" />
              <label className="form-check-label" htmlFor="outside">
                Outside is fine
              </label>
            </div>
            <div className="col-3 form-check" onChange={this.handleInputChange}>
              <input className="form-check-input" type="radio" id="anywhere" name="pet" value="Anywhere is fine" />
              <label className="form-check-label" htmlFor="anywhere">
                Anywhere is fine
              </label>
            </div>
            <div className="col-3 form-check" onChange={this.handleInputChange}>
              <input className="form-check-input" type="radio" id="no-pets" name="pet" value="Absolutely not" />
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
              <input className="form-check-input" type="radio" id="yes" name="include_people" value="yes" />
              <label className="form-check-label" htmlFor="yes">
                Yes
              </label>
            </div>
            <div className="col-2 form-check" onChange={this.handleInputChange}>
              <input className="form-check-input" type="radio" id="no" name="include_people" value="no" />
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
        </form>
      );
    }
    return (
      <PeopleSearch
        city={this.state.city}
        price_min={this.state.price_min}
        price_max={this.state.price_max}
        timeline={this.state.timeline}
        smoking={this.state.smoking}
        pet={this.state.pet}
        include_people={this.state.include_people}
        getResults={this.state.getResults}
      />
    );
  }
}

export default Search;
