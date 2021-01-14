import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import commonMessages from 'common-messages';
import { TEXT_PRIMARY, BORDER_PRIMARY } from 'style-constants';

import suggestTagIcon from 'images/tagsHeaderIcon.svg?external';
import closeIcon from 'images/closeCircle.svg?external';

import A from 'components/A';
import H3 from 'components/H3';
import Span from 'components/Span';
import Wrapper, { WrapperRightPanel } from 'components/Header/Simple';
import Icon from 'components/Icon';
import { IconMd } from 'components/Icon/IconWithSizes';
import { MediumIconStyled } from 'components/Icon/MediumIcon';

import messages from './messages';

export const Header = ({
  title,
  closeRedirectPage,
  closeButtonAction = null,
}) => (
  <Wrapper className="mb-to-sm-0 mb-from-sm-3">
    <H3>
      <MediumIconStyled>
        <Icon
          icon={suggestTagIcon}
          width="43"
          fill={BORDER_PRIMARY}
          isColorImportant
        />
      </MediumIconStyled>
      {title || <FormattedMessage {...messages.newTag} />}
    </H3>

    <WrapperRightPanel className="right-panel">
      <A to={closeRedirectPage || routes.tags()} onClick={closeButtonAction}>
        <button>
          <IconMd
            className="mr-1"
            icon={closeIcon}
            fill={BORDER_PRIMARY}
            isColorImportant
          />
          <Span color={TEXT_PRIMARY} className="button-label">
            <FormattedMessage {...commonMessages.close} />
          </Span>
        </button>
      </A>
    </WrapperRightPanel>
  </Wrapper>
);

Header.propTypes = {
  title: PropTypes.element,
  closeRedirectPage: PropTypes.string,
  closeButtonAction: PropTypes.func,
};

export default React.memo(Header);
