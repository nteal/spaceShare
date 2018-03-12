import React from 'react';
import Axios from 'axios';
import MediaQuery from 'react-responsive';
import Moment from 'moment';
import Pencil from 'mdi-react/PencilIcon.js';

class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: null,
      month: '',
      day: 0,
      year: 0,
    };
    this.toggleEditing = this.toggleEditing.bind(this);
    this.doneEditing = this.doneEditing.bind(this);
    this.handleMonthEditing = this.handleMonthEditing.bind(this);
    this.handleDayEditing = this.handleDayEditing.bind(this);
    this.handleYearEditing = this.handleYearEditing.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleEditing(event) {
    this.setState({ editing: true });
  }

  doneEditing() {
    this.setState({ editing: null });
  }

  handleMonthEditing(event) {
    const { value } = event.target;
    this.setState({ month: value });
  }

  handleDayEditing(event) {
    const { value } = event.target;
    this.setState({ day: value });
  }

  handleYearEditing(event) {
    const { value } = event.target;
    this.setState({ year: value });
  }

  handleSubmit() {
    const { month, day, year } = this.state;
    const date = new Date(`${month} ${day} ${year}`);
    const formattedDate = Moment(date).toISOString();
    this.props.finalize(this.props.field, formattedDate);
    this.doneEditing();
  }

  render() {
    const { editing, month, day, year } = this.state;
    const { glyph, field, value } = this.props;
    const days = Array.from(new Array(31), (x, i) => i + 1);
    const years = Array.from(new Array(83), (x, i) => i + 1918).reverse();

    let displayed;
    if (editing) {
      displayed = (
        <li className="list-group-item">
          <div className="row">
            <div className="input-group">
              <select 
                value={this.state.month}
                className="custom-select form-control"
                aria-label="Your month of birth"
                onChange={this.handleMonthEditing}
              >
                <option value="Month">Month...</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
              <select 
                value={this.state.day}
                className="custom-select form-control"
                aria-label="Your day of birth"
                onChange={this.handleDayEditing}
              >
                <option value="Day">Day...</option>
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
              <select 
                value={this.state.year}
                className="custom-select form-control"
                aria-label="Your year of birth"
                onChange={this.handleYearEditing}
              >
                <option value="Year">Year...</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <div className="input-group-append">
                <button className="btn btn-outline-secondary pb-0" onClick={this.handleSubmit} type="submit">
                  <i className="material-icons">check</i>
                </button>
                <button className="btn btn-outline-secondary pb-0" onClick={this.doneEditing} type="button">
                  <i className="material-icons">close</i>
                </button>
              </div>
            </div>
          </div>
        </li>
      );
    } else {
      displayed = (
        <li className="list-group-item">
          <div className="row justify-content-between pl-2 pr-1">
            <div className="row pl-2">
              <i className="material-icons sidebar-icon">{glyph}</i>
              {Moment(value).format('MMMM D, YYYY')}
            </div>
            <Pencil className="mdi-btn" onClick={this.toggleEditing} height={20} width={20} fill="#6F5BC0" />
          </div>
        </li>
      );
    }

    return (
      <div>
        {displayed}
      </div>
    );
  }
}

export default DateInput;
