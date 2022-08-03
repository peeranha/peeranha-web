import orderBy from 'lodash/orderBy';

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import * as routes from 'routes-config';
import { TEXT_PRIMARY } from 'style-constants';

import allCommunitiesIcon from 'images/createCommunity.svg?inline';

import Img from 'components/Img';
import Span from 'components/Span';
import P from 'components/P';
import A from 'components/A';
import Ul from 'components/Ul';

import { Header } from 'components/ExistingCommunities/Aside';
import FollowCommunityButton from 'containers/FollowCommunityButton/StyledButton';

const Aside = ({ communities }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Header className="mb-4" fontSize="24" bold>
        {t('common.top')}
        <span className="text-lowercase">{t('common.communities')}</span>
      </Header>

      <Ul className="pt-0 mb-4">
        {orderBy(communities, y => y.users_subscribed, ['desc'])
          .slice(0, 3)
          .map(x => (
            <li key={x.id} className="pb-4">
              <div className="d-flex align-items-start mb-2">
                <Img className="mr-1" src={x.avatar} alt="commAvatar" />
                <div>
                  <P>{x.name}</P>
                  <P>
                    <Span bold>{x.users_subscribed}</Span>{' '}
                    <Span fontSize="14">{t('common.users')}</Span>
                  </P>
                </div>
              </div>

              <FollowCommunityButton communityIdFilter={x.id} />
            </li>
          ))}
      </Ul>

      <footer>
        <A className="d-flex align-items-center" to={routes.communities()}>
          <img className="mr-2" src={allCommunitiesIcon} alt="icon" />
          <Span color={TEXT_PRIMARY}>{t('common.allCommunities')}</Span>
        </A>
      </footer>
    </div>
  );
};

Aside.propTypes = {
  communities: PropTypes.array,
};

export default Aside;
