import React from 'react';
import PropTypes from 'prop-types';
import Smoking from 'mdi-react/SmokingIcon.js';
import Paw from 'mdi-react/PawIcon.js';
import Brightness4 from 'mdi-react/Brightness4Icon.js';
import Emoticon from 'mdi-react/EmoticonIcon.js';

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
      num, tag, image, name, badgeOne, badgeTwo, button_heading, // shared by both people and places
      profession, // people
      cost, timeline, neighborhood, city, // places
    } = this.props;

    const lineTwo = tag === 'userId' ? profession : `$${cost} / ${timeline}`;
    const glyphOne = tag === 'userId' ? (
      <Brightness4 className="mr-1" fill="#000" aria-label="sleeping habit" />
    ) : (
      <Smoking className="mr-1" fill="#000" aria-label="smoking" />
    );
    const glyphTwo = tag === 'userId' ? (
      <Emoticon className="mr-1" fill="#000" aria-label="personality" />
    ) : (
      <Paw className="mr-1" fill="#000" aria-label="pets" />
    );

    return (
      <li className="list-group-item pl-4 pr-4">
        <div className="media">
          <h2 className="mr-2">{num + 1}.</h2>
          <img className="mr-3 search-result-img" src={image} alt="" />
          <div className="media-body">
            <div className="col">
              <div className="row justify-content-between">
                <h4 className="h-result mt-0 mb-0">{name}</h4>
                <button className="btn btn-primary mt-0 mb-1" onClick={this.moreInfo}>{button_heading}</button>
              </div>
              <div className="row mt-neg-1">
                <h5 className="h-result mb-0">{lineTwo}</h5>
              </div>
              {tag === 'spaceId' && (
                <div className="row">
                  <h5 className="h-result mb-0">
                    {neighborhood && `${neighborhood}, `} {city}
                  </h5>
                </div>
              )}
              <div className="row pt-3">
                {glyphOne}<p className="mb-0 mr-3">{badgeOne}</p>
                {glyphTwo}{badgeTwo}
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

ResultListItem.propTypes = {
  num: PropTypes.number,
  image: PropTypes.string,
  name: PropTypes.string,
  badgeOne: PropTypes.string,
  badgeTwo: PropTypes.string,
  profession: PropTypes.string,
  cost: PropTypes.string,
  timeline: PropTypes.string,
  neighborhood: PropTypes.string,
  city: PropTypes.string,
  id: PropTypes.string,
  link: PropTypes.string,
  history: PropTypes.object,
  tag: PropTypes.string,
  button_heading: PropTypes.string,
};
ResultListItem.defaultProps = {
  num: 0,
  image: 'https://s3.amazonaws.com/spaceshare-sfp/spaces/space.jpg',
  name: 'No results at this time',
  badgeOne: '',
  badgeTwo: '',
  profession: '',
  cost: '',
  timeline: '',
  neighborhood: '',
  city: '',
  id: '',
  link: '',
  history: {},
  tag: 'spaceId',
  button_heading: 'More info',
};

export default ResultListItem;
