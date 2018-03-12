import React from 'react';
import MediaQuery from 'react-responsive';

const Gallery = (props) => {
  const { images } = props;
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
        <div className="row">
          {images.map(image => (
            <div className="col-12 col-lg-6">
              <img
                className="img-fluid img-thumbnail"
                src={`https://spaceshare-sfp.s3.amazonaws.com/spaces/${image.name}`}
                alt="this space"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;