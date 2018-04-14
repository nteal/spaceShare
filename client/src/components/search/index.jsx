import React from 'react';
import Axios from 'axios';
import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';
import PeopleSearch from './peopleSearch.jsx';
import Footer from '../nav/footer.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purpose_id: 2,
      location: 'new orleans',
      price_min: '0',
      price_max: '1000000',
      timeline_id: 4,
      smoking_id: 1,
      pet_id: 2,
      include_people: true,
      peopleSearch: false,
      personality_id: 1, // eslint-disable-line
      pet_id: 1, // eslint-disable-line
      sleep_id: 1, // eslint-disable-line
      distance: 20,
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
    if (isNaN(min)) { min = 0.00; } // eslint-disable-line
    if (isNaN(max)) { max = 0.00; } // eslint-disable-line
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
            `/search/new-search/${localStorage.getItem('id_token')}`,
            { search: this.state },
          )
            .then((response) => {
              localStorage.setItem('id_search', response.data);
              this.props.history.push({
                pathname: '/search-results',
                state: { id_search: response.data },
              });
            })
            .catch(() => {
              localStorage.removeItem('id_token');
              location.reload();
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
          distance={this.state.distance}
          history={this.props.history}
        />
      );
    }
    return (
      <div>
        <main className="container p-res pl-4">
          <div className="row">
            <MediaQuery minDeviceWidth={800}>
              <div className="heading-box">
                <h1>New Search</h1>
              </div>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={799}>
              <div className="mobile-heading-box">
                <h2>New Search</h2>
              </div>
            </MediaQuery>
          </div>
          <div className="row justify-content-center pt-5 pl-4 pl-lg-5 pr-4 pr-lg-5">
            <form onSubmit={this.handleSubmit} className="w-100 pl-lg-5 pr-lg-5 pl-xl-5 pr-xl-5">
              <div className="row">
                <h6>Purpose</h6>
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
                <h6>Location</h6>
              </div>
              <div className="row pb-3">
                <div className="col">
                  <input className="form-control" type="text" placeholder="" name="location" onChange={this.handleInputChange} />
                </div>
              </div>
              <div className="row">
                <h6>Set size of search area around {this.state.location}</h6>
              </div>
              <div className="row pb-3">
                <div className="col">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <label className="input-group-text" htmlFor="distance">Radius</label>
                    </div>
                    <select className="custom-select" id="distance" name="distance" onChange={this.handleInputChange}>
                      <option selected>20</option>
                      <option value={1}>1</option>
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                    </select>
                    <div className="input-group-append">
                      <span className="input-group-text">miles</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <h6>Budget</h6>
              </div>
              <div className="row d-flex align-items-center pb-3">
                <div className="col-5">
                  <input className="form-control" type="text" placeholder="$000.00" name="price_min" onChange={this.handleInputChange} />
                </div>
                <div className="col-2 text-center">
                  <h6>to</h6>
                </div>
                <div className="col-5">
                  <input className="form-control" type="text" placeholder="$000.00" name="price_max" onChange={this.handleInputChange} />
                </div>
              </div>
              <div className="row">
                <h6>Time-frame</h6>
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
              <div className="row pb-3">
                <div className="col">
                  <h6>Smoking?</h6>
                  <div className="form-check" onChange={this.handleInputChange}>
                    <input className="form-check-input" type="radio" id="outside" name="smoking_id" value={1} />
                    <label className="form-check-label" htmlFor="outside">
                      Outside is fine
                    </label>
                  </div>
                  <div className="form-check" onChange={this.handleInputChange}>
                    <input className="form-check-input" type="radio" id="anywhere" name="smoking_id" value={2} />
                    <label className="form-check-label" htmlFor="anywhere">
                      Anywhere is fine
                    </label>
                  </div>
                  <div className="form-check" onChange={this.handleInputChange}>
                    <input className="form-check-input" type="radio" id="no-smoking" name="smoking_id" value={3} />
                    <label className="form-check-label" htmlFor="no-smoking">
                      Absolutely not
                    </label>
                  </div>
                </div>
                <div className="col">
                  <h6>Pet-friendly?</h6>
                  <div className="form-check" onChange={this.handleInputChange}>
                    <input className="form-check-input" type="radio" id="outside" name="pet_id" value={1} />
                    <label className="form-check-label" htmlFor="outside">
                      Outside is fine
                    </label>
                  </div>
                  <div className="form-check" onChange={this.handleInputChange}>
                    <input className="form-check-input" type="radio" id="anywhere" name="pet_id" value={2} />
                    <label className="form-check-label" htmlFor="anywhere">
                      Anywhere is fine
                    </label>
                  </div>
                  <div className="form-check" onChange={this.handleInputChange}>
                    <input className="form-check-input" type="radio" id="no-pets" name="pet_id" value={3} />
                    <label className="form-check-label" htmlFor="no-pets">
                      Absolutely not
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <h6>Include people in your search?</h6>
              </div>
              <div className="row pb-3">
                <div className="col form-check" onChange={this.handleInputChange}>
                  <input className="form-check-input" type="radio" id="yes" name="include_people" value="true" />
                  <label className="form-check-label" htmlFor="yes">
                    Yes
                  </label>
                </div>
                <div className="col form-check" onChange={this.handleInputChange}>
                  <input className="form-check-input" type="radio" id="no" name="include_people" value="false" />
                  <label className="form-check-label" htmlFor="no">
                    No
                  </label>
                </div>
              </div>
              <div className="row pt-3">
                <div className="col text-center">
                  <button type="submit" className="btn btn-primary">Let&apos;s go</button>
                </div>
              </div>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

Search.propTypes = {
  history: PropTypes.obj, // eslint-disable-line
};
Search.defaultProps = {
  history: {},
};

export default Search;
