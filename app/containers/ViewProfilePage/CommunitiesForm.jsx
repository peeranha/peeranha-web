import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { TEXT_SECONDARY, TEXT_PRIMARY } from 'style-constants';

import messages from 'common-messages';
import * as routes from 'routes-config';

import Base from 'components/Base';
import Span from 'components/Span';
import A from 'components/A';
import H4 from 'components/H4';
import Img from 'components/Img';

import arrowRightIcon from 'images/arrowRight.svg?inline';

import { getFollowedCommunities } from 'utils/communityManagement';
import { getFormattedNum2 } from 'utils/numbers';

const CommunityStyled = Base.extend`
  border-radius: 5px;
  padding: 12px 20px;
  height: 100%;
`;

const communitiesRoute = routes.communities();

const CommunitiesForm = ({ userId, profile, account, communities }) => {
  if ((!profile && !communities) || !profile.followed_communities[0]) {
    return null;
  }

  const followedCommunities = getFollowedCommunities(
    communities,
    profile.followed_communities,
  );

  return (
    <div className="overflow-hidden">
      <H4 isHeader>
        <FormattedMessage {...messages.communities} />{' '}
        <Span color={TEXT_SECONDARY} fontSize="30" bold>
          {followedCommunities.length}
        </Span>
      </H4>

      <div className="row">
        {followedCommunities.map(x => (
          <div key={x.id} className="col-12 col-sm-6 col-md-3 mb-2">
            <A to={communitiesRoute}>
              <CommunityStyled className="d-flex">
                <Img className="mr-2" src={x.avatar} alt="comm_img" />
                <div className="d-flex flex-column">
                  <Span>{x.name}</Span>
                  <span>
                    <Span bold fontSize="16">
                      {getFormattedNum2(x.users_subscribed)}
                    </Span>{' '}
                    <Span color={TEXT_SECONDARY} fontSize="14">
                      <FormattedMessage {...messages.users} />
                    </Span>
                  </span>
                </div>
              </CommunityStyled>
            </A>
          </div>
        ))}

        {userId === account && (
          <div className="col-12 col-sm-6 col-md-3 d-flex justify-content-center align-items-center mb-2">
            <A className="py-2" to={communitiesRoute}>
              <Span color={TEXT_PRIMARY} fontSize="16">
                <img className="mr-2" src={arrowRightIcon} alt="icon" />
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
