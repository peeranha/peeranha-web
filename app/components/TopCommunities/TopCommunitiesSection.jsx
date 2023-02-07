import { css } from '@emotion/react';
import { singleCommunityColors } from 'utils/communityManagement';
import React, { useEffect, useState } from 'react';
import orderBy from 'lodash/orderBy';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import H4 from '../H4';
import messages from '../../common-messages';
import Grid from '../Grid';
import CommunityItem from './CommunityItem';
import allCommunitiesIcon from '../../images/createCommunity.svg?inline';
import Span from '../Span';
import { TEXT_PRIMARY } from '../../style-constants';
import A, { ADefault } from '../A';
import * as routes from '../../routes-config';

const colors = singleCommunityColors();

const TopCommunitiesSection = ({ ref, single, communities }) => {
  const [allCommunitiesRoute, setAllCommunitiesRoute] = useState(() =>
    routes.communities(),
  );
  const AllCommunitiesLink = single ? ADefault : A;

  useEffect(() => {
    if (single) {
      setAllCommunitiesRoute(`${process.env.APP_LOCATION}/communities`);
    }
  }, [single]);

  return (
    <div className="overflow-hidden" ref={ref}>
      <H4
        isHeader
        css={css`
          color: ${colors.white || ''};
        `}
      >
        <FormattedMessage id={messages.top.id} />{' '}
        <span className="text-lowercase">
          <FormattedMessage id={messages.communities.id} />
        </span>
      </H4>

      <Grid xl={5} lg={4} md={3} sm={2} xs={1}>
        {orderBy(communities, 'postCount', 'desc')
          .slice(0, 9)
          .map((item) => (
            <CommunityItem
              id={item.id}
              description={item.description}
              name={item.name}
              postCount={item.postCount}
              avatar={item.avatar}
              followingUsers={item.followingUsers}
              single={single}
            />
          ))}

        {communities?.length > 9 && (
          <div className="d-flex align-items-center justify-content-center">
            <AllCommunitiesLink
              className="d-flex align-items-center"
              to={allCommunitiesRoute}
              href={allCommunitiesRoute}
            >
              <img className="mr-2" src={allCommunitiesIcon} alt="icon" />
              <Span color={TEXT_PRIMARY}>
                <FormattedMessage id={messages.allCommunities.id} />
              </Span>
            </AllCommunitiesLink>
          </div>
        )}
      </Grid>
    </div>
  );
};

TopCommunitiesSection.propTypes = {
  ref: PropTypes.object,
  single: PropTypes.bool,
  communities: PropTypes.array,
};

export default React.memo(TopCommunitiesSection);
