import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { BORDER_SECONDARY } from 'style-constants';

import pencilIcon from 'images/pencil.svg?inline';
import deleteIcon from 'images/deleteIcon.svg?inline';
import blockIcon from 'images/blockIcon.svg?external';

import { getUserAvatar } from 'utils/profileManagement';
import { MODERATOR_KEY } from 'utils/constants';

import Icon from 'components/Icon';

import UserInfo from './UserInfo';
import ContentRating from './ContentRating';
import Button from './Button';
import AreYouSure from './AreYouSure';

import messages from './messages';
import { makeSelectProfileInfo } from '../AccountProvider/selectors';
import { changeQuestionType } from './actions';
import { QUESTION_TYPE } from './constants';

const RatingBox = styled.div`
  border-right: 1px solid ${BORDER_SECONDARY};
  flex-basis: 193px;
  padding: 0 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 576px) {
    border-right: none;
    border-bottom: 1px solid ${BORDER_SECONDARY};
  }
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: space-between;
  padding: 0 30px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${BORDER_SECONDARY};
  height: 77px;

  @media only screen and (max-width: 576px) {
    flex-direction: column;
    align-items: stretch;
    height: auto;

    > div {
      flex-basis: 60px;
      padding: 0 15px;
    }
  }
`;

const ContentHeader = props => {
  const {
    userInfo,
    type,
    postTime,
    locale,
    isModerator,
    isItWrittenByMe,
    answerId,
    buttonParams,
    voteToDelete,
    ids,
    votingStatus: { isVotedToDelete },
    editItem,
    commentId,
    deleteItem,
    changeQuestionTypeDispatch,
  } = props;
  const changeQuestionTypeWithRatingRestore = event =>
    changeQuestionTypeDispatch(true, event);
  const changeQuestionTypeWithoutRatingRestore = event =>
    changeQuestionTypeDispatch(false, event);

  return (
    <Box>
      <RatingBox>
        <ContentRating {...props} />
      </RatingBox>

      <ItemInfo>
        <UserInfo
          avatar={getUserAvatar(userInfo.ipfs_avatar)}
          name={userInfo.display_name}
          account={userInfo.user}
          rating={userInfo.rating}
          type={type}
          postTime={postTime}
          locale={locale}
        />

        <div className="d-flex align-items-center">
          {type === QUESTION_TYPE && (
            <>
              <Button
                id={`${type}_change_type_with_rating_restore_${answerId}`}
                show={isModerator}
                onClick={changeQuestionTypeWithRatingRestore}
                disabled={ids.includes(
                  `${type}_change_type_with_rating_restore_${answerId}`,
                )}
              >
                <FormattedMessage
                  {...messages.changeQuestionTypeWithRatingRestore}
                />
              </Button>
              <Button
                id={`${type}_change_type_without_rating_restore_${answerId}`}
                show={isModerator}
                onClick={changeQuestionTypeWithoutRatingRestore}
                disabled={ids.includes(
                  `${type}_change_type_without_rating_restore_${answerId}`,
                )}
              >
                <FormattedMessage
                  {...messages.changeQuestionTypeWithoutRatingRestore}
                />
              </Button>
            </>
          )}
          <Button
            show={!isItWrittenByMe}
            id={`${type}_vote_to_delete_${answerId}`}
            params={buttonParams}
            onClick={voteToDelete}
            disabled={ids.includes(`${type}_vote_to_delete_${answerId}`)}
            isVotedToDelete={isVotedToDelete}
          >
            <Icon icon={blockIcon} width="14" />
            <FormattedMessage {...messages.voteToDelete} />
          </Button>

          <Button
            show={isItWrittenByMe}
            onClick={editItem[0]}
            params={{ ...buttonParams, link: editItem[1] }}
            id={`redirect-to-edit-item-${answerId}-${
              buttonParams.questionId
            }-${commentId}`}
          >
            <img src={pencilIcon} alt="icon" />
            <FormattedMessage {...messages.editButton} />
          </Button>

          <div id={`${type}_delete_${answerId}`}>
            <AreYouSure
              submitAction={deleteItem}
              Button={({ onClick }) => (
                <Button
                  show={isItWrittenByMe}
                  id={`${type}_delete_${answerId}`}
                  params={buttonParams}
                  onClick={onClick}
                  disabled={ids.includes(`${type}_delete_${answerId}`)}
                >
                  <img src={deleteIcon} alt="icon" />
                  <FormattedMessage {...messages.deleteButton} />
                </Button>
              )}
            />
          </div>
        </div>
      </ItemInfo>
    </Box>
  );
};

ContentHeader.propTypes = {
  userInfo: PropTypes.object,
  locale: PropTypes.string,
  lastEditedDate: PropTypes.number,
  postTime: PropTypes.number,
  type: PropTypes.string,
  isItWrittenByMe: PropTypes.bool,
  deleteItemLoading: PropTypes.bool,
  voteToDeleteLoading: PropTypes.bool,
  ids: PropTypes.array,
  buttonParams: PropTypes.object,
  editItem: PropTypes.array,
  deleteItem: PropTypes.func,
  voteToDelete: PropTypes.func,
  answerId: PropTypes.number,
  questionId: PropTypes.number,
  commentId: PropTypes.number,
  votingStatus: PropTypes.object,
  isModerator: PropTypes.bool,
  changeQuestionTypeDispatch: PropTypes.func,
  questionData: PropTypes.object,
};

export default React.memo(
  connect(
    state => {
      const profileInfo = makeSelectProfileInfo()(state);
      return {
        isModerator: profileInfo
          ? !!profileInfo.integer_properties.find(x => x.key === MODERATOR_KEY)
          : false,
      };
    },
    dispatch => ({
      changeQuestionTypeDispatch: bindActionCreators(
        changeQuestionType,
        dispatch,
      ),
    }),
  )(ContentHeader),
);
