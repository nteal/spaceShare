import React from 'react';
import Axios from 'axios';
import MediaQuery from 'react-responsive';
import Pencil from 'mdi-react/PencilIcon.js';

class TextInput extends React.Component {
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
    const { glyph, field, placeholder, value } = this.props;

    let displayed;
    if (editing) {
      displayed = (
        <div className="input-group">
          <input 
            type="text"
            name={field}
            value={this.state.newValue}
            className="form-control"
            placeholder={placeholder}
            aria-label={placeholder}
            onChange={this.handleEditing}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" onClick={this.handleSubmit} type="submit">
              <i className="material-icons">check</i>
            </button>
            <button className="btn btn-outline-secondary" onClick={this.doneEditing} type="button">
              <i className="material-icons">close</i>
            </button>
          </div>
        </div>
      );
    } else {
      displayed = (
        <li className="list-group-item">
          <div className="row justify-content-between">
            <span>
              <i className="material-icons sidebar-icon">{glyph}</i>
              {value}
            </span>
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

export default TextInput;
