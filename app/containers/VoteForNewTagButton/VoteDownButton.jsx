import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import AlreadyVoted from 'containers/VoteForNewCommunityButton/AlreadyVoted';

import Button from './index';
import { DisagreeButton } from './Button';

import { DOWNVOTE_METHOD } from './constants';

const VoteDownButton = ({ communityId, tagId }) => {
  const { t } = useTranslation();

  return (
    <Button
      communityId={communityId}
      tagId={tagId}
      clickMethod={DOWNVOTE_METHOD}
      render={({
        isUpvoted,
        isDownvoted,
        onClick,
        upvotesNumber,
        downvotesNumber,
        id,
        disabled,
      }) =>
        !isUpvoted && !isDownvoted ? (
          <DisagreeButton onClick={onClick} id={id} disabled={disabled}>
            {t('common.disagreeShort')}
          </DisagreeButton>
        ) : (
          <AlreadyVoted
            className="flex-column"
            onClick={onClick}
            choice={isDownvoted}
            id={id}
            disabled={disabled}
          >
            <p className="pb-1">{t('common.disagreeShort')}</p>
            <p>{`${downvotesNumber}/${downvotesNumber + upvotesNumber}`}</p>
          </AlreadyVoted>
        )
      }
    />
  );
};

VoteDownButton.propTypes = {
  id: PropTypes.string,
  tagId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default React.memo(VoteDownButton);
