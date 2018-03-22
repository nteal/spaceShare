import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'moment';
import Briefcase from 'mdi-react/BriefcaseIcon.js';
import Home from 'mdi-react/HomeIcon.js';
import Delete from 'mdi-react/DeleteIcon.js';
import Smoking from 'mdi-react/SmokingIcon.js';
import Paw from 'mdi-react/PawIcon.js';

class SearchListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.deleteSearch = this.deleteSearch.bind(this);
  }
  deleteSearch() {
    this.props.deleteSearch(this.props.id);
  }
  render() {
    const {
      purpose, neighborhood, price_min, price_max, timeline,
      smoking, pet, include_people, sleep, personality, age_min, age_max, timestamp, id, distance, city,
    } = this.props;
    const purposeGlyph = purpose === 'Live' ? (
      <i className="material-icons md-md mr-1">home</i>
    ) : (
      <i className="material-icons md-md mr-1">business</i>
    );
    return (
      <li className="list-group-item">
        <div className="media">
          <div className="media-body">
            <div className="ml-0 pr-1 pl-1 row justify-content-between">
              <div className="row">
                {purposeGlyph}
                <h4 className="h-result mb-0">{purpose}</h4>
              </div>
              <p>{Moment(timestamp).fromNow()}</p>
            </div>
            <div className="row">
              <i className="material-icons md-sm mr-1">location_on</i>
              <h5 className="h-result mb-0">{neighborhood}</h5>
            </div>
            <div className="row justify-content-between">
              <h5 className="h-result mb-0">{`\$${price_min} - \$${price_max}`}</h5>
              <Link to={{ pathname: '/search-results', state: { search_id: id } }}>
                <button className="btn btn-info">Search again</button>
              </Link>
            </div>
            <div className="row">
              <h5 className="h-result mb-0">{timeline}</h5>
            </div>
            <div className="ml-0 pl-1 pr-1 row justify-content-between">
              <div className="row">
                <div className="row ml-0 mr-3">
                  <div className="circle mr-1">
                    <Smoking height={15} width={15} fill="#FFF" />
                  </div> {smoking}
                </div>
                <div className="row ml-0 mr-2">
                  <div className="circle mr-1">
                    <Paw height={15} width={15} fill="#FFF" />
                  </div> {pet}
                </div>
              </div>
              {!include_people && (
                <Delete className="mdi-btn" onClick={this.deleteSearch} height={25} width={25} fill="#6F5BC0" aria-label="delete this search" />
              )}
            </div>
            {include_people && (
              <div className="ml-0 pl-1 pr-1 row justify-content-between">
                <div className="row">
                  <small className="mt-0 mb-1 mr-2">Searches for people: {JSON.stringify(include_people)}</small>
                  <small className="mt-0 mb-1 mr-2">{sleep}</small>
                  <small className="mt-0 mb-1 mr-2">{personality}</small>
                  <small className="mt-0 mb-1 mr-2">{`Age Range: ${age_min} - ${age_max}`}</small>
                </div>
                <Delete className="mdi-btn" onClick={this.deleteSearch} height={25} width={25} fill="#6F5BC0" aria-label="delete this search" />
              </div>
            )}
          </div>
        </div>
      </li>
    );
  }
}

SearchListItem.propTypes = {
  purpose: PropTypes.string,
  neighborhood: PropTypes.string,
  price_min: PropTypes.number,
  price_max: PropTypes.number,
  timeline: PropTypes.string,
  smoking: PropTypes.string,
  pet: PropTypes.string,
  include_people: PropTypes.bool,
  sleep: PropTypes.string,
  personality: PropTypes.string,
  age_min: PropTypes.number,
  age_max: PropTypes.number,
  timestamp: PropTypes.string,
  id: PropTypes.string,
  deleteSearch: PropTypes.func,
  distance: PropTypes.number,
  city: PropTypes.string,
};
SearchListItem.defaultProps = {
  purpose: 'Live',
  neighborhood: 'Neighborhood not found',
  distance: '',
  city: '',
  price_min: 0,
  price_max: 0,
  timeline: 'Long-term',
  smoking: 'Outside is fine',
  pet: 'Anywhere is fine',
  include_people: false,
  sleep: 'Night Owl',
  personality: 'Introvert',
  age_min: 21,
  age_max: 100,
  timestamp: '',
  id: 'not available',
  deleteSearch: () => console.log('deleteSearch is not available'),
};

export default SearchListItem;
