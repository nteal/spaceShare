import React from 'react';
import Axios from 'axios';
import MediaQuery from 'react-responsive';
import Pencil from 'mdi-react/PencilIcon.js';

class ListingDropDown extends React.Component {
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
    if (this.props.field === 'owner_fb_id') {
      const { additionalData } = this.props;
      const newOwner = additionalData.filter(member => `${member.name_first} ${member.name_last}` === this.state.newValue);
      this.props.finalize(this.state.newValue, newOwner[0].fb_id);
    } else {
      this.props.finalize(this.props.field, this.state.newValue);
    }
    this.doneEditing();
  }

  render() {
    const { editing } = this.state;
    const { displayGlyph, field, placeholder, value, options, headingSize } = this.props;
    let mdiGlyph; 
    if (value === 'Live') {
      mdiGlyph = <i className="material-icons md-h3 mr-1">home</i>;
    } else if (value === 'Work') {
      mdiGlyph = <i className="material-icons md-h3 mr-1">business</i>;
    } else if (field === "owner_fb_id") {
      mdiGlyph = <i className="material-icons md-h3 mr-1">star_border</i>;
    }

    let displayed;
    if (editing) {
      displayed = (
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
      );
    } else {
      displayed = (
        <div className="d-flex flex-row align-items-center d-inline-block">
          {displayGlyph && mdiGlyph}
          {headingSize === "0" && value}
          {headingSize === "1" && (
            <h1 className="mb-0">{value}</h1>
          )}
          {headingSize === "2" && (
            <h2 className="mb-0">{value}</h2>
          )}
          {headingSize === "3" && (
            <h3 className="mb-0">{value}</h3>
          )}
          {headingSize === "4" && (
            <h4 className="mb-0">{value}</h4>
          )}
          {headingSize === "5" && (
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

export default ListingDropDown;
