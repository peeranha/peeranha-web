import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { css } from '@emotion/react';
import * as routes from 'routes-config';
import commonMessages from 'common-messages';
import { TEXT_PRIMARY, BORDER_PRIMARY } from 'style-constants';

import createCommunityHeader from 'images/communitiesHeader.svg?external';
import closeIcon from 'images/closeCircle.svg?external';

import A from 'components/A';
import H3 from 'components/H3';
import Span from 'components/Span';
import Wrapper, { WrapperRightPanel } from 'components/Header/Simple';
import { MediumIconStyled } from 'components/Icon/MediumIcon';
import { IconMd } from 'components/Icon/IconWithSizes';
import Icon from 'components/Icon';
import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { feed } from './../../routes-config';
import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

export const Header = ({ headerDescriptor }) => {
  const isSingleCommunityMode = !!isSingleCommunityWebsite();
  const nextRoute = isSingleCommunityMode ? routes.feed : routes.communities;

  return (
    <Wrapper className="mb-to-sm-0 mb-from-sm-3">
      <H3>
        <MediumIconStyled>
          <Icon
            icon={createCommunityHeader}
            width="43"
            css={css`
              circle {
                stroke: ${colors.btnColor || BORDER_PRIMARY};
              }
              path {
                fill: ${colors.btnColor || BORDER_PRIMARY};
              }
            `}
          />
        </MediumIconStyled>
        <FormattedMessage id={headerDescriptor.id} />
      </H3>

      <WrapperRightPanel className="right-panel">
        <A to={nextRoute()}>
          <button>
            <IconMd
              className="mr-1"
              icon={closeIcon}
              fill={colors.btnColor || BORDER_PRIMARY}
              color={colors.btnColor || BORDER_PRIMARY}
              isColorImportant={true}
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
};

Header.propTypes = {
  headerDescriptor: PropTypes.object.isRequired,
};

export default React.memo(Header);
