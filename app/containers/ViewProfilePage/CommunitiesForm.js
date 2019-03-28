import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import messages from 'common-messages';
import * as routes from 'routes-config';

import Base from 'components/Base';
import Span from 'components/Span';
import A from 'components/A';
import Icon from 'components/Icon';
import H4 from 'components/H4';
import Img from 'components/Img';

import arrowRightIcon from 'svg/arrowRight';

import { getFollowedCommunities } from 'utils/communityManagement';
import { getFormattedNum2 } from 'utils/numbers';

const CommunitiesFormStyled = styled.div`
  overflow: hidden;
`;

const CommunityStyled = Base.extend`
  border-radius: 5px;
  padding: 12px 20px;
  height: 100%;
`;

const communitiesRoute = routes.communities();

const CommunitiesForm = /* istanbul ignore next */ ({
  userId,
  profile,
  account,
  communities,
}) => {
  if ((!profile && !communities) || !profile.followed_communities[0]) {
    return null;
  }

  const followedCommunities = getFollowedCommunities(
    communities,
    profile.followed_communities,
  );

  return (
    <CommunitiesFormStyled>
      <H4 isHeader>
        <FormattedMessage {...messages.communities} />{' '}
        <Span color="gray" fontSize="30" bold>
          {followedCommunities.length}
        </Span>
      </H4>

      <div className="row">
        {followedCommunities.map(x => (
          <div key={x.id} className="col-xl-3 mb-2">
            <A to={communitiesRoute} href={communitiesRoute}>
              <CommunityStyled className="d-flex">
                <Img className="mr-2" src={x.avatar} alt="comm_img" />
                <div className="d-flex flex-column">
                  <Span>{x.name}</Span>
                  <span>
                    <Span bold fontSize="16">
                      {getFormattedNum2(x.users || 9999)}
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
    </CommunitiesFormStyled>
  );
};

CommunitiesForm.propTypes = {
  userId: PropTypes.string,
  profile: PropTypes.object,
  account: PropTypes.string,
  communities: PropTypes.array,
};

export default React.memo(CommunitiesForm);
