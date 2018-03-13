import React from 'react';
import MediaQuery from 'react-responsive';
import Pencil from 'mdi-react/PencilIcon.js';
import ImageImport from '../profile/imageInput.jsx';

class Gallery extends React.Component {
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
    this.setState({ 
      editing: true,
      newValue: this.props.value,
    });
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
    const { editView, images } = this.props;
    const { editing } = this.state;

    let displayed;
    if (editing) {
      displayed = (
        <div>
          <div className="row">
            {images.map((image, i) => (
              <ImageImport
                category="spaces"
                imageId="image.id"
                userId="image.space_id"
                field={`gallery${i}`}
                value={image.name}
              />
            ))}
          </div>
          <div className="row justify-content-end mr-0">
            <button className="btn btn-outline-secondary pb-0 mr-2" onClick={this.handleSubmit} type="submit">
              <i className="material-icons">check</i>
            </button>
            <button className="btn btn-outline-secondary pb-0" onClick={this.doneEditing} type="button">
              <i className="material-icons">close</i>
            </button>
          </div>
        </div>
      );
    } else {
      displayed = (
        <div className="row">
          {images.map(image => (
            <div className="col-12 col-lg-6" key={image.id}>
              <img
                className="img-fluid img-thumbnail"
                src={image.name}
                alt="this space"
              />
            </div>
          ))}
        </div>
      );
    }
    return (
      <div className="content-box">
        <MediaQuery minDeviceWidth={800}>
          <div className="mini-heading-box-top">
            <h5>More Images</h5>
          </div>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={600}>
          <div className="mini-heading-box-top-mobile">
            <h5>More Images</h5>
          </div>
        </MediaQuery>
        <MediaQuery minDeviceWidth={800}>
          {editView && (
            <div className="row justify-content-end mr-0 pr-3">
              <Pencil className="mdi-btn" onClick={this.toggleEditing} height={20} width={20} fill="#6F5BC0" />
            </div>
          )}
        </MediaQuery>
        <MediaQuery maxDeviceWidth={600}>
          {editView && (
            <div className="row justify-content-end mr-0 mt-0 pt-1 pr-1">
              <Pencil className="mdi-btn" onClick={this.toggleEditing} height={20} width={20} fill="#6F5BC0" />
            </div>
          )}
        </MediaQuery>
        <div className="invisible-content-box">
          {displayed}
        </div>
      </div>
    );
  }
}

export default Gallery;
