import React from 'react';
import PropTypes from 'prop-types';
import { LOCATION_FIELD } from 'containers/Profile/constants';

import LocationList from './LocationList';

export const cities = (list, sendProps) =>
  list.map(item => (
    <li
      className="cityItem"
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

export const CitiesList = (showLocationList, sendProps) =>
  showLocationList && sendProps.citiesList ? (
    <LocationList>{cities(sendProps.citiesList, sendProps)}</LocationList>
  ) : null;

function renderLocationField({ input, label, disabled, sendProps }) {
  const { ipfs } = sendProps.profile;
  const showLocationList =
    ipfs &&
    ipfs[LOCATION_FIELD] &&
    !ipfs[LOCATION_FIELD].id &&
    ipfs[LOCATION_FIELD].name;

  return (
    <div>
      <h6>{label}</h6>
      <div className="position-relative mb-0">
        <input
          disabled={disabled}
          {...input}
          autoComplete="off"
          placeholder={label}
          onChange={e => sendProps.getCitiesList(e.target.value)}
          value={ipfs && ipfs[LOCATION_FIELD] && ipfs[LOCATION_FIELD].name}
          className="form-control mb-0 location-field"
          type="text"
        />
        {CitiesList(showLocationList, sendProps)}
      </div>
    </div>
  );
}

renderLocationField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  sendProps: PropTypes.object.isRequired,
};

export default renderLocationField;
