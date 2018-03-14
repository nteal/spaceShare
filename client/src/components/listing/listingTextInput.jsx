import React from 'react';
import Pencil from 'mdi-react/PencilIcon.js';

class ListingTextInput extends React.Component {
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
    this.doneEditing();
  }

  render() {
    const { editing } = this.state;
    const { type, field, placeholder, value, headingSize } = this.props;

    let displayed;
    if (editing) {
      displayed = (
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
      );
    } else {
      let pronoun;
      if (field === 'capacity') {
        pronoun = value > 1 ? 'people' : 'person';
      }
      displayed = (
        <div className="d-flex flex-row align-items-center d-inline-block">
          {field === 'capacity' && (
            <h5 className="mb-0">Space available for {value} {pronoun}</h5>
          )}
          {headingSize === '0' && `$${value}`}
          {headingSize === '1' && (
            <h1 className="mb-0">{value}</h1>
          )}
          {headingSize === '2' && (
            <h2 className="mb-0">{value}</h2>
          )}
          {headingSize === '3' && (
            <h3 className="mb-0">{value}</h3>
          )}
          {headingSize === '4' && (
            <h4 className="mb-0">{value}</h4>
          )}
          {headingSize === '5' && (
            <h5 className="mb-0">{value}</h5>
          )}

          <Pencil className="mdi-btn ml-2" onClick={this.toggleEditing} height={20} width={20} fill="#6F5BC0" />
        </div>
      );
    }

    return (
      <div>
        {displayed}
      </div>
    );
  }
}

export default ListingTextInput;
