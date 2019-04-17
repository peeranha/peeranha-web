import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import * as routes from 'routes-config';

import commonMessages from 'common-messages';
import createCommunityIcon from 'svg/createCommunity';

import Base from 'components/Base';
import NavigationButton from 'components/Button/Contained/Navigation';
import A from 'components/A';
import Icon from 'components/Icon';

import messages from './messages';

const suggestedCommunitiesRoute = routes.suggestedCommunities();
const communitiesRoute = routes.communities();

const CommunitiesHeader = /* istanbul ignore next */ ({
  goToCreateCommunityScreen,
  SubHeader,
  changeSorting,
  sorting,
  communitiesNumber,
}) => {
  const path = window.location.pathname + window.location.hash;

  return (
    <div>
      <Base
        className="d-flex align-items-center justify-content-between"
        position="top"
      >
        <div>
          <A to={communitiesRoute} href={communitiesRoute}>
            <NavigationButton isLink={path !== communitiesRoute}>
              <FormattedMessage {...commonMessages.communities} />
            </NavigationButton>
          </A>

          <A to={suggestedCommunitiesRoute} href={suggestedCommunitiesRoute}>
            <NavigationButton isLink={path !== suggestedCommunitiesRoute}>
              <FormattedMessage {...messages.voting} />
            </NavigationButton>
          </A>
        </div>

        <div>
          <NavigationButton
            onClick={goToCreateCommunityScreen}
            className="d-inline-flex align-items-center p-0"
            isLink
          >
            <Icon icon={createCommunityIcon} />
            <FormattedMessage {...messages.suggestCommunity} />
          </NavigationButton>
        </div>
      </Base>

      <Base position="bottom">
        <SubHeader
          changeSorting={changeSorting}
          sorting={sorting}
          communitiesNumber={communitiesNumber}
        />
      </Base>
    </div>
  );
};

CommunitiesHeader.propTypes = {
  goToCreateCommunityScreen: PropTypes.func,
  SubHeader: PropTypes.any,
  changeSorting: PropTypes.func,
  sorting: PropTypes.object,
  communitiesNumber: PropTypes.number,
};

export default CommunitiesHeader;
