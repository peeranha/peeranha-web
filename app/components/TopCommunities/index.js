import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import {
  BG_LIGHT,
  TEXT_SECONDARY,
  BORDER_SECONDARY,
  TEXT_PRIMARY,
} from 'style-constants';

import * as routes from 'routes-config';
import messages from 'common-messages';

import allCommunitiesIcon from 'images/createCommunity.svg?inline';

import { getFormattedNum2 } from 'utils/numbers';
import FollowCommunityButton from 'containers/FollowCommunityButton/StyledButton';

import A from 'components/A';
import P from 'components/P';
import H4 from 'components/H4';
import Span from 'components/Span';
import BaseRoundedNoPadding from 'components/Base/BaseRoundedNoPadding';
import MediumImage from 'components/Img/MediumImage';

const FrontSide = styled.div`
  > div {
    padding: 20px;

    &:not(:last-child) {
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
    padding: 20px;
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

const List = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0 -8px;

  > * {
    flex-basis: 20%;
    margin: 0 8px 15px 8px;
    flex: 0 1 calc(20% - 16px);
  }

  @media only screen and (max-width: 1200px) {
    > * {
      flex-basis: 25%;
      flex: 0 1 calc(25% - 16px);
    }
  }

  @media only screen and (max-width: 768px) {
    > * {
      flex-basis: 33%;
      flex: 0 1 calc(33% - 16px);
    }
  }

  @media only screen and (max-width: 576px) {
    > * {
      flex-basis: 50%;
      flex: 0 1 calc(50% - 16px);
    }
  }

  @media only screen and (max-width: 360px) {
    > * {
      flex-basis: 100%;
      flex: 0 1 calc(100% - 16px);
    }
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

      <List>
        {communities.map(x => (
          <div key={x.id}>
            <BaseRoundedNoPadding>
              <AStyled to={communitiesRoute}>
                <FrontSide>
                  <div>
                    <MediumImage src={x.avatar} alt="comm_img" />
                    <P fontSize="16" bold>
                      {x.name}
                    </P>
                  </div>

                  <div>
                    <div className="d-flex mb-3">
                      <div className="d-flex flex-column flex-grow-1">
                        <Span fontSize="16" bold>
                          {getFormattedNum2(x.users_subscribed)}
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
            </BaseRoundedNoPadding>
          </div>
        ))}

        <div className="d-flex align-items-center justify-content-center">
          <A
            className="d-flex align-items-center"
            to={routes.communities()}
            href={routes.communities()}
          >
            <img className="mr-2" src={allCommunitiesIcon} alt="icon" />
            <Span color={TEXT_PRIMARY}>
              <FormattedMessage {...messages.allCommunities} />
            </Span>
          </A>
        </div>
      </List>
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
