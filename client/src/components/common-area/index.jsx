import React from 'react';
import Todos from './todos.jsx';

class CommonArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    console.log('common area did mount');
  }
  render() {
    return (
      <div>

        <div className="row">
          <div className="media-object">
            <img
              src="https://cdn.vox-cdn.com/thumbor/1XgXyrtwx2tg7FK9gVZfomt7B54=/0x600/cdn.vox-cdn.  com/uploads/chorus_asset/file/46 08573/Screen_20Shot_202015-03-23_20at_201.14.01_20PM.0.png"
              alt="https://kaggle2.blob.core.windows.net/competitions/kaggle/5407/media/housesbanner.png"
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="row">
              <h1>Common Area</h1>
              <button>info</button>
            </div>
          </div>
          <div className="col">
            <div className="row">
              <button>Our Members</button>
            </div>
            <div className="row">
              <button>Our Ground Rules</button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Todos />
          </div>
          <div className="col">
            {/* chat */}
          </div>
        </div>

      </div>
    );
  }
}

export default CommonArea;
