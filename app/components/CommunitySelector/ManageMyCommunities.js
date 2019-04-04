import React from 'react';
import { FormattedMessage } from 'react-intl';
import * as routes from 'routes-config';

import arrowRightIcon from 'svg/arrowRight';

import Span from 'components/Span';
import Icon from 'components/Icon';
import A from 'components/A';

import messages from 'common-messages';

import { BoxStyled } from './CustomOption';

const Box = BoxStyled.extend`
  height: 44px;
`.withComponent(A);

const ManageMyCommunities = /* istanbul ignore next */ () => (
  <Box to={routes.communities()} href={routes.communities()}>
    <Span color="blue">
      <Icon icon={arrowRightIcon} />
      <FormattedMessage {...messages.manageMyComm} />
    </Span>
  </Box>
);

export default React.memo(ManageMyCommunities);
