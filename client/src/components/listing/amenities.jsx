import React from 'react';
import MediaQuery from 'react-responsive';
import Amenity from './amenity.jsx';
import DropDown from '../profile/dropDown.jsx';
import TextInput from '../profile/textInput.jsx';

const Amenities = (props) => {
  const { editView, pet, smoking, amenities } = props;

  let display;

  if (editView) {
    const { finalize, finalizeNew, finalizeExisting } = props;
    const newAmenities = [];
    if (amenities.length < 8) {
      const numNew = 8 - amenities.length;
      for (let i = 9 - numNew; i < 9; i++) {
        newAmenities.push(`amenities${i}`);
      }
    }
    display = (
      <ul className="list-group list-group-flush">
        <DropDown
          field="pet"
          glyph="pets"
          type="text"
          placeholder="Your pet policy"
          value={pet}
          options={[
            'Outside is fine',
            'Anywhere is fine',
            'Absolutely not',
          ]}
          finalize={finalize}
        />
        <DropDown
          field="smoking"
          glyph="smoking_rooms"
          type="text"
          placeholder="Your smoking policy"
          value={smoking}
          options={[
            'Outside is fine',
            'Anywhere is fine',
            'Absolutely not',
          ]}
          finalize={finalize}
        />
        {amenities.map((amenity, i) => (
          <TextInput
            field={`amenities${i}`}
            glyph="store"
            type="text"
            placeholder="An amenity you offer"
            value={amenity.text}
            finalize={finalizeExisting}
            key={amenity.id}
          />
        ))}
        {newAmenities.length > 0 && (
          newAmenities.map(newAmenity => (
            <TextInput
              field={newAmenity}
              glyph="store"
              type="type"
              placeholder="An amenity you offer"
              value="An optional additional amenity"
              finalize={finalizeNew}
            />
          ))
        )}
      </ul>
    );
  } else {
    display = (
      <div className="invisible-content-box">
        <ul>
          <li className="pb-1">
            <div className="row">
              <i className="material-icons md-sm sidebar-icon">pets</i>
              <b>Pets: {pet}</b>
            </div>
          </li>
          <li className="pb-1">
            <div className="row">
              <i className="material-icons md-sm sidebar-icon">smoking_rooms</i>
              <b>Smoking: {smoking}</b>
            </div>
          </li>
          {amenities.map(amenity => (
            <Amenity amenity={amenity} key={amenity.id}/>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="content-box">
      <MediaQuery minDeviceWidth={800}>
        <div className="mini-heading-box-top">
          <h5>Amenities</h5>
        </div>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={600}>
        <div className="mini-heading-box-top-mobile">
          <h5>Amenities</h5>
        </div>
      </MediaQuery>
      {display}
    </div>
  );
};

export default Amenities;
