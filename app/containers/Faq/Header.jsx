import React from 'react';
import * as routes from 'routes-config';
import { FormattedMessage } from 'react-intl';

import commonMessages from 'common-messages';

import { TEXT_PRIMARY } from 'style-constants';
import faqPageHeader from 'images/faqPageHeader.svg?inline';
import infoIcon from 'images/icon-information.svg?inline';

import BaseRounded from 'components/Base/BaseRounded';
import { MediumImageStyled } from 'components/Img/MediumImage';
import H3 from 'components/H3';
import Span from 'components/Span';
import A from 'components/A';

import messages from './messages';

const Header = () => (
  <BaseRounded className="d-flex align-items-center justify-content-between mb-3">
    <H3 className="d-flex align-items-end">
      <MediumImageStyled src={faqPageHeader} alt="faqPageHeader" />
      <FormattedMessage {...messages.faq} />
    </H3>

    <A to={routes.support()} className="d-inline-flex align-items-center">
      <img className="mr-1" src={infoIcon} alt="x" />
      <Span color={TEXT_PRIMARY}>
        <FormattedMessage {...commonMessages.support} />
      </Span>
    </A>
  </BaseRounded>
);

export default React.memo(Header);
