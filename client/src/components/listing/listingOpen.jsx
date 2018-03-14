import React from 'react';
import Pencil from 'mdi-react/PencilIcon.js';
import DoorOpen from 'mdi-react/DoorOpenIcon.js';
import Door from 'mdi-react/DoorIcon.js';

class ListingOpen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: null,
      newValue: null,
      edited: false,
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
    this.setState({ edited: true });
    this.doneEditing();
  }

  render() {
    const { editing, edited, newValue } = this.state;
    const { field, value, headingSize, editView } = this.props;
    let mdiGlyph;
    if (value) {
      mdiGlyph = <DoorOpen className="ml-1 mr-2" height={20} width={20} fill="#000" />;
    } else {
      mdiGlyph = <Door className="ml-1 mr-2" height={20} width={20} fill="#000" />;
    }

    let openOrClosed = value ? 'Open' : 'Closed';

    let displayed;
    if (editing) {
      displayed = (
        <div className="row">
          <div className="pl-2 form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="open"
              id="open-true"
              value
              onChange={this.handleEditing}
              />
            <label className="form-check-label" htmlFor="open-true">Open</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="open"
              id="open-false"
              value={false}
              onChange={this.handleEditing}
            />
            <label className="form-check-label" htmlFor="open-false">Closed</label>
          </div>
          <button className="btn btn-outline-secondary btn-sm mr-2 pb-0" onClick={this.handleSubmit} type="submit">
            <i className="material-icons md-xs">check</i>
          </button>
          <button className="btn btn-outline-secondary btn-sm pb-0" onClick={this.doneEditing} type="button">
            <i className="material-icons md-xs">close</i>
          </button>
        </div>
      );
    } else if (edited && !editing) {
      if (newValue === false) {
        openOrClosed = 'Closed';
        mdiGlyph = <Door className="ml-1 mr-2" height={20} width={20} fill="#000" />;
      } else {
        openOrClosed = 'Open';
        mdiGlyph = <DoorOpen className="ml-1 mr-2" height={20} width={20} fill="#000" />;
      }
      displayed = (
        <div className="d-flex flex-row align-items-center d-inline-block">
          {mdiGlyph}
          {headingSize === "0" && openOrClosed}
          {headingSize === "1" && (
            <h1 className="mb-0">{!edited && openOrClosed}{edited && editedOpenOrClosed}</h1>
          )}
          {headingSize === "2" && (
            <h2 className="mb-0">{openOrClosed}</h2>
          )}
          {headingSize === "3" && (
            <h3 className="mb-0">{openOrClosed}</h3>
          )}
          {headingSize === "4" && (
            <h4 className="mb-0">{openOrClosed}</h4>
          )}
          {headingSize === "5" && (
            <h5 className="mb-0">{openOrClosed}</h5>
          )}
          {editView && (
            <Pencil className="mdi-btn ml-2" onClick={this.toggleEditing} height={20} width={20} fill="#6F5BC0" />
          )}
        </div>
      );
    } else {
      displayed = (
        <div className="d-flex flex-row align-items-center d-inline-block">
          {mdiGlyph}
          {headingSize === "0" && openOrClosed}
          {headingSize === "1" && (
            <h1 className="mb-0">{!edited && openOrClosed}{edited && editedOpenOrClosed}</h1>
          )}
          {headingSize === "2" && (
            <h2 className="mb-0">{openOrClosed}</h2>
          )}
          {headingSize === "3" && (
            <h3 className="mb-0">{openOrClosed}</h3>
          )}
          {headingSize === "4" && (
            <h4 className="mb-0">{openOrClosed}</h4>
          )}
          {headingSize === "5" && (
            <h5 className="mb-0">{openOrClosed}</h5>
          )}
          {editView && (
            <Pencil className="mdi-btn ml-2" onClick={this.toggleEditing} height={20} width={20} fill="#6F5BC0" />
          )}
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

export default ListingOpen;
