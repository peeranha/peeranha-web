import React from 'react';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import commonMessages from 'common-messages';
import { TEXT_PRIMARY, BORDER_PRIMARY } from 'style-constants';

import suggestTagIcon from 'images/tagsHeaderIcon.svg?external';
import closeIcon from 'images/closeCircle.svg?external';

import A from 'components/A';
import H3 from 'components/H3';
import Span from 'components/Span';
import Wrapper from 'components/Header/Simple';
import Icon from 'components/Icon';
import { IconMd } from 'components/Icon/IconWithSizes';
import { MediumIconStyled } from 'components/Icon/MediumIcon';

import messages from './messages';

export const Header = () => (
  <Wrapper className="mb-to-sm-0 mb-from-sm-3">
    <H3>
      <MediumIconStyled>
        <Icon
          icon={suggestTagIcon}
          width="43"
          fill={BORDER_PRIMARY}
          isColorImportant={true}
        />
      </MediumIconStyled>
      <FormattedMessage {...messages.newTag} />
    </H3>

    <div className="right-panel">
      <A to={routes.tags()}>
        <button>
          <IconMd className="mr-1" icon={closeIcon} fill={BORDER_PRIMARY} isColorImportant={true} />
          <Span color={TEXT_PRIMARY}>
            <FormattedMessage {...commonMessages.close} />
          </Span>
        </button>
      </A>
    </div>
  </Wrapper>
);

export default React.memo(Header);
