import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import * as routes from 'routes-config';

import commonMessages from 'common-messages';
import icoTagIcon from 'images/icoTag.svg';
import arrowLeft from 'images/arrowLeft.svg';

import Base from 'components/Base';
import NavigationButton from 'components/Button/Contained/Navigation';
import A from 'components/A';

import messages from './messages';

const tagsRoute = routes.tags();

const Header = /* istanbul ignore next */ ({
  communityId,
  goToCreateTagScreen,
}) => {
  const path = window.location.pathname + window.location.hash;

  const communityTagsRoute = routes.communityTags(communityId);
  const suggestedTagsRoute = routes.suggestedTags(communityId);

  return (
    <div>
      <Base
        className="d-flex align-items-center justify-content-between"
        position="top"
      >
        <div>
          <A to={tagsRoute} href={tagsRoute}>
            <NavigationButton className="pl-0" isLink>
              <img className="mr-2" src={arrowLeft} alt="x" />
              <FormattedMessage {...messages.backToList} />
            </NavigationButton>
          </A>

          <A to={communityTagsRoute} href={communityTagsRoute}>
            <NavigationButton isLink={path !== communityTagsRoute}>
              <FormattedMessage {...commonMessages.tags} />
            </NavigationButton>
          </A>

          <A to={suggestedTagsRoute} href={suggestedTagsRoute}>
            <NavigationButton isLink={path !== suggestedTagsRoute}>
              <FormattedMessage {...commonMessages.voting} />
            </NavigationButton>
          </A>
        </div>

        <div>
          <NavigationButton
            onClick={goToCreateTagScreen}
            className="d-inline-flex align-items-center p-0"
            isLink
          >
            <img className="mr-1" src={icoTagIcon} alt="icoTagIcon" />
            <FormattedMessage {...commonMessages.suggestTag} />
          </NavigationButton>
        </div>
      </Base>

      <Base position="bottom">SUBHEADER</Base>
    </div>
  );
};

Header.propTypes = {
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  goToCreateTagScreen: PropTypes.func,
};

export default React.memo(Header);
