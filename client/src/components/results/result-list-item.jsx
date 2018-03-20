import React from 'react';
import PropTypes from 'prop-types';

class ResultListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.moreInfo = this.moreInfo.bind(this);
  }
  moreInfo() {
    if (this.props.id) {
      if (this.props.tag === 'spaceId') {
        this.props.history.push({
          pathname: this.props.link,
          state: { spaceId: this.props.id },
        });
      } else {
        this.props.history.push({
          pathname: this.props.link,
          state: { userId: this.props.id },
        });
      }
    } else {
      window.alert('No information available');
    }
  }
  render() {
    const {
      image, name, financial, about, description, button_heading,
    } = this.props;
    return (
      <li className="media mb-3">
        <img className="mr-3 search-result-img" src={image} alt="" />
        <div className="media-body">
          <div className="row">
            <div className="col">
              <button className="btn btn-info mt-0 mb-1" onClick={this.moreInfo}>{button_heading}</button>
              <h4 className="mt-0 mb-1">{name}</h4>
              <h5 className="mt-0 mb-1">{financial}</h5>
              <h5 className="mt-0 mb-2">{about}</h5>
            </div>
            <div className="col">
              <p className="mt-0 mb-1">{description}</p>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

ResultListItem.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  financial: PropTypes.string,
  about: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string,
  link: PropTypes.string,
  history: PropTypes.object,
  tag: PropTypes.string,
  button_heading: PropTypes.string,
  key: PropTypes.number,
};
ResultListItem.defaultProps = {
  image: 'https://s3.amazonaws.com/spaceshare-sfp/spaces/space.jpg',
  name: 'No results at this time',
  financial: '',
  about: '',
  description: '',
  id: '',
  link: '',
  history: {},
  tag: 'spaceId',
  button_heading: 'more info',
  key: 1,
};

export default ResultListItem;
