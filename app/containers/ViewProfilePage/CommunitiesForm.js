import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import messages from 'common-messages';
import * as routes from 'routes-config';

import Base from 'components/Base';
import Span from 'components/Span';
import A from 'components/A';
import Icon from 'components/Icon';

import arrowRightIcon from 'svg/arrowRight';

import { getFollowedCommunities } from 'utils/communityManagement';
import { getFormattedNum } from 'utils/numbers';

import HeaderForBlock from './HeaderForBlock';

const CommunityStyled = Base.extend`
  border-radius: 5px;
  padding: 12px 20px;
  height: 100%;
`;

const Img = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 5px;
  object-fit: contain;
`;

const communitiesRoute = routes.communities();

const CommunitiesForm = ({ userId, profile, account, communities }) => {
  if (!communities) {
    return null;
  }

  const followedCommunities = getFollowedCommunities(
    communities,
    profile.followed_communities,
  );

  return (
    <div>
      <HeaderForBlock>
        <FormattedMessage {...messages.communities} />{' '}
        <Span color="gray" fontSize="30" bold>
          {followedCommunities.length}
        </Span>
      </HeaderForBlock>
      <div className="row">
        {followedCommunities.map(x => (
          <div className="col-xl-3 mb-2">
            <A to={communitiesRoute} href={communitiesRoute}>
              <CommunityStyled className="d-flex">
                <Img src={x.avatar} alt="comm_img" />
                <div className="d-flex flex-column">
                  <Span>{x.name}</Span>
                  <span>
                    <Span bold fontSize="16">
                      {getFormattedNum(x.users || 9999)}
                    </Span>{' '}
                    <Span color="gray" fontSize="14">
                      <FormattedMessage {...messages.users} />
                    </Span>
                  </span>
                </div>
              </CommunityStyled>
            </A>
          </div>
        ))}

        {userId === account && (
          <div className="col-xl-3 d-flex justify-content-center align-items-center mb-2">
            <A to={communitiesRoute} href={communitiesRoute}>
              <Span color="blue" fontSize="16">
                <Icon icon={arrowRightIcon} />
                <FormattedMessage {...messages.subscribeMore} />
              </Span>
            </A>
          </div>
        )}
      </div>
    </div>
  );
};

CommunitiesForm.propTypes = {
  userId: PropTypes.string,
  profile: PropTypes.object,
  account: PropTypes.string,
  communities: PropTypes.array,
};

export default React.memo(CommunitiesForm);
