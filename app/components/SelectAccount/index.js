import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

const SelectAccountComponent = props => (
  <div>
    <p>
      <FormattedMessage {...messages.header} />
    </p>
    <button
      className="btn btn-secondary w-50 d-block my-2 mx-auto py-2"
      onClick={props.selectAccount}
    >
      <FormattedMessage {...messages.selectIdent} />
    </button>
    <button
      onClick={props.backToOptions}
      className="btn btn-link w-100 d-block mt-4 mx-auto pt-3 border-top-2"
    >
      <small>
        {'< '} <FormattedMessage {...messages.backToOptions} />
      </small>
    </button>
  </div>
);

SelectAccountComponent.propTypes = {
  selectAccount: PropTypes.func.isRequired,
  backToOptions: PropTypes.func.isRequired,
};

export default SelectAccountComponent;
