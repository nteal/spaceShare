import React from 'react';
import PropTypes from 'prop-types';
import ReactS3Uploader from 'react-s3-uploader';
import Pencil from 'mdi-react/PencilIcon.js';

class ImageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: null,
      newValue: '',
      displayImg: '',
      changed: false,
    };

    this.toggleEditing = this.toggleEditing.bind(this);
    this.doneEditing = this.doneEditing.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { editView } = this.props;
    if (editView) {
      this.toggleEditing();
    }
  }

  onDrop(acceptedFile) {
    this.setState({
      newValue: acceptedFile.filename,
      displayImg: acceptedFile.publicUrl,
      changed: true,
    }, () => {
      console.log(acceptedFile);
      this.handleSubmit();
    });
  }

  handleSubmit() {
    const { newValue } = this.state;
    this.props.finalize(this.props.field, `https://spaceshare-sfp.s3.amazonaws.com/${newValue}`);
    this.doneEditing();
  }

  doneEditing() {
    this.setState({ editing: null });
  }

  toggleEditing() {
    this.setState({ editing: true });
  }

  render() {
    const { placeholder, category, imageId, userId, field, value } = this.props;

    const { editing, displayImg, changed } = this.state;
    let displayed;
    if (editing) {
      displayed = (
        <div className="content-box image-selection-box">
          <div className="pl-2 pr-2 pb-5 pt-2">
            <div className="row justify-content-end mr-0 pb-2">
              <button
                className="btn btn-outline-light btn-sm pb-0"
                onClick={this.doneEditing}
                type="button"
              >
                <i className="material-icons md-sm">close</i>
              </button>
            </div>
            <h5 className="text-center mb-3">
              {placeholder}
            </h5>
            <ReactS3Uploader
              className="form-control image-select"
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
          </div>
        </div>
      );
    } else {
      displayed = (
        <div>
          {changed && (
            <img
              src={displayImg}
              alt="your uploaded file"
              className="img-fluid img-thumbnail"
            />
          )}
          {!changed && (
            <img
              src={value}
              alt="your uploaded file"
              className="img-fluid img-thumbnail"
            />
          )}
          <button className="btn btn-primary btn-block mt-2 mb-2" onClick={this.toggleEditing}>
            <div className="row justify-content-between pl-2 mr-0">
              Change image
              <Pencil className="mdi-btn-alt" height={20} width={20} fill="#FFF" />
            </div>
          </button>
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

ImageInput.propTypes = {
  placeholder: PropTypes.string,
  category: PropTypes.string,
  imageId: PropTypes.number,
  userId: PropTypes.number,
  field: PropTypes.string,
  value: PropTypes.string,
  editView: PropTypes.bool,
  finalize: PropTypes.func,
};

ImageInput.defaultProps = {
  placeholder: 'Upload an image!',
  category: 'spaces/',
  imageId: 0,
  userId: null,
  field: null,
  value: 'http://vectips.com/wp-content/uploads/2017/04/14-astronaut-flat.jpg',
  editView: false,
  finalize: null,
};

export default ImageInput;
