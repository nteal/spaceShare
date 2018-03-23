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
    this.setValue = this.setValue.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.doneEditing = this.doneEditing.bind(this);
    this.handleEditing = this.handleEditing.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidMount() {
    this.setValue();
  }
  setValue() {
    const { value } = this.props;
    this.setState({ value });
  }

  toggleEditing(event) {
    const { value } = this.props;
    this.setState({ editing: true });
    if (value !== 'An optional additional amenity') {
      this.setState({ newValue: value });
    }
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
    this.setState({ value: this.state.newValue }, () => {
      this.doneEditing();
    });
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleSubmit();
    }
  }

  render() {
    const { editing } = this.state;
    const { type, glyph, field, placeholder, value } = this.props;

    let displayed;
    if (editing) {
      displayed = (
        <li className="list-group-item">
          <div className="row">
            <div className="input-group">
              <input 
                type={type}
                name={field}
                value={this.state.newValue}
                className="form-control"
                placeholder={placeholder}
                aria-label={placeholder}
                onChange={this.handleEditing}
                onKeyPress={this.handleKeyPress}
              />
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

export default TextInput;
