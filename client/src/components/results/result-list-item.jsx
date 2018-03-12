import React from 'react';
import { Link} from 'react-router-dom';

class ResultListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { image, name, financial, about, description, id, link } = this.props;
    return (
      <li className="media">
        <img className="mr-3" src={image} alt="Generic placeholder image" />
        <div className="media-body">
          <Link to={link}>
            <h4 className="mt-0 mb-1">{name}</h4>
          </Link>
          <h5 className="mt-0 mb-1">{financial}</h5>
          <h5 className="mt-0 mb-2">{about}</h5>
          <p className="mt-0 mb-1">{description}</p>
        </div>
      </li>
    );
  }
}

export default ResultListItem;