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
import Grid from 'components/Grid';

import arrowRightIcon from 'images/arrowRight.svg?inline';

import { getFollowedCommunities } from 'utils/communityManagement';

const CommunityStyled = Base.extend`
  border-radius: 5px;
  padding: 12px 20px;
  height: 68px;
  word-break: break-word;
`;

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

      <Grid xl={5} lg={4} md={3} sm={2} xs={1}>
        {followedCommunities.map(x => (
          <div key={x.id}>
            <A to={routes.questions(x.id)}>
              <CommunityStyled>
                <span className="d-flex align-items-center">
                  <Img className="mr-2" src={x.avatar} alt="comm_img" />
                  <Span>{x.name}</Span>
                </span>
              </CommunityStyled>
            </A>
          </div>
        ))}

        {userId === account && (
          <div className="d-flex justify-content-center align-items-center">
            <A className="py-2" to={routes.communities()}>
              <Span color={TEXT_PRIMARY} fontSize="16">
                <img className="mr-2" src={arrowRightIcon} alt="icon" />
                <FormattedMessage {...messages.subscribeMore} />
              </Span>
            </A>
          </div>
        )}
      </Grid>
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
