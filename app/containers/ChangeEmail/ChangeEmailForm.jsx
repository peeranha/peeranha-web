import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import H4 from 'components/H4';
import letterCompleteImg from 'images/EmailComplete.svg?inline';

const ChangeEmailForm = () => (
  <div>
    <H4 className="text-center">
      <FormattedMessage id={messages.excellent.id} />
    </H4>
    <div className="text-center pb-3" css={{ color: 'var(--color-gray-dark)' }}>
      <FormattedMessage id={messages.excellentText.id} />
    </div>

    <div className="text-center">
      <img className="pb-3" src={letterCompleteImg} alt="check your email" />
    </div>
  </div>
);

export default ChangeEmailForm;
