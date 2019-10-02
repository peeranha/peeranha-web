import React from 'react';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import commonMessages from 'common-messages';
import { TEXT_PRIMARY } from 'style-constants';

import createCommunityHeader from 'images/communitiesHeader.svg?inline';
import closeIcon from 'images/closeCircle.svg?inline';

import A from 'components/A';
import H3 from 'components/H3';
import Span from 'components/Span';
import Wrapper from 'components/Header/Simple';
import { MediumImageStyled } from 'components/Img/MediumImage';

import messages from './messages';

export const Header = () => (
  <Wrapper className="mb-to-sm-0 mb-from-sm-3">
    <H3>
      <MediumImageStyled src={createCommunityHeader} alt="create-community" />
      <FormattedMessage {...messages.newCommunity} />
    </H3>

    <div className="right-panel">
      <A to={routes.communities()}>
        <button>
          <img className="mr-1" src={closeIcon} alt="x" />
          <Span color={TEXT_PRIMARY}>
            <FormattedMessage {...commonMessages.close} />
          </Span>
        </button>
      </A>
    </div>
  </Wrapper>
);

export default React.memo(Header);
