import React from 'react';
import Axios from 'axios';
import MediaQuery from 'react-responsive';
import Pencil from 'mdi-react/PencilIcon.js';

class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: null,
      newValue: '',
    };
    this.toggleEditing = this.toggleEditing.bind(this);
    this.doneEditing = this.doneEditing.bind(this);
    this.handleEditing = this.handleEditing.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleEditing(event) {
    this.setState({ editing: true });
  }

  doneEditing() {
    this.setState({ editing: null });
  }

  handleEditing(event) {
    const { value } = event.target;
    this.setState({ newValue: value });
  }

  handleSubmit() {
    this.props.finalize(this.props.field, this.state.newValue);
    this.doneEditing();
  }

  render() {
    const { editing } = this.state;
    const { glyph, field, placeholder, value, options } = this.props;

    let displayed;
    if (editing) {
      displayed = (
        <li className="list-group-item">
          <div className="row">
            <div className="input-group">
              <select 
                value={this.state.newValue}
                className="custom-select form-control"
                aria-label={placeholder}
                onChange={this.handleEditing}
              >
                <option value={placeholder}>{placeholder}...</option>
                {options.map(option => (
                  <option value={option}>{option}</option>
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
              {value}
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

export default DropDown;
