import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import commonMessages from 'common-messages';
import { TEXT_PRIMARY, BORDER_PRIMARY } from 'style-constants';

import createCommunityHeader from 'images/communitiesHeader.svg?inline';
import closeIcon from 'images/closeCircle.svg?external';

import A from 'components/A';
import H3 from 'components/H3';
import Span from 'components/Span';
import Wrapper, { WrapperRightPanel } from 'components/Header/Simple';
import { MediumImageStyled } from 'components/Img/MediumImage';
import { IconMd } from 'components/Icon/IconWithSizes';

import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { feed } from './../../routes-config';

export const Header = ({ headerDescriptor }) => {
  const isSingleCommunityMode = !!isSingleCommunityWebsite();

  return (
    <Wrapper className="mb-to-sm-0 mb-from-sm-3">
      <H3>
        <MediumImageStyled src={createCommunityHeader} alt="Community icon" />
        <FormattedMessage {...headerDescriptor} />
      </H3>

      <WrapperRightPanel className="right-panel">
        {isSingleCommunityMode ? (
          <A to={routes.feed()}>
            <button>
              <IconMd
                className="mr-1"
                icon={closeIcon}
                fill={BORDER_PRIMARY}
                isColorImportant={true}
              />
              <Span color={TEXT_PRIMARY} className="button-label">
                <FormattedMessage {...commonMessages.close} />
              </Span>
            </button>
          </A>
        ) : (
          <A to={routes.communities()}>
            <button>
              <IconMd
                className="mr-1"
                icon={closeIcon}
                fill={BORDER_PRIMARY}
                isColorImportant={true}
              />
              <Span color={TEXT_PRIMARY} className="button-label">
                <FormattedMessage {...commonMessages.close} />
              </Span>
            </button>
          </A>
        )}
      </WrapperRightPanel>
    </Wrapper>
  );
};

Header.propTypes = {
  headerDescriptor: PropTypes.object.isRequired,
};

export default React.memo(Header);
