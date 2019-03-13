import React from 'react';
import PropTypes from 'prop-types';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { injectIntl, intlShape } from 'react-intl';
import commonMessages from 'common-messages';

import {
  getFollowedCommunities,
  getUnfollowedCommunities,
} from 'utils/communityManagement';

import FollowCommunityButton from 'containers/FollowCommunityButton';

import CommunityChooser from 'components/CommunityChooser';
import Base from 'components/Base/BaseRounded';
import MediumImage from 'components/Img/MediumImage';
import H3 from 'components/H3';

import allquestionsIcon from 'images/allquestions-header.svg';
import myFeedIcon from 'images/myFeed.svg';

import messages from './messages';

const askQuestion = () => createdHistory.push(routes.questionAsk());
const feed = routes.feed();

const MediumImageStyled = MediumImage.extend`
  background: #dfe3f2;
  margin-right: 18px;
  width: 43px;
  height: 43px;
`;

const QuestionsHeader = ({
  intl,
  communities,
  getInitQuestions,
  communityIdFilter,
  followedCommunities,
  parentPage,
}) => {
  const isFeed = parentPage === feed;

  // To form options array I need to get 2 groups: communities where I AM and NOT
  const followedFilteredCommunities = getFollowedCommunities(
    communities,
    followedCommunities,
  );

  const unfollowedFilteredCommunities = getUnfollowedCommunities(
    communities,
    followedCommunities,
  );

  let options = [];
  let optionsNumber = null;

  // My feed page
  if (followedCommunities && isFeed) {
    optionsNumber = followedFilteredCommunities.length;
    options = [{ options: followedFilteredCommunities }];
  }

  // All questions page
  if (!isFeed) {
    optionsNumber = communities.length;
    options = [
      { options: followedFilteredCommunities },
      { options: unfollowedFilteredCommunities },
    ];
  }

  // Default option - All communities
  options = [
    {
      options: [
        {
          label: intl.formatMessage({ id: messages.allCommunities.id }),
          value: 0,
        },
      ],
    },
    ...options,
  ];

  // Header content

  let communityAvatar = null;
  let communityLabel = null;

  const selectedValue = getFollowedCommunities(communities, [
    communityIdFilter,
  ])[0];

  if (!selectedValue) {
    if (!isFeed) {
      communityAvatar = allquestionsIcon;
      communityLabel = intl.formatMessage({
        id: commonMessages.allQuestions.id,
      });
    } else {
      communityAvatar = myFeedIcon;
      communityLabel = intl.formatMessage({ id: commonMessages.myFeed.id });
    }
  } else {
    communityAvatar = selectedValue.avatar;
    communityLabel = selectedValue.label;
  }

  /* eslint react/prop-types: 0 */
  const Button = ({ toggleOpen }) => (
    <H3 className="d-flex align-items-end" onClick={toggleOpen}>
      <MediumImageStyled src={communityAvatar} alt="communityAvatar" />
      <span>{communityLabel}</span>
    </H3>
  );

  return (
    <Base className="d-flex align-items-center">
      <CommunityChooser
        options={options}
        Button={Button}
        toggle={getInitQuestions}
        optionsNumber={optionsNumber}
        selectedValue={selectedValue ? selectedValue.id : 0}
      />

      {communityIdFilter > 0 && (
        <FollowCommunityButton
          communityIdFilter={selectedValue.id}
          followedCommunities={followedCommunities}
        />
      )}
    </Base>
  );
};

QuestionsHeader.propTypes = {
  intl: intlShape.isRequired,
  communities: PropTypes.array,
  getInitQuestions: PropTypes.func,
  communityIdFilter: PropTypes.number,
  followedCommunities: PropTypes.array,
  parentPage: PropTypes.string,
};

export { askQuestion };
export default injectIntl(React.memo(QuestionsHeader));
