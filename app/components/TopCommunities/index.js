import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { white, blue } from 'style-constants';
import * as routes from 'routes-config';
import messages from 'common-messages';

import { getFormattedNum2 } from 'utils/numbers';
import FollowCommunityButton from 'containers/FollowCommunityButton';

import A from 'components/A';
import H4 from 'components/H4';
import Span from 'components/Span';
import Base from 'components/Base';
import OutlinedButton from 'components/Button/OutlinedButton';
import MediumImage from 'components/Img/MediumImage';

const BaseStyled = Base.extend`
  padding: 15px 20px;
`;

const BackSide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${white};
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
    <div>
      <H4 isHeader>
        <FormattedMessage {...messages.top} />{' '}
        <span className="text-lowercase">
          <FormattedMessage {...messages.communities} />
        </span>
      </H4>
      <div className="row">
        {communities.map(x => (
          <div key={x.id} className="col-xl-3 mb-2">
            <AStyled to={communitiesRoute} href={communitiesRoute}>
              <BaseStyled className="flex-grow-1" position="top">
                <MediumImage src={x.avatar} alt="comm_img" />
                <p>
                  <Span fontSize="16" bold>
                    {x.name}
                  </Span>
                </p>
              </BaseStyled>

              <BaseStyled position="bottom">
                <div className="d-flex mb-3">
                  <div className="d-flex flex-column flex-grow-1">
                    <Span fontSize="16" bold>
                      {getFormattedNum2(x.users || 9999)}
                    </Span>
                    <Span className="mt-1" fontSize="14" color="gray">
                      <FormattedMessage {...messages.users} />
                    </Span>
                  </div>
                  <div className="d-flex flex-column flex-grow-1">
                    <Span fontSize="16" bold>
                      {getFormattedNum2(x.popularity)}
                    </Span>
                    <Span className="mt-1" fontSize="14" color="gray">
                      <FormattedMessage {...messages.questions} />
                    </Span>
                  </div>
                </div>
                <FollowCommunityButton
                  communityIdFilter={x.id}
                  followedCommunities={profile.followed_communities}
                />
              </BaseStyled>

              <BackSide>
                <div className="d-flex flex-column justify-content-between">
                  <div>
                    <p>
                      <Span fontSize="16" bold>
                        {x.name}
                      </Span>
                    </p>
                    <p>
                      <Span>{x.description}</Span>
                    </p>
                  </div>
                  <div>
                    <FollowCommunityButton
                      communityIdFilter={x.id}
                      followedCommunities={profile.followed_communities}
                    />
                  </div>
                </div>
              </BackSide>
            </AStyled>
          </div>
        ))}
      </div>
      <div className="my-3">
        <A to={communitiesRoute} href={communitiesRoute}>
          <OutlinedButton bg={blue} className="py-2 w-100">
            <FormattedMessage {...messages.see} />{' '}
            <FormattedMessage {...messages.all} />{' '}
            <FormattedMessage {...messages.communities} />
          </OutlinedButton>
        </A>
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

export default TopCommunities;
