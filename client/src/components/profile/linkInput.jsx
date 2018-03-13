import React from 'react';
import Axios from 'axios';
import MediaQuery from 'react-responsive';
import Pencil from 'mdi-react/PencilIcon.js';

class LinkInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: null,
      newDisplayName: '',
      newValue: '',
    };
    this.toggleEditing = this.toggleEditing.bind(this);
    this.doneEditing = this.doneEditing.bind(this);
    this.handleEditing = this.handleEditing.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleEditing(event) {
    const { display, url } = this.props;
    this.setState({ 
      editing: true,
      newDisplayName: display || '',
      newValue: url || '',
    });
  }

  doneEditing() {
    this.setState({ editing: null });
  }

  handleEditing(event) {
    const { value, name } = event.target;
    if (name === 'link') {
      this.setState({ newValue: value });
    } else if (name === 'display') {
      this.setState({ newDisplayName: value });
    }
  }

  handleSubmit() {
    this.props.finalize(this.props.field, this.state.newDisplayName, this.state.newValue);
    this.doneEditing();
  }

  render() {
    const { editing } = this.state;
    const { display, url } = this.props;

    let displayed;
    if (editing) {
      displayed = (
        <li className="list-group-item">
          <div className="row">
            <input 
              type="text"
              name="display"
              value={this.state.newDisplayName}
              className="form-control"
              placeholder="A display name for your link"
              aria-label="A display name for your link"
              onChange={this.handleEditing}
            />
          </div>
          <div className="row pt-1">
            <input 
              type="url"
              name="link"
              value={this.state.newValue}
              className="form-control"
              placeholder="The URL of your link"
              aria-label="The URL of your link"
              onChange={this.handleEditing}
            />
          </div>
          <div className="row pt-1 justify-content-end">
            <button className="btn btn-outline-secondary btn-sm pb-0 mr-1" onClick={this.handleSubmit} type="submit">
              <i className="material-icons md-xs">check</i>
            </button>
            <button className="btn btn-outline-secondary btn-sm pb-0" onClick={this.doneEditing} type="button">
              <i className="material-icons md-xs">close</i>
            </button>
          </div>
        </li>
      );
    } else {
      displayed = (
        <li className="list-group-item">
          <div className="row justify-content-between pl-2 pr-1">
            <div className="row pl-2">
              <i className="material-icons sidebar-icon">link</i>
              <a href={url || '#'}>{display || 'An optional link for you!'}</a>
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

export default LinkInput;
