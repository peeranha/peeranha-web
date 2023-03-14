import React, { useState, useRef, useMemo, useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import {
  BORDER_SECONDARY,
  BORDER_PRIMARY,
  BORDER_ATTENTION_LIGHT,
} from 'style-constants';

import pencilIcon from 'images/pencil.svg?external';
import shareIcon from 'images/shareIcon.svg?external';
import deleteIcon from 'images/deleteIcon.svg?external';
import blockIcon from 'images/blockIcon.svg?external';

import { getRatingByCommunity, getUserAvatar } from 'utils/profileManagement';
import { useOnClickOutside } from 'utils/click-listners';

import blockchainLogo from 'images/blockchain-outline-32.svg?external';
import IPFSInformation from 'containers/Questions/Content/Body/IPFSInformation';
import SeeOriginal from 'containers/ViewQuestion/SeeOriginal';
import { getUserName } from 'utils/user';
import { IconSm, IconMd } from 'components/Icon/IconWithSizes';
import UserInfo from './UserInfo';
import ContentRating from './ContentRating';
import Button from './Button';
import AreYouSure from './AreYouSure';
import SharingModal from './SharingModal';

import { makeSelectProfileInfo } from '../AccountProvider/selectors';
import { changeQuestionType, payBounty } from './actions';
import { QUESTION_TYPE } from './constants';
import {
  getPermissions,
  hasCommunityModeratorRole,
  hasGlobalModeratorRole,
  hasProtocolAdminRole,
} from 'utils/properties';
import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

const RatingBox = styled.div`
  border-right: 1px solid ${BORDER_SECONDARY};
  flex-basis: 193px;
  padding: 0 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 680px) {
    border-right: none;
    border-bottom: 1px solid ${BORDER_SECONDARY};
  }

  @media only screen and (max-width: 680px) {
    padding: 0 10px;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: space-between;
  padding: 0 30px;

  button {
    border-radius: 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;

  > * {
    margin: 0 10px;

    @media only screen and (max-width: 470px) {
      margin: 0 5px;
    }

    @media only screen and (max-width: 400px) {
      margin: 0 2px;
    }

    @media only screen and (max-width: 330px) {
      margin: 0 1px;
    }
  }

  @media only screen and (max-width: 360px) {
    width: 40%;
    justify-content: space-between;
    margin-left: -15px;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${BORDER_SECONDARY};
  height: 77px;

  @media only screen and (max-width: 1250px) {
    > div {
      padding: 15px;
    }
  }

  @media only screen and (max-width: 680px) {
    flex-direction: column;
    align-items: stretch;
    height: auto;

    > div {
      flex-basis: 60px;
    }
  }

  @media only screen and (max-width: 310px) {
    > div {
      padding: 0 2px;
    }
  }
`;

const DropdownBox = styled.div`
  position: relative;
`;

const ContentHeader = (props) => {
  const {
    author,
    type,
    postTime,
    locale,
    answerId,
    buttonParams,
    voteToDelete,
    ids,
    editItem,
    commentId,
    deleteItem,
    changeQuestionTypeDispatch,
    questionData,
    profile,
    infiniteImpact,
    histories,
    isPostContent,
    translation,
    language,
    isOriginalLanguage,
    showOriginal,
    setShowOriginal,
  } = props;
  const { t } = useTranslation();

  const ipfsHashValue =
    type === QUESTION_TYPE
      ? questionData.ipfsHash
      : questionData.answers.find((answer) => answer.id === answerId).ipfsHash;

  const formattedHistories =
    type === QUESTION_TYPE
      ? histories
      : histories?.filter(
          (history) => history.reply?.id === `${questionData.id}-${answerId}`,
        );
  const bestReplyId = questionData.bestReply;

  const [isModalOpen, setModalOpen] = useState(false);
  const refSharingModal = useRef(null);
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const refPopover = useRef(null);

  useOnClickOutside(refPopover, () => setPopoverOpen(false));

  useOnClickOutside(refSharingModal, () => setModalOpen(false));

  const isGlobalAdmin = useMemo(
    () =>
      hasGlobalModeratorRole(getPermissions(profile)) ||
      hasCommunityModeratorRole(
        getPermissions(profile),
        questionData.communityId,
      ) ||
      hasProtocolAdminRole(getPermissions(profile)),
    [profile],
  );

  const isTemporaryAccount = false;

  const isItWrittenByMe = useMemo(
    () => (profile ? author.user === profile.user : false),
    [profile, author],
  );

  const isMarkedTheBest = useMemo(
    () => (bestReplyId !== 0 ? bestReplyId === answerId : false),
    [bestReplyId],
  );

  const changeQuestionTypeWithRatingRestore = useCallback(
    (event) => changeQuestionTypeDispatch(event),
    [changeQuestionTypeDispatch],
  );

  // eslint-disable-next-line camelcase
  const correctAnswerId = questionData?.correct_answer_id;
  const correctAnswer = questionData?.answers?.find(
    ({ id }) => id === correctAnswerId,
  );
  const correctAnswerUserName = correctAnswer?.user;
  const currentUserName = profile?.user;

  let deleteAction = null;
  if (isItWrittenByMe) {
    deleteAction = deleteItem;
  } else {
    deleteAction = isGlobalAdmin || infiniteImpact ? deleteItem : null;
  }

  const shouldShowDeleteBtn =
    !profile ||
    (!!profile && !isItWrittenByMe && !isGlobalAdmin && !infiniteImpact);

  return (
    <Box>
      <RatingBox>
        <ContentRating {...props} />
      </RatingBox>

      <ItemInfo>
        <UserInfo
          avatar={getUserAvatar(author.avatar)}
          name={getUserName(author.displayName, author.id)}
          account={author.user}
          rating={getRatingByCommunity(author, props.commId)}
          type={type}
          postTime={postTime}
          locale={locale}
          achievementsCount={author.achievements?.length}
          isTemporaryAccount={isTemporaryAccount}
        />
        <ButtonContainer>
          <div>
            <SeeOriginal
              isOriginalLanguage={isOriginalLanguage}
              showOriginal={showOriginal}
              setShowOriginal={setShowOriginal}
              locale={locale}
              translation={translation}
              language={
                type === QUESTION_TYPE ? questionData?.language : language
              }
            />
          </div>
          {infiniteImpact ? (
            <Button
              show={
                !profile ||
                (!!profile &&
                  !isItWrittenByMe &&
                  !isGlobalAdmin &&
                  !infiniteImpact)
              }
              id={`${type}_vote_to_delete_${answerId}`}
              params={buttonParams}
              onClick={voteToDelete}
              disabled={ids.includes(`${type}_vote_to_delete_${answerId}`)}
              isVotedToDelete={true}
            >
              <IconSm icon={blockIcon} fill={BORDER_ATTENTION_LIGHT} />
              <span>{t('post.voteToDelete')}</span>
            </Button>
          ) : null}

          {!shouldShowDeleteBtn && (
            <div id={`${type}_delete_${answerId}`}>
              <AreYouSure
                submitAction={deleteAction}
                isGlobalAdmin={isGlobalAdmin}
                isMarkedTheBest={isMarkedTheBest}
                Button={({ onClick }) => (
                  <Button
                    show={!shouldShowDeleteBtn}
                    id={`${type}_delete_${answerId}`}
                    params={buttonParams}
                    onClick={onClick}
                    disabled={ids.includes(`${type}_delete_${answerId}`)}
                  >
                    <IconMd
                      icon={deleteIcon}
                      fill={colors.contentHeader || BORDER_PRIMARY}
                    />
                    <span>{t('post.deleteButton')}</span>
                  </Button>
                )}
              />
            </div>
          )}

          {type === QUESTION_TYPE && (
            <DropdownBox>
              <Button
                show
                disabled={isModalOpen}
                onClick={() => setModalOpen(true)}
              >
                <IconSm icon={shareIcon} />
                <span>{t('post.shareButton')}</span>
              </Button>

              {isModalOpen && (
                <div ref={refSharingModal}>
                  <SharingModal questionData={questionData} />
                </div>
              )}
            </DropdownBox>
          )}

          <DropdownBox>
            <Button
              show
              disabled={isPopoverOpen}
              onClick={() => setPopoverOpen(true)}
            >
              <IconMd icon={blockchainLogo} />
              <span>{t('common.source')}</span>
            </Button>

            {isPopoverOpen && (
              <div ref={refPopover}>
                <IPFSInformation
                  locale={locale}
                  ipfsHash={ipfsHashValue}
                  histories={formattedHistories}
                />
              </div>
            )}
          </DropdownBox>

          <Button
            show={
              (!!profile && isItWrittenByMe) || (isPostContent && isGlobalAdmin)
            }
            onClick={editItem[0]}
            params={{ ...buttonParams, link: editItem[1] }}
            id={`redirect-to-edit-item-${answerId}-${buttonParams.questionId}-${commentId}`}
          >
            <IconMd icon={pencilIcon} />
            <span>{t('post.editButton')}</span>
          </Button>
        </ButtonContainer>
      </ItemInfo>
    </Box>
  );
};

ContentHeader.propTypes = {
  author: PropTypes.object,
  locale: PropTypes.string,
  lastEditedDate: PropTypes.number,
  postTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
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
  giveBountyDispatch: PropTypes.func,
  questionData: PropTypes.object,
  profile: PropTypes.object,
  isChangeTypeAvailable: PropTypes.bool,
  infiniteImpact: PropTypes.bool,
  history: PropTypes.array,
  translation: PropTypes.object,
  language: PropTypes.string,
  isOriginalLanguage: PropTypes.bool,
  showOriginal: PropTypes.bool,
  setShowOriginal: PropTypes.func,
};

export default React.memo(
  connect(
    (state) => ({
      profile: makeSelectProfileInfo()(state),
    }),
    (dispatch) => ({
      changeQuestionTypeDispatch: bindActionCreators(
        changeQuestionType,
        dispatch,
      ),
      giveBountyDispatch: bindActionCreators(payBounty, dispatch),
    }),
  )(ContentHeader),
);
