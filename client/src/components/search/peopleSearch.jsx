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
      </form>
    );
  }
}

export default PeopleSearch;
