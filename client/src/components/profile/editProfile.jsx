import React from 'react';
import Axios from 'axios';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      about: '',
      image_url: '',
      phone: 0,
      gender: '',
      personality: '',
      sleep: '',
      profession: '',
    };
  }
  componentDidMount() {
    Axios.get('http://localhost:3003/api/currentUser', {
      params: { JWT: localStorage.getItem('token_id') },
    })
      .then((response) => {
        this.setState({
          id: response.data.id,
          about: response.data.about,
          image_url: response.data.image_url,
          phone: response.data.phone,
          gender: response.data.gender,
          personality: response.data.personality,
          sleep: response.data.sleep,
          profession: response.data.profession,
        });
      })
      .catch((error) => {
        console.error('error getting user profile data for editing', error);
      });
  }

  render() {
    return (
      <div>
        {/* edit profile */}
      </div>
    );
  }
}

export default EditProfile;
