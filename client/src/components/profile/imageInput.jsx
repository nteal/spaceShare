import React from 'react';
import ReactS3Uploader from 'react-s3-uploader';
import Pencil from 'mdi-react/PencilIcon.js';

class ImageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: null,
      newValue: '', 
    };
    this.toggleEditing = this.toggleEditing.bind(this);
    this.doneEditing = this.doneEditing.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleEditing(event) {
    this.setState({ editing: true });
  }

  doneEditing() {
    this.setState({ editing: null });
  }

  onDrop(acceptedFile) {
    this.setState({ newValue: acceptedFile }, () => {
      console.log(acceptedFile);
    });
  }
  
  handleSubmit() {
    const { filename, publicUrl } = this.state.newValue;
    this.props.finalize(this.props.field, publicUrl, filename);
    this.doneEditing();
  }

  render() {
    const { category, imageId, userId, field, value } = this.props;
    const { editing } = this.state;
    let displayed;
    if (editing) {
      displayed = (
        <div className="content-box">
          <ReactS3Uploader
            signingUrl="/s3/sign"
            signingUrlMethod="GET"
            accept="image/*"
            s3path={category}
            scrubFilename={
              filename =>
                filename.replace(/[^]*/, `${userId}_${field}_${imageId}`)
            }
            multiple={false}
            onFinish={this.onDrop}
          />
          <div className="row justify-content-end mr-0">
            <button
              className="btn btn-outline-secondary btn-sm pb-0"
              onClick={this.handleSubmit}
              type="submit"
            >
              <i className="material-icons">check</i>
            </button>
            <button
              className="btn btn-outline-secondary btn-sm pb-0 ml-1"
              onClick={this.doneEditing}
              type="button"
            >
              <i className="material-icons">close</i>
            </button>
          </div>
        </div>
      );
    } else {
      displayed = (
        <div>
          <img
            src={value}
            alt="user profile"
            className="user-profile-pic"
          />
          <div className="row justify-content-end mr-0 pr-1">
            <Pencil
              className="mdi-btn"
              onClick={this.toggleEditing}
              height={30}
              width={30}
              fill="#6F5BC0"
            />
          </div>
        </div>
      );
    }

    return (
      <div>
        {displayed}
      </div>
    )
  }
}

export default ImageInput;