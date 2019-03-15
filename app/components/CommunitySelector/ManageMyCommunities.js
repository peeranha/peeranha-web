import React from 'react';
import { FormattedMessage } from 'react-intl';
import * as routes from 'routes-config';

import arrowRightIcon from 'svg/arrowRight';

import Span from 'components/Span';
import Icon from 'components/Icon';
import A from 'components/A';

import messages from 'common-messages';

import { Box } from './CustomOption';

const BoxStyled = Box.extend`
  height: 44px;
`.withComponent(A);

const ManageMyCommunities = /* istanbul ignore next */ () => (
  <BoxStyled to={routes.communities()} href={routes.communities()}>
    <Span color="blue">
      <Icon icon={arrowRightIcon} />
      <FormattedMessage {...messages.manageMyComm} />
    </Span>
  </BoxStyled>
);

export default React.memo(ManageMyCommunities);
