import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import * as routes from 'routes-config';
import commonMessages from 'common-messages';
import { TEXT_PRIMARY } from 'style-constants';

import allCommunitiesIcon from 'images/createCommunity.svg?inline';

import Img from 'components/Img';
import Span from 'components/Span';
import P from 'components/P';
import A from 'components/A';
import Ul from 'components/Ul';

import { Header } from 'components/ExistingCommunities/Aside';
import FollowCommunityButton from 'containers/FollowCommunityButton/StyledButton';

const Aside = ({ communities }) => (
  <div>
    <Header className="mb-4" fontSize="24" bold>
      <FormattedMessage {...commonMessages.top} />{' '}
      <span className="text-lowercase">
        <FormattedMessage {...commonMessages.communities} />
      </span>
    </Header>

    <Ul className="pt-0 mb-4">
      {communities.slice(0, 3).map(x => (
        <li key={x.id} className="pb-4">
          <div className="d-flex align-items-start mb-2">
            <Img className="mr-1" src={x.avatar} alt="commAvatar" />
            <div>
              <P>{x.name}</P>
              <P>
                <Span bold>{x.users_subscribed}</Span>{' '}
                <Span fontSize="14">
                  <FormattedMessage {...commonMessages.users} />
                </Span>
              </P>
            </div>
          </div>

          <FollowCommunityButton communityIdFilter={x.id} />
        </li>
      ))}
    </Ul>

    <footer>
      <A
        className="d-flex align-items-center"
        to={routes.communities()}
        href={routes.communities()}
      >
        <img className="mr-2" src={allCommunitiesIcon} alt="icon" />
        <Span color={TEXT_PRIMARY}>
          <FormattedMessage {...commonMessages.allCommunities} />
        </Span>
      </A>
    </footer>
  </div>
);

Aside.propTypes = {
  communities: PropTypes.array,
};

export default React.memo(Aside);
