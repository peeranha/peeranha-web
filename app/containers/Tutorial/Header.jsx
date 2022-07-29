import React from 'react';
import { FormattedMessage } from 'react-intl';

import commonMessages from 'common-messages';

import TutorialIcon from 'icons/Tutorial';

import { MediumIconStyled } from 'components/Icon/MediumIcon';
import H3 from 'components/H3';
import Wrapper from 'components/Header/Simple';

const Header = () => (
  <Wrapper className="mb-to-sm-0 mb-from-sm-3">
    <H3>
      <MediumIconStyled>
        <TutorialIcon size={[38, 38]} />
      </MediumIconStyled>

      <span className="">
        <FormattedMessage {...commonMessages.tutorial} />
      </span>
    </H3>
  </Wrapper>
);

export default React.memo(Header);
