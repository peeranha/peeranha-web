import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

const ScatterInstaller = props => (
  <div>
    <p>
      <FormattedMessage {...messages.header} />
    </p>
    <h4 className="text-center">
      <a
        href="https://chrome.google.com/webstore/detail/scatter/ammjpmhgckkpcamddpolhchgomcojkle"
        target="_blank"
      >
        Scatter
      </a>
    </h4>
    <button
      className="btn btn-secondary w-50 d-block my-2 mx-auto py-2"
      onClick={props.reloadApp}
    >
      <FormattedMessage {...messages.nextstep} />
    </button>
    <button
      onClick={props.backToOptions}
      className="btn btn-link w-50 d-block my-1 mx-auto py-2"
    >
      <small>
        {'< '} <FormattedMessage {...messages.backToOptions} />
      </small>
    </button>
  </div>
);

ScatterInstaller.propTypes = {
  reloadApp: PropTypes.func.isRequired,
  backToOptions: PropTypes.func.isRequired,
};

export default ScatterInstaller;
