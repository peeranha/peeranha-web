import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import peeranhaLogo from 'images/LogoBlack.svg?inline';

import H3 from 'components/H3/index';

import messages from '../messages';

import { P } from '../index';

const ConfirmDelLeftMenu = () => (
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
        <FormattedMessage {...messages.completeDeletionPage} />
      </P>
      <P>
        <FormattedMessage {...messages.completeDeletion} />
      </P>
      <P>
        <FormattedMessage {...messages.ifCodeHasExpired} />
      </P>
      <P>
        <FormattedMessage {...messages.contactSupprortTeam} />
        <Link to={routes.supportForm()}>
          <FormattedMessage {...messages.supportTeam} />
        </Link>.
      </P>
    </div>
  </div>
);

export default ConfirmDelLeftMenu;
