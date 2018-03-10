import React from 'react';

class PeopleSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sleep: 'Early bird',
      personality: 'Introvert',
      age_min: '0',
      age_max: '100',
    };
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
    console.log(`min: ${min}\nmax: ${max}`);
    if (min <= max) {
      this.setState({
        min_cost: min,
        max_cost: max,
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
    if (this.isValidAgeRange()) {
      // Axios.post('/api/new-search', this.state);
    } else {
      window.alert('Please enter a valid AGE range wherein\nleft-number <= right-number');
    }
    event.preventDefault();
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
            <input className="form-check-input" type="radio" id="day" name="sleep" value="Early bird" />
            <label className="form-check-label" htmlFor="day">
              Early bird
            </label>
          </div>
          <div className="col-2 form-check" onChange={this.handleInputChange}>
            <input className="form-check-input" type="radio" id="night" name="sleep" value="Early bird" />
            <label className="form-check-label" htmlFor="night">
              Night Owl
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-2 form-check" onChange={this.handleInputChange}>
            <input className="form-check-input" type="radio" id="introvert" name="personality" value="Introvert" />
            <label className="form-check-label" htmlFor="introvert">
              Introvert
            </label>
          </div>
          <div className="col-2 form-check" onChange={this.handleInputChange}>
            <input className="form-check-input" type="radio" id="extrovert" name="personality" value="Extrovert" />
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
