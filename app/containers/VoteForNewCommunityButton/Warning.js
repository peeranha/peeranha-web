import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'common-messages';

import OutlinedButton from 'components/Button/OutlinedButton';
import NavigationButton from 'components/Button/NavigationButton';
import P from 'components/P';

import messages from './messages';

const OutlinedButtonStyled = OutlinedButton.extend`
  min-width: 60px;
`;

const NavigationButtonStyled = NavigationButton.extend`
  min-width: 60px;
`;

const Warning = ({ onClick }) => (
  <div className="py-3 px-4">
    <P className="mb-3" fontSize="14">
      <FormattedMessage {...messages.youCannotChange} />
    </P>
    <div>
      <OutlinedButtonStyled onClick={onClick}>
        <FormattedMessage {...commonMessages.yes} />
      </OutlinedButtonStyled>
      <NavigationButtonStyled isLink>
        <FormattedMessage {...commonMessages.no} />
      </NavigationButtonStyled>
    </div>
  </div>
);

Warning.propTypes = {
  onClick: PropTypes.func,
};

export default React.memo(Warning);
