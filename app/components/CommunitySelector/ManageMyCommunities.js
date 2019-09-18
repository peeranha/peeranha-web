import React from 'react';
import { FormattedMessage } from 'react-intl';
import * as routes from 'routes-config';
import { TEXT_PRIMARY } from 'style-constants';

import arrowRightIcon from 'images/arrowRight.svg?inline';

import Span from 'components/Span';
import A from 'components/A';

import messages from 'common-messages';

import { BoxStyled } from './CustomOption';

const Box = BoxStyled.extend`
  height: 44px;
`.withComponent(A);

const ManageMyCommunities = () => (
  <Box to={routes.communities()} href={routes.communities()}>
    <Span color={TEXT_PRIMARY}>
      <img className="mr-2" src={arrowRightIcon} alt="icon" />
      <FormattedMessage {...messages.manageMyComm} />
    </Span>
  </Box>
);

export default React.memo(ManageMyCommunities);
