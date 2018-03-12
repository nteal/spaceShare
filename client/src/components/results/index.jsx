import React from 'react';

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { heading, people, places } = this.props;
    return (
      <div>
        <div className="row mb-2 mt-2">
          <div className="col-10">
            <h1>{heading}</h1>
          </div>
          <div className="col-2">
            <button>New Search</button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <ul className="nav nav-tabs" role="tablist">
              <li className="nav-item">
                <a className="nav-link" id="peopletab" data-toggle="tab" href="#people" role="tab">People</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="placestab" data-toggle="tab" href="#places" role="tab">Places</a>
              </li>
            </ul>
          </div>
          <div className="col">
          <ul className="nav nav-tabs justify-content-end" role="tablist">
            <li className="nav-item">
              <a className="nav-link" href="/saved-searches">Past Searches</a>
            </li>
          </ul>
          </div>
        </div>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="people" role="tabpanel">{people}</div>
          <div className="tab-pane fade" id="places" role="tabpanel">{places}</div>
        </div>
      </div>
    );
  }
}

export default Results;
