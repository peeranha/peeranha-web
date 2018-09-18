/**
 *
 * Footer
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';

import Wrapper from './Wrapper';
import messages from './messages';

const Footer = () => (
  <Wrapper className="page-footer font-small blue">
    <div className="footer-copyright text-center py-3">
      <Link to="/" href="/">
        {messages.copyrightSymbol.defaultMessage}
        {messages.currentYear.defaultMessage}
        {messages.header.defaultMessage}
      </Link>
    </div>
  </Wrapper>
);

export default Footer;
