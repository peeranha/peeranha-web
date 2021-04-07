import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import peeranhaLogo from 'images/LogoBlack.svg?inline';

import H3 from 'components/H3/index';

import messages from '../messages';

import { P } from '../index';

const EnterIdLeftMenu = () => (
  <div>
    <div className="mb-4">
      <Link to={routes.questions()} href={routes.questions()}>
        <img src={peeranhaLogo} width="180px" alt="Peeranha logo" />
      </Link>
    </div>

    <H3 className="mb-4">
      <FormattedMessage {...messages.deleteFacebookDataTitle} />
    </H3>

    <div className="mb-4">
      <P>
        <FormattedMessage {...messages.pageToCheckFacebookId} />
      </P>
      <P>
        <FormattedMessage {...messages.checkFacebookId} />
      </P>
      <P>
        <FormattedMessage {...messages.ifDataStored} />
      </P>
    </div>
  </div>
);

export default EnterIdLeftMenu;
