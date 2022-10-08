import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import commonMessages from 'common-messages';
import {
  TEXT_PRIMARY,
  BORDER_PRIMARY,
  BG_PRIMARY_SPECIAL_2,
} from 'style-constants';
import { css } from '@emotion/react';

import TagsIcon from 'icons/Tags';
import CloseRoundedIcon from 'icons/CloseRounded';

import A from 'components/A';
import H3 from 'components/H3';
import Span from 'components/Span';
import Wrapper, { WrapperRightPanel } from 'components/Header/Simple';

import messages from './messages';
import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

export const Header = ({
  title,
  closeRedirectPage,
  closeButtonAction = null,
}) => (
  <Wrapper className="mb-to-sm-0 mb-from-sm-3">
    <H3>
      <div
        className="mr16 brc df aic jcc"
        css={css`
          display: flex;
          background: ${BG_PRIMARY_SPECIAL_2};
          border: 1px solid #c2c6d8;
          width: 43px;
          height: 43px;
        `}
      >
        <TagsIcon fill={colors.btnColor || BORDER_PRIMARY} size={[30, 30]} />
      </div>
      {title || <FormattedMessage id={messages.newTag.id} />}
    </H3>

    <WrapperRightPanel className="right-panel">
      <A to={closeRedirectPage || routes.tags()} onClick={closeButtonAction}>
        <button>
          <CloseRoundedIcon
            fill={colors.btnColor || BORDER_PRIMARY}
            className="mr-1"
          />
          <Span
            color={colors.btnColor || TEXT_PRIMARY}
            className="button-label"
          >
            <FormattedMessage id={commonMessages.close.id} />
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
