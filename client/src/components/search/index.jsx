import React from 'react';
import PeopleSearch from './peopleSearch.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: {
        purpose: 'live',
        location: '',
        min_cost: '0.00',
        max_cost: '1,000,000.00',
        timeline: 'long-term',
        smoking: 'outside is fine',
        pet: 'anywhere is fine',
        people: true,
      },
    };
  }
  componentDidMount() {
    console.log('new search did mount');
  }
  render() {
    return (
      <form>
        <div className="row">
          <h1>New Search</h1>
        </div>
        <div className="row">
          <h3>Purpose</h3>
        </div>
        <div className="row">
          <div className="col-2 form-check">
            <input className="form-check-input" type="radio" id="work" name="purpose" value="work" />
            <label className="form-check-label" htmlFor="work">
              Work
            </label>
          </div>
          <div className="col-2 form-check">
            <input className="form-check-input" type="radio" id="live" name="purpose" value="live" checked />
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
            <input class="form-control" type="text" placeholder="" />
          </div>
        </div>
        <div className="row">
          <h3>Budget</h3>
        </div>
        <div className="row">
        <div className="col-3">
            <input class="form-control" type="text" placeholder="$000.00" />
        </div>
        <div className="col-1 text-center">
        <h6>to</h6>
        </div>
        <div className="col-3">
          <input class="form-control" type="text" placeholder="$000.00" />
        </div>
        </div>
        <div className="row">
          <h3>Timeframe</h3>
        </div>
        <div className="row">
          <div className="col-2 form-check">
            <input className="form-check-input" type="radio" id="daily" name="timeframe" value="daily" />
            <label className="form-check-label" htmlFor="daily">
              Daily
            </label>
          </div>
          <div className="col-2 form-check">
            <input className="form-check-input" type="radio" id="weekly" name="timeframe" value="weekly" />
            <label className="form-check-label" htmlFor="weekly">
              Weekly
            </label>
          </div>
          <div className="col-2 form-check">
            <input className="form-check-input" type="radio" id="monthly" name="timeframe" value="monthly" />
            <label className="form-check-label" htmlFor="monthly">
              Monthly
            </label>
          </div>
          <div className="col-2 form-check">
            <input className="form-check-input" type="radio" id="long-term" name="timeframe" value="long-term" checked />
            <label className="form-check-label" htmlFor="long-term">
              Long-term
            </label>
          </div>
        </div>
        <div className="row">
          <h3>Smoking?</h3>
        </div>
        <div className="row">
          <div className="col-3 form-check">
            <input className="form-check-input" type="radio" id="outside" name="smoking" value="outside is fine" checked />
            <label className="form-check-label" htmlFor="outside">
              Outside is fine
            </label>
          </div>
          <div className="col-3 form-check">
            <input className="form-check-input" type="radio" id="anywhere" name="smoking" value="anywhere is fine" />
            <label className="form-check-label" htmlFor="anywhere">
              Anywhere is fine
            </label>
          </div>
          <div className="col-3 form-check">
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
          <div className="col-3 form-check">
            <input className="form-check-input" type="radio" id="outside" name="pets" value="outside is fine" />
            <label className="form-check-label" htmlFor="outside">
              Outside is fine
            </label>
          </div>
          <div className="col-3 form-check">
            <input className="form-check-input" type="radio" id="anywhere" name="pets" value="anywhere is fine" checked />
            <label className="form-check-label" htmlFor="anywhere">
              Anywhere is fine
            </label>
          </div>
          <div className="col-3 form-check">
            <input className="form-check-input" type="radio" id="no-pets" name="pets" value="absolutely not" />
            <label className="form-check-label" htmlFor="no-pets">
              Absolutely not
            </label>
          </div>
        </div>
        <div className="row">
          <h3>Include people in your search?</h3>
        </div>
        <div className="row">
          <div className="col-2 form-check">
            <input className="form-check-input" type="radio" id="yes" name="people" value="yes" checked />
            <label className="form-check-label" htmlFor="yes">
              Yes
            </label>
          </div>
          <div className="col-2 form-check">
            <input className="form-check-input" type="radio" id="no" name="people" value="no" />
            <label className="form-check-label" htmlFor="no">
              No
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-8 text-center">
            <button className="btn btn-outline-primary">Let's go</button>
          </div>
        </div>
        {/* if conditional is meet: */}
        <PeopleSearch />
      </form>
    );
  }
}

export default Search;
