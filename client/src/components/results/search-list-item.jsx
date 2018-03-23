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
    this.handleSearch = this.handleSearch.bind(this);
  }
  deleteSearch() {
    this.props.deleteSearch(this.props.id);
  }
  handleSearch(searchId) {
    localStorage.setItem('id_search', searchId);
    this.props.history.push({
      pathname: '/search-results',
      state: { id_search: searchId },
    });
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
              <p className="mb-0">{Moment(timestamp).fromNow()}</p>
            </div>
            <div className="row pl-1">
              <h5 className="h-result mb-0">{neighborhood}: {distance}-mile-radius</h5>
            </div>
            <div className="row pl-1 mt-neg-1 justify-content-between align-items-center">
              <h5 className="h-result mb-0">{`\$${new Number(price_min).toLocaleString()} - \$${new Number(price_max).toLocaleString()}`} / {timeline}</h5>
              <button
                className="btn btn-primary"
                onClick={() => { this.handleSearch(id); }}
              >
              Search again
              </button>
            </div>
            <div className="ml-0 pl-1 pr-1 pt-3 row justify-content-between">
              <div className="row">
                <div className="row ml-0 mr-3">
                  <div className="circle mr-1">
                    <Smoking height={15} width={15} fill="#FFF" aria-label="smoking" />
                  </div> {smoking}
                </div>
                <div className="row ml-0 mr-2">
                  <div className="circle mr-1">
                    <Paw height={15} width={15} fill="#FFF" aria-label="pets" />
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
                  <p className="mr-2 mb-0 weight-md">People:</p>
                  <span className="badge badge-primary mt-0 mb-1 mr-2">{sleep}</span>
                  <span className="badge badge-info mt-0 mb-1 mr-2">{personality}</span>
                  <span className="badge badge-success mt-0 mb-1 mr-2">{`Age Range: ${age_min} - ${age_max}`}</span>
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
