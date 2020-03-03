import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import orderBy from 'lodash/orderBy';

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
import { isSingleCommunityWebsite } from 'utils/communityManagement';
import FollowCommunityButton from 'containers/FollowCommunityButton/StyledButton';

import A, { ADefault } from 'components/A';
import P from 'components/P';
import H4 from 'components/H4';
import Span from 'components/Span';
import BaseRoundedNoPadding from 'components/Base/BaseRoundedNoPadding';
import MediumImage from 'components/Img/MediumImage';
import Grid from 'components/Grid';

const single = isSingleCommunityWebsite();

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

  &:hover ${BackSide} {
    display: block;
  }
`;

const ADefaultStyled = ADefault.extend`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &:hover ${BackSide} {
    display: block;
  }
`;

const TopCommunities = ({
  communities,
  profile,
  account,
  userId,
  questions,
}) => {
  if (
    account !== userId ||
    !communities ||
    !profile ||
    profile.followed_communities.length ||
    !communities.length
  ) {
    return null;
  }
  const ref = useRef(null);
  useEffect(
    () => {
      if (window.location.hash === '#communities') {
        window.scrollTo(0, ref.current.offsetTop - 110);
      }
    },
    [window.location.hash, questions],
  );

  return (
    <div className="overlow-hidden" ref={ref}>
      <H4 isHeader>
        <FormattedMessage {...messages.top} />{' '}
        <span className="text-lowercase">
          <FormattedMessage {...messages.communities} />
        </span>
      </H4>

      <Grid xl={5} lg={4} md={3} sm={2} xs={1}>
        {orderBy(communities, 'users_subscribed', 'desc')
          .slice(0, 9)
          .map(x => {
            let Link = AStyled;
            let route = routes.questions(x.id);
            if (single && x.id !== single) {
              Link = ADefaultStyled;
              route = `${process.env.APP_LOCATION}${route}`;
            } else if (single && x.id === single) {
              route = routes.questions();
            }

            return (
              <div key={x.id}>
                <BaseRoundedNoPadding>
                  <Link href={route} to={route}>
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
                              {getFormattedNum2(x.questions_asked)}
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
                  </Link>
                </BaseRoundedNoPadding>
              </div>
            );
          })}

        {communities.length > 9 && (
          <div className="d-flex align-items-center justify-content-center">
            <A className="d-flex align-items-center" to={routes.communities()}>
              <img className="mr-2" src={allCommunitiesIcon} alt="icon" />
              <Span color={TEXT_PRIMARY}>
                <FormattedMessage {...messages.allCommunities} />
              </Span>
            </A>
          </div>
        )}
      </Grid>
    </div>
  );
};

TopCommunities.propTypes = {
  communities: PropTypes.array,
  profile: PropTypes.object,
  account: PropTypes.string,
  userId: PropTypes.string,
  questions: PropTypes.array,
};

export default React.memo(TopCommunities);
