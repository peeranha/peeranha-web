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
      className="btn btn-secondary w-50 d-block mx-auto py-2"
      onClick={props.selectAccount}
    >
      <FormattedMessage {...messages.selectIdent} />
    </button>
    <hr />
    <button
      onClick={props.backToOptions}
      className="btn btn-link w-100 d-block mx-auto"
    >
      <small>
        {'< '} <FormattedMessage {...messages.backToOptions} />
      </small>
    </button>
  </div>
);

SelectAccountComponent.propTypes = {
  selectAccount: PropTypes.func,
  backToOptions: PropTypes.func,
};

export default SelectAccountComponent;
