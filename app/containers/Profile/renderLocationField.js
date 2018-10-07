import React from 'react';
import PropTypes from 'prop-types';

import LocationList from './LocationList';
import { LOCATION_FIELD } from './constants';

const cities = (list, sendProps) =>
  list.map(item => (
    <li
      role="presentation"
      key={item.geonameId}
      onClick={() =>
        sendProps.chooseLocation(
          item.geonameId,
          `${item.name}, ${item.countryName}`,
        )
      }
    >{`${item.name}, ${item.countryName}`}</li>
  ));

/* eslint-disable */
function renderLocationField({ input, label, sendProps }) {
  const { ipfs } = sendProps.profile;

  return (
    <div>
      <h6>{label}</h6>
      <div className="position-relative mb-0">
        <input
          {...input}
          readOnly={!sendProps.isOwner}
          autoComplete="off"
          placeholder={label}
          onChange={e => sendProps.getCitiesList(e.target.value)}
          value={ipfs[LOCATION_FIELD] && ipfs[LOCATION_FIELD].name}
          className="form-control mb-0"
          type="text"
        />
        {ipfs[LOCATION_FIELD] &&
          !ipfs[LOCATION_FIELD].id &&
          ipfs[LOCATION_FIELD].name && (
          <LocationList>
            {cities(sendProps.citiesList, sendProps)}
          </LocationList>
        )}
      </div>
    </div>
  );
}
/* eslint-enable */

renderLocationField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  sendProps: PropTypes.object.isRequired,
};

export default renderLocationField;
