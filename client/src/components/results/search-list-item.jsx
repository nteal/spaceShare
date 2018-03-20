import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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
      smoking, pet, include_people, sleep, personality, age_min, age_max, timestamp, id,
    } = this.props;
    return (
      <li className="media">
        <div className="media-body">
          <div className="row">
            <div className="col justify-content-start">
              <h3 className="mt-0 mb-1">{purpose}</h3>
            </div>
            <div className="col">
              <div className="justify-content-end">
                <h4>{timestamp}</h4>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <h4 className="mt-0 mb-1">{neighborhood}</h4>
            </div>
            <div className="col-2">
              <button className="btn btn-warning" onClick={this.deleteSearch}>Delete this Search</button>
            </div>
          </div>
          <h4 className="mt-0 mb-1">{`\$${price_min} - \$${price_max}`}</h4>
          <div className="row">
            <div className="col-3">
              <h4 className="mt-0 mb-2">{timeline}</h4>
            </div>
            <div className="col-2">
              <Link
                to={
                  {
                    pathname: '/search-results',
                    state: {
                      search_id: id,
                    },
                  }
                }
                refresh="true"
              >
                <button className="btn btn-info">view search results</button>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-2">
              <h5 className="mt-0 mb-1">Smoking:<br />{smoking}</h5>
            </div>
            <div className="col-2 mb-1">
              <h5 className="mt-0 mb-1">Pets:<br />{pet}</h5>
            </div>
          </div>
          <div className="row">
            <div className="col-2 mb-2">
              <h5 className="mt-0 mb-1">Searches for people: {JSON.stringify(include_people)}</h5>
            </div>
            <div className="col-2">
              <h5 className="mt-0 mb-1">{sleep}</h5>
            </div>
            <div className="col-2">
              <h5 className="mt-0 mb-1">{personality}</h5>
            </div>
            <div className="col-2">
              <h5 className="mt-0 mb-1">{`Age Range: ${age_min} - ${age_max}`}</h5>
            </div>
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
};
SearchListItem.defaultProps = {
  purpose: 'Live',
  neighborhood: 'Neighborhood not found',
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
