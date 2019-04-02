import React from 'react';
import PropTypes from 'prop-types';
import * as routes from 'routes-config';

import { injectIntl, intlShape } from 'react-intl';
import messages from 'common-messages';

import FollowCommunityButton from 'containers/FollowCommunityButton';

import CommunitySelector from 'components/CommunitySelector';
import Base from 'components/Base/BaseRounded';
import { MediumImageStyled } from 'components/Img/MediumImage';
import H3 from 'components/H3';

import allquestionsIcon from 'images/allquestions-header.svg';
import myFeedIcon from 'images/myFeed.svg';

const feed = routes.feed();

export const QuestionsHeader = /* istanbul ignore next */ ({
  intl,
  getInitQuestions,
  communityIdFilter,
  followedCommunities,
  parentPage,
}) => {
  const isFeed = parentPage === feed;

  let defaultAvatar = null;
  let defaultLabel = null;

  if (!isFeed) {
    defaultAvatar = allquestionsIcon;
    defaultLabel = intl.formatMessage({ id: messages.allQuestions.id });
  } else {
    defaultAvatar = myFeedIcon;
    defaultLabel = intl.formatMessage({ id: messages.myFeed.id });
  }

  /* eslint react/prop-types: 0 */
  const Button = ({ toggleOpen, communityAvatar, communityLabel }) => (
    <H3 className="d-flex align-items-end" onClick={toggleOpen}>
      <MediumImageStyled
        src={communityAvatar || defaultAvatar}
        alt="communityAvatar"
      />
      <span>{communityLabel || defaultLabel}</span>
    </H3>
  );

  return (
    <Base className="d-flex align-items-center">
      <CommunitySelector
        isArrowed
        Button={Button}
        toggle={getInitQuestions}
        showOnlyFollowed={isFeed}
        selectedCommunityId={communityIdFilter}
      />

      {communityIdFilter > 0 && (
        <FollowCommunityButton
          communityIdFilter={communityIdFilter}
          followedCommunities={followedCommunities}
        />
      )}
    </Base>
  );
};

QuestionsHeader.propTypes = {
  intl: intlShape.isRequired,
  getInitQuestions: PropTypes.func,
  communityIdFilter: PropTypes.number,
  followedCommunities: PropTypes.array,
  parentPage: PropTypes.string,
};

export default injectIntl(React.memo(QuestionsHeader));
