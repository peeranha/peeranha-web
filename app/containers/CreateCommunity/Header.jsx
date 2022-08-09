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

import CloseRoundedIcon from 'icons/CloseRounded';
import CommunitiesIcon from 'icons/Communities';

import A from 'components/A';
import H3 from 'components/H3';
import Span from 'components/Span';
import Wrapper, { WrapperRightPanel } from 'components/Header/Simple';

import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { css } from '@emotion/react';

export const Header = ({ headerDescriptor }) => {
  const isSingleCommunityMode = !!isSingleCommunityWebsite();
  const nextRoute = isSingleCommunityMode ? routes.feed : routes.communities;

  return (
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
          <CommunitiesIcon stroke="#576FED" size={[30, 30]} />
        </div>
        <FormattedMessage {...headerDescriptor} />
      </H3>

      <WrapperRightPanel className="right-panel">
        <A to={nextRoute()}>
          <button>
            <CloseRoundedIcon fill={BORDER_PRIMARY} className="mr-1" />
            <Span color={TEXT_PRIMARY} className="button-label">
              <FormattedMessage {...commonMessages.close} />
            </Span>
          </button>
        </A>
      </WrapperRightPanel>
    </Wrapper>
  );
};

Header.propTypes = {
  headerDescriptor: PropTypes.object.isRequired,
};

export default React.memo(Header);
