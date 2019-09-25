import React from 'react';
import * as routes from 'routes-config';
import { FormattedMessage } from 'react-intl';

import commonMessages from 'common-messages';

import { TEXT_PRIMARY } from 'style-constants';
import faqPageHeader from 'images/faqPageHeader.svg?inline';
import infoIcon from 'images/icon-information.svg?inline';

import { MediumImageStyled } from 'components/Img/MediumImage';
import H3 from 'components/H3';
import Span from 'components/Span';
import A from 'components/A';
import Wrapper from 'components/Header/Simple';

import messages from './messages';

const Header = () => (
  <Wrapper className="mb-to-sm-0 mb-from-sm-3">
    <H3>
      <MediumImageStyled src={faqPageHeader} alt="faq-header" />

      <span className="d-none d-md-inline-block">
        <FormattedMessage {...messages.faq} />
      </span>

      <span className="d-inline-block d-md-none text-uppercase">
        <FormattedMessage {...commonMessages.faq} />
      </span>
    </H3>

    <div className="right-panel">
      <A to={routes.support()}>
        <button>
          <img className="mr-1" src={infoIcon} alt="x" />
          <Span color={TEXT_PRIMARY}>
            <FormattedMessage {...commonMessages.support} />
          </Span>
        </button>
      </A>
    </div>
  </Wrapper>
);

export default React.memo(Header);
