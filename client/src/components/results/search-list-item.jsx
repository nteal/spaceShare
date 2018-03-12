import React from 'react';

class SearchListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { purpose, neighborhood, price_min, price_max, timeline, smoking, pet, include_people, sleep, personality, age_min, age_max, timestamp } = this.props;
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
          <h4 className="mt-0 mb-1">{neighborhood}</h4>
          <h4 className="mt-0 mb-1">{`\$${price_min} - \$${price_max}`}</h4>
          <h4 className="mt-0 mb-2">{timeline}</h4>
            <div className="row">
              <div className="col-2">
                <h5 className="mt-0 mb-1">{smoking}</h5>
              </div>
              <div className="col-2">
                <h5 className="mt-0 mb-1">{pet}</h5>
              </div>
            </div>
          <div className="row">
            <div className="col-2">
              <h5 className="mt-0 mb-1">{include_people}</h5>
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
            <div className="justify-content-end">
              <button>delete</button>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default SearchListItem;