import React from 'react';
import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';
import ImageInput from '../profile/imageInput.jsx';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { editView, images, finalize, spaceId } = this.props;
    const newImages = [];
    if (images.length < 4) {
      const emptyImageSlots = 4 - images.length;
      for (let i = 4 - emptyImageSlots; i < 4; i++) {
        newImages.push(`gallery${i}`);
      }
    }

    let displayed;
    if (editView) {
      displayed = (
        <div>
          <div className="row justify-content-around">
            {images.map((image, i) => (
              <div className="col-12 col-lg-6 pr-5 pl-5 pb-2" key={image.id}>
                <ImageInput
                  category="spaces/"
                  imageId={image.id}
                  userId={image.space_id}
                  field={`gallery${i}`}
                  value={image.name}
                  finalize={finalize}
                  aspectRatio={4 / 3}
                />
              </div>
            ))}
            {newImages.length > 0 && newImages.map((newImage, i) => (
              <div className="col-12 col-lg-6 pr-5 pl-5 pb-2" key={i}>
                <ImageInput
                  editView
                  category="spaces/"
                  userId={spaceId}
                  field={newImage}
                  finalize={finalize}
                />
              </div>
            ))}
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
        <div className="invisible-content-box">
          {displayed}
        </div>
      </div>
    );
  }
}

Gallery.propTypes = {
  editView: PropTypes.bool,
  images: PropTypes.array,
  finalize: PropTypes.func,
  spaceId: PropTypes.number,
};

export default Gallery;
