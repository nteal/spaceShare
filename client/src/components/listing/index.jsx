import React from 'react';

class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOwner: false,
    };
  }
  componentDidMount() {
    const spaceId = this.props.location.state ? this.props.location.state.spaceId : 0;
    Axios.get('http://localhost:3000/api/currentListing', {
      params: { spaceId },
    })
      .then((response) => {
        const {
          id,
          name,
          purpose,
          owner_fb_id,
          owner_name,
          cost,
          timeline,
          capacity,
          open,
          description,
          amenities,
          gallery,
        } = response.data;
        this.setState({
          id,
          name,
          purpose,
          owner_fb_id,
          owner_name,
          cost,
          timeline,
          capacity,
          open,
          description,
          amenities,
          gallery,
        });
        if (open) {
          const { neighborhood } = response.data;
          this.setState({ neighborhood });
        } else {
          const { street_address, city, state, zip } = response.data;
          this.setState({ street_address, city, state, zip });
        }
        Axios.get('http://localhost:3003/api/isOwner', {
          params: {
            token: localStorage.getItem('id_token'),
            spaceId: id,
          },
        })
          .then((response) => {
            if (response.data) {
              this.setState({ isOwner: true });
            }
          })
          .catch((error) => {
            console.error('error checking if owner', error);
          });
      })
      .catch((error) => {
        console.error('error getting listing info', error);
      });
  }

  render() {
    return (
      <div>
        {/* listing */}
      </div>
    );
  }
}

export default Listing;
