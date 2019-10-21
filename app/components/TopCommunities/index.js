import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { BG_LIGHT, TEXT_SECONDARY, BORDER_SECONDARY } from 'style-constants';
import * as routes from 'routes-config';
import messages from 'common-messages';

import { getFormattedNum2 } from 'utils/numbers';
import FollowCommunityButton from 'containers/FollowCommunityButton/StyledButton';

import A from 'components/A';
import P from 'components/P';
import H4 from 'components/H4';
import Span from 'components/Span';
import BaseRoundedNoPadding from 'components/Base/BaseRoundedNoPadding';
import MediumImage from 'components/Img/MediumImage';

const BaseStyled = BaseRoundedNoPadding.extend`
  padding: 15px 20px;
`;

const FrontSide = styled.div`
  > div {
    padding: 15px 20px;
  }

  @media only screen and (min-width: 576px) {
    > div:not(:last-child) {
      border-bottom: 1px solid ${BORDER_SECONDARY};
    }
  }
`;

const BackSide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${BG_LIGHT};
  display: none;
  border-radius: 5px;

  > div {
    position: relative;
    height: 100%;
    padding: 15px 20px;
  }
`;

const AStyled = A.extend`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  word-break: break-all;

  &:hover ${BackSide} {
    display: block;
  }
`;

const communitiesRoute = routes.communities();

const TopCommunities = ({ communities, profile, account, userId }) => {
  if (
    account !== userId ||
    !communities ||
    !profile ||
    profile.followed_communities[0]
  ) {
    return null;
  }

  return (
    <div className="overlow-hidden">
      <H4 isHeader>
        <FormattedMessage {...messages.top} />{' '}
        <span className="text-lowercase">
          <FormattedMessage {...messages.communities} />
        </span>
      </H4>

      <div className="row">
        {communities.map(x => (
          <div key={x.id} className="col-12 col-sm-4 col-xl-3 mb-3">
            <BaseStyled>
              <AStyled to={communitiesRoute}>
                <FrontSide>
                  <div className="d-flex align-items-center justify-content-between flex-grow-1">
                    <div>
                      <MediumImage src={x.avatar} alt="comm_img" />
                      <P fontSize="16" bold>
                        {x.name}
                      </P>
                    </div>

                    <div className="d-block d-sm-none">
                      <FollowCommunityButton communityIdFilter={x.id} />
                    </div>
                  </div>

                  <div className="d-none d-sm-block">
                    <div className="d-flex mb-3">
                      <div className="d-flex flex-column flex-grow-1">
                        <Span fontSize="16" bold>
                          {getFormattedNum2(x.users)}
                        </Span>
                        <Span
                          className="mt-1"
                          fontSize="14"
                          color={TEXT_SECONDARY}
                        >
                          <FormattedMessage {...messages.users} />
                        </Span>
                      </div>
                      <div className="d-flex flex-column flex-grow-1">
                        <Span fontSize="16" bold>
                          {getFormattedNum2(x.popularity)}
                        </Span>
                        <Span
                          className="mt-1"
                          fontSize="14"
                          color={TEXT_SECONDARY}
                        >
                          <FormattedMessage {...messages.questions} />
                        </Span>
                      </div>
                    </div>

                    <FollowCommunityButton communityIdFilter={x.id} />
                  </div>
                </FrontSide>

                <BackSide>
                  <div className="d-flex flex-column justify-content-between">
                    <div>
                      <P fontSize="16" bold>
                        {x.name}
                      </P>
                      <P>{x.description}</P>
                    </div>
                    <div>
                      <FollowCommunityButton communityIdFilter={x.id} />
                    </div>
                  </div>
                </BackSide>
              </AStyled>
            </BaseStyled>
          </div>
        ))}
      </div>
    </div>
  );
};

TopCommunities.propTypes = {
  communities: PropTypes.array,
  profile: PropTypes.object,
  account: PropTypes.string,
  userId: PropTypes.string,
};

export default React.memo(TopCommunities);
