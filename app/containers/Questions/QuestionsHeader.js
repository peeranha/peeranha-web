import React from 'react';
import PropTypes from 'prop-types';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import SelectField from 'components/FormFields/SelectField';

import messages from './messages';
import FollowCommunityButton from './FollowCommunityButton';

const askQuestion = () => createdHistory.push(routes.question_ask());
const feed = routes.feed();

const QuestionsHeader = ({
  translations,
  communities,
  getInitQuestions,
  communityIdFilter,
  followedCommunities,
  followHandler,
  parentPage,
  questionsList,
}) => {
  const isFeed = parentPage === feed;

  let options = [];

  if (followedCommunities && isFeed) {
    options = [
      { label: translations[messages.all.id], value: 0 },
      ...communities.filter(x => followedCommunities.includes(x.id)),
    ];
  }

  if (!isFeed) {
    options = [
      { label: translations[messages.all.id], value: 0 },
      ...communities,
    ];
  }

  const selectValue = options.filter(x => x.value === communityIdFilter)[0];

  return (
    <div>
      <div className="questions-header">
        <h4 className="text-uppercase font-weight-bold">
          {!isFeed
            ? translations[messages.title.id]
            : translations[messages.myfeed.id]}
          {`: ${questionsList.length}`}
        </h4>
        <div>
          <button className="btn btn-secondary ml-1" onClick={askQuestion}>
            {translations[messages.askQuestion.id]}
          </button>
          <FollowCommunityButton
            translations={translations}
            communityIdFilter={communityIdFilter}
            followedCommunities={followedCommunities}
            followHandler={followHandler}
          />
        </div>
      </div>
      <SelectField
        input={{
          onChange: e => getInitQuestions(e.value),
          value: selectValue,
        }}
        isMulti={false}
        isClearable={false}
        isSearchable
        isDisabled={false}
        options={options}
      />
    </div>
  );
};

QuestionsHeader.propTypes = {
  translations: PropTypes.object,
  communities: PropTypes.array,
  getInitQuestions: PropTypes.func,
  followHandler: PropTypes.func,
  communityIdFilter: PropTypes.number,
  followedCommunities: PropTypes.array,
  questionsList: PropTypes.array,
  parentPage: PropTypes.string,
};

export { askQuestion };
export default QuestionsHeader;
