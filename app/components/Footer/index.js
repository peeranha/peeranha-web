/**
 *
 * Footer
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import ChangeLocale from 'containers/ChangeLocale';
import * as routes from 'routes-config';

import messages from './messages';
import Wrapper from './Wrapper';

const Footer = () => (
  <Wrapper className="page-footer font-small blue">
    <div className="footer-copyright text-center py-3">
      <Link to={routes.home()} href={routes.home()}>
        <FormattedMessage {...messages.copyrightSymbol} />
        <FormattedMessage {...messages.currentYear} />
        <FormattedMessage {...messages.header} />
      </Link>
      <ChangeLocale />
    </div>
  </Wrapper>
);

export default Footer;
