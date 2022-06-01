import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { TEXT_SECONDARY, TEXT_PRIMARY, BORDER_RADIUS_L } from 'style-constants';

import messages from 'common-messages';
import * as routes from 'routes-config';

import Base from 'components/Base';
import Span from 'components/Span';
import A, { ADefault } from 'components/A';
import H4 from 'components/H4';
import Img from 'components/Img';
import Grid from 'components/Grid';
import { IconXm } from 'components/Icon/IconWithSizes';

import arrowRightIcon from 'images/arrowRight.svg?external';

import {
  getFollowedCommunities,
  isSingleCommunityWebsite,
} from 'utils/communityManagement';

const single = isSingleCommunityWebsite();

const CommunityStyled = Base.extend`
  border-radius: ${BORDER_RADIUS_L};
  padding: 12px 20px;
  height: 68px;
`;

const CommunitiesForm = ({
  userId,
  profile,
  account,
  communities,
  questions,
}) => {
  if (
    (!profile && !communities) ||
    !profile.followedCommunities ||
    profile?.followedCommunities?.filter(id => !!id).length === 0
  ) {
    return null;
  }

  const followedCommunities = getFollowedCommunities(
    communities,
    profile.followedCommunities,
  );

  let moreRoute = routes.communities();
  let LinkForMore = A;
  if (single) {
    LinkForMore = ADefault;
    moreRoute = `${process.env.APP_LOCATION}/communities`;
  }

  const ref = useRef(0);
  useEffect(
    () => {
      let offset = 75;
      if (single && window.innerWidth > 576) {
        offset = 113;
      } else if (window.innerWidth < 577) {
        offset = 55;
      }

      if (window.location.hash === '#communities') {
        window.scrollTo(0, ref.current.offsetTop - offset);
      }
    },
    [window.location.hash, questions],
  );

  return (
    <div className="overflow-hidden" ref={ref}>
      <H4 isHeader>
        <FormattedMessage {...messages.communities} />{' '}
        <Span color={TEXT_SECONDARY} fontSize="30" bold>
          {followedCommunities.length}
        </Span>
      </H4>

      <Grid xl={5} lg={4} md={3} sm={2} xs={1}>
        {followedCommunities.map(x => {
          let Link = A;
          let route = routes.questions(x.id);
          if (single && single !== x.id) {
            Link = ADefault;
            route = `${process.env.APP_LOCATION}${route}`;
          } else if (single && single === x.id) {
            route = routes.questions();
          }
          return (
            <div key={x.id}>
              <Link href={route} to={route}>
                <CommunityStyled>
                  <span className="d-flex align-items-center">
                    <Img className="mr-2" src={x.avatar} alt="comm_img" />
                    <Span>{x.name}</Span>
                  </span>
                </CommunityStyled>
              </Link>
            </div>
          );
        })}

        {userId === account && (
          <div className="d-flex justify-content-center align-items-center">
            <LinkForMore className="py-2" href={moreRoute} to={moreRoute}>
              <Span color={TEXT_PRIMARY} fontSize="16">
                <IconXm className="mr-2" icon={arrowRightIcon} />
                <FormattedMessage {...messages.subscribeMore} />
              </Span>
            </LinkForMore>
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
  questions: PropTypes.array,
};

export default React.memo(CommunitiesForm);
