import React from 'react';
import PropTypes from 'prop-types';

const SelectAccountComponent = props => (
  <div>
    <p>Scatter account was not selected.</p>
    <button
      className="btn btn-secondary w-50 d-block my-2 mx-auto py-2"
      onClick={props.selectAccount}
    >
      Select identity
    </button>
    <button
      onClick={props.backToOptions}
      className="btn btn-link w-100 d-block mt-4 mx-auto pt-3 border-top-2"
    >
      <small>{'< '} Back to options</small>
    </button>
  </div>
);

SelectAccountComponent.propTypes = {
  selectAccount: PropTypes.func.isRequired,
  backToOptions: PropTypes.func.isRequired,
};

export default SelectAccountComponent;
