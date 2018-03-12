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
    const { display_name, url } = this.props;
    this.setState({ 
      editing: true,
      newDisplayName: display_name || 'A display name for your link',
      newValue: url || 'An optional link for you',
    });
  }

  doneEditing() {
    this.setState({ editing: null });
  }

  handleEditing(event) {
    const { value, name } = event.target;
    if (name === 'link') {
      this.setState({ newValue: value });
    } else {
      this.setState({ newDisplayName: value });
    }
  }

  handleSubmit() {
    this.props.finalize(this.props.field, this.state.newDisplayName, this.state.newValue);
    this.doneEditing();
  }

  render() {
    const { editing } = this.state;
    const { display_name, url } = this.props;

    let displayed;
    if (editing) {
      displayed = (
        <li className="list-group-item">
          <div className="row">
            <div className="input-group">
              <input 
                type="text"
                name="display name"
                value={this.state.newDisplayName}
                className="form-control"
                placeholder="A display name for your link"
                aria-label="A display name for your link"
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
            <div className="input-group">
              <input 
                type="url"
                name="link"
                value={this.state.newValue}
                className="form-control"
                placeholder="An optional link for you"
                aria-label="An optional link for you"
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
        </li>
      );
    } else {
      displayed = (
        <li className="list-group-item">
          <div className="row justify-content-between pl-2 pr-1">
            <div className="row pl-2">
              <i className="material-icons sidebar-icon">link</i>
              <a href={url || '#'}>{display_name || 'Add a link!'}</a>
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
