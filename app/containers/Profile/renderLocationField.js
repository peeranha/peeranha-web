import React from 'react';
import PropTypes from 'prop-types';

import LocationList from './LocationList';
import { LOCATION_FIELD } from './constants';

const locationList = sendProps =>
  sendProps.map(item => (
    <li
      key={item.geonameId}
      onClick={() =>
        sendProps.cityChoiceAction(
          item.geonameId,
          `${item.name}, ${item.countryName}`,
        )
      }
      role="presentation"
    >
      {`${item.name}, ${item.countryName}`}
    </li>
  ));

function renderLocationField({ input, label, sendProps }) {
  const { id, name } = sendProps.profile.ipfs[LOCATION_FIELD];

  return (
    <div>
      <h6>{label}</h6>
      <div className="position-relative mb-0">
        <input
          {...input}
          onChange={e => sendProps.getLocation(e.target.value)}
          value={name}
          className="form-control mb-0"
          type="text"
        />
        {!id && name && <LocationList>{locationList(sendProps)}</LocationList>}
      </div>
    </div>
  );
}

renderLocationField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  sendProps: PropTypes.object.isRequired,
};

export default renderLocationField;
