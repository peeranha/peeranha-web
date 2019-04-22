import React from 'react';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import commonMessages from 'common-messages';
import { TEXT_PRIMARY } from 'style-constants';

import createCommunityHeader from 'images/communitiesHeader.svg';
import closeIcon from 'images/closeCircle.svg';

import A from 'components/A';
import H3 from 'components/H3';
import Span from 'components/Span';
import BaseRounded from 'components/Base/BaseRounded';
import { MediumImageStyled } from 'components/Img/MediumImage';

import messages from './messages';

const Header = () => (
  <BaseRounded className="d-flex align-items-center justify-content-between mb-3">
    <H3 className="d-flex align-items-end">
      <MediumImageStyled src={createCommunityHeader} alt="questionIcon" />
      <FormattedMessage {...messages.newCommunity} />
    </H3>

    <A
      to={routes.communities()}
      href={routes.communities()}
      className="d-inline-flex align-items-center"
    >
      <img className="mr-1" src={closeIcon} alt="x" />
      <Span color={TEXT_PRIMARY}>
        <FormattedMessage {...commonMessages.close} />
      </Span>
    </A>
  </BaseRounded>
);

export default React.memo(Header);
