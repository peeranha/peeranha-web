import React from 'react';
import { FormattedMessage } from 'react-intl';
import * as routes from 'routes-config';
import { TEXT_PRIMARY } from 'style-constants';

import ArrowRightIcon from 'icons/ArrowRight';

import Span from 'components/Span';
import A from 'components/A';

import messages from 'common-messages';

import { BoxStyled } from './CustomOption';

const Box = BoxStyled.extend`
  height: 40px;
`.withComponent(A);

const ManageMyCommunities = () => (
  <Box to={routes.communities()}>
    <Span color={TEXT_PRIMARY} className="df aic">
      <ArrowRightIcon className="mr-2" stroke="#576FED" />
      <FormattedMessage {...messages.manageMyComm} />
    </Span>
  </Box>
);

export default React.memo(ManageMyCommunities);
