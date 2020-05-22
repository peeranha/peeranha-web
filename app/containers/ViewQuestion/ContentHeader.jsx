import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import {
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from 'react-share';

import {
  BORDER_SECONDARY,
  SECONDARY_SPECIAL,
  BG_BLACK,
  BG_LIGHT,
} from 'style-constants';

import pencilIcon from 'images/pencil.svg?inline';
import shareIcon from 'images/shareIcon.svg?inline';
import deleteIcon from 'images/deleteIcon.svg?inline';
import blockIcon from 'images/blockIcon.svg?external';
import twitter from 'images/social-media-logos/logo-twitter-glyph-24.svg?inline';
import telegram from 'images/social-media-logos/logo-telegram-glyph-24.svg?inline';
import reddit from 'images/social-media-logos/logo-reddit-glyph-24.svg?inline';

import { getUserAvatar } from 'utils/profileManagement';
import { MODERATOR_KEY, APP_TWITTER_NICKNAME } from 'utils/constants';

import Icon from 'components/Icon';
import Input from 'components/Input';

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

const DropdownBox = styled.div`
  position: relative;
`;

const DropdownModal = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: -10px;
  z-index: 9;

  padding: 15px;
  padding-bottom: 10px;
  width: 300px;

  background-color: ${BG_LIGHT};
  border-radius: 3px;
  box-shadow: 0 2px 4px 0 ${SECONDARY_SPECIAL};

  p {
    margin-bottom: 10px;

    color: ${BG_BLACK};
  }

  input {
    padding-right: 14px;
  }
`;

const DropdownModalFooter = styled.footer`
  display: flex;
  padding-top: 15px;

  button {
    margin-right: 15px;
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
    questionData,
    intl,
  } = props;

  const changeQuestionTypeWithRatingRestore = event =>
    changeQuestionTypeDispatch(true, event);
  const changeQuestionTypeWithoutRatingRestore = event =>
    changeQuestionTypeDispatch(false, event);

  const [isSharingModalHidden, changeSharingModalView] = useState(true);

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

          {questionData.user === userInfo.user && (
            <DropdownBox>
              <Button
                show={questionData.user === userInfo.user}
                onClick={() => changeSharingModalView(!isSharingModalHidden)}
              >
                <img src={shareIcon} alt="icon" />
                <FormattedMessage {...messages.shareButton} />
              </Button>

              {!isSharingModalHidden && (
                <DropdownModal>
                  <p>
                    <b>
                      <FormattedMessage {...messages.shareTitle} />
                    </b>
                  </p>
                  <Input
                    input={{ value: window.location.href }}
                    readOnly
                    type="text"
                  />
                  <DropdownModalFooter>
                    <TwitterShareButton
                      url={window.location.href}
                      title={questionData.content.title}
                      via={APP_TWITTER_NICKNAME}
                    >
                      <img
                        src={twitter}
                        alt={intl.formatMessage({
                          id: messages.shareTwitter.id,
                        })}
                      />
                    </TwitterShareButton>
                    <TelegramShareButton
                      url={window.location.href}
                      title={questionData.content.title}
                    >
                      <img
                        src={telegram}
                        alt={intl.formatMessage({
                          id: messages.shareTelegram.id,
                        })}
                      />
                    </TelegramShareButton>
                    <RedditShareButton
                      url={window.location.href}
                      title={questionData.content.title}
                    >
                      <img
                        src={reddit}
                        alt={intl.formatMessage({
                          id: messages.shareReddit.id,
                        })}
                      />
                    </RedditShareButton>
                  </DropdownModalFooter>
                </DropdownModal>
              )}
            </DropdownBox>
          )}

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
  isQuestion: PropTypes.bool,
  intl: intlShape.isRequired,
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
  )(injectIntl(ContentHeader)),
);
