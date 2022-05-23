import React, { useState, useRef, useMemo, useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  BORDER_SECONDARY,
  BORDER_PRIMARY,
  BORDER_ATTENTION_LIGHT,
} from 'style-constants';

import pencilIcon from 'images/pencil.svg?external';
import shareIcon from 'images/shareIcon.svg?external';
import deleteIcon from 'images/deleteIcon.svg?external';
import blockIcon from 'images/blockIcon.svg?external';
import changeTypeIcon from 'images/change-type.svg?external';

import { getRatingByCommunity, getUserAvatar } from 'utils/profileManagement';
import { useOnClickOutside } from 'utils/click-listners';

import { IconSm, IconMd } from 'components/Icon/IconWithSizes';
import UserInfo from './UserInfo';
import ContentRating from './ContentRating';
import Button from './Button';
import AreYouSure from './AreYouSure';
import SharingModal from './SharingModal';

import messages from './messages';
import { makeSelectProfileInfo } from '../AccountProvider/selectors';
import { changeQuestionType, payBounty } from './actions';
import { QUESTION_TYPE } from './constants';
import { getPermissions, hasGlobalModeratorRole } from '../../utils/properties';
import blockchainLogo from 'images/blockchain-outline-32.svg?external';
import IPFSInformation from 'containers/Questions/Content/Body/IPFSInformation';
import commonMessages from 'common-messages';
import { POST_TYPE } from 'utils/constants';

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

  button {
    border-radius: 0;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${BORDER_SECONDARY};
  height: 77px;

  @media only screen and (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
    height: auto;

    > div {
      flex-basis: 60px;
      padding: 0 15px;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
`;

const DropdownBox = styled.div`
  position: relative;
`;

const ContentHeader = props => {
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
    giveBountyDispatch,
    questionData,
    profile,
    isChangeTypeAvailable,
    infiniteImpact,
    histories,
  } = props;

  const ipfsHashValue =
    type === QUESTION_TYPE
      ? questionData.ipfsHash
      : questionData.answers.find(answer => answer.id === answerId).ipfsHash;

  const formattedHistories =
    type === QUESTION_TYPE
      ? histories
      : histories?.filter(
          history => history.reply?.id === `${questionData.id}-${answerId}`,
        );

  const [isModalOpen, setModalOpen] = useState(false);
  const refSharingModal = useRef(null);
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const refPopover = useRef(null);

  useOnClickOutside(refPopover, () => setPopoverOpen(false));

  useOnClickOutside(refSharingModal, () => setModalOpen(false));

  const isGlobalAdmin = useMemo(
    () => hasGlobalModeratorRole(getPermissions(profile)),
    [profile],
  );
  //todo remove integer_properties
  const isTemporaryAccount = false;
  //   useMemo(
  //   () =>
  //     !!author?.['integer_properties'].find(
  //       x => x.key === TEMPORARY_ACCOUNT_KEY && x.value,
  //     ),
  //   [author],
  // );
  const isItWrittenByMe = useMemo(
    () => (profile ? author.user === profile.user : false),
    [profile, author],
  );

  const changeQuestionTypeWithRatingRestore = useCallback(
    event => changeQuestionTypeDispatch(event),
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
  return (
    <Box>
      <RatingBox>
        <ContentRating {...props} />
      </RatingBox>

      <ItemInfo>
        <UserInfo
          avatar={getUserAvatar(author.avatar)}
          name={author?.['displayName']}
          account={author.user}
          rating={getRatingByCommunity(author, props.commId)}
          type={type}
          postTime={postTime}
          locale={locale}
          achievementsCount={author.achievements?.length}
          isTemporaryAccount={isTemporaryAccount}
        />

        <Buttons>
          {type === QUESTION_TYPE && (
            <Button
              id={`${type}_change_type_with_rating_restore_${answerId}`}
              show={
                (isGlobalAdmin || isChangeTypeAvailable) &&
                questionData.postType !== POST_TYPE.tutorial
              }
              onClick={changeQuestionTypeWithRatingRestore}
              disabled={ids.includes(
                `${type}_change_type_with_rating_restore_${answerId}`,
              )}
            >
              <IconSm icon={changeTypeIcon} fill={BORDER_PRIMARY} />
              <FormattedMessage {...messages.changeQuestionType} />
            </Button>
          )}

          {/* {type === QUESTION_TYPE && (
            <Button
              id={`${type}_give_bounty_${answerId}`}
              show={
                currentUserName && correctAnswerUserName === currentUserName
              }
              onClick={event => giveBountyDispatch(event)}
              disabled={ids.includes(`${type}_give_bounty_${answerId}`)}
            >
              <IconSm icon={currencyPeer} fill={BORDER_PRIMARY} />
              <FormattedMessage {...messages.getBounty} />
            </Button>
          )} */}
          {infiniteImpact ? (
            <Button
              show={
                !profile ||
                (!!profile &&
                  (!isItWrittenByMe && !isGlobalAdmin && !infiniteImpact))
              }
              id={`${type}_vote_to_delete_${answerId}`}
              params={buttonParams}
              onClick={voteToDelete}
              disabled={ids.includes(`${type}_vote_to_delete_${answerId}`)}
              isVotedToDelete={true}
            >
              <IconSm icon={blockIcon} fill={BORDER_ATTENTION_LIGHT} />
              <FormattedMessage {...messages.voteToDelete} />
            </Button>
          ) : null}

          <div id={`${type}_delete_${answerId}`}>
            <AreYouSure
              submitAction={deleteAction}
              Button={({ onClick }) => (
                <Button
                  show={
                    !!profile &&
                    (isItWrittenByMe || isGlobalAdmin || infiniteImpact)
                  }
                  id={`${type}_delete_${answerId}`}
                  params={buttonParams}
                  onClick={onClick}
                  disabled={ids.includes(`${type}_delete_${answerId}`)}
                >
                  <IconMd icon={deleteIcon} fill={BORDER_PRIMARY} />
                  <FormattedMessage {...messages.deleteButton} />
                </Button>
              )}
            />
          </div>

          {type === QUESTION_TYPE && (
            <DropdownBox>
              <Button
                show
                disabled={isModalOpen}
                onClick={() => setModalOpen(true)}
              >
                <IconSm icon={shareIcon} />
                <FormattedMessage {...messages.shareButton} />
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
              <FormattedMessage id={commonMessages.source.id} />
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
            show={!!profile && isItWrittenByMe}
            onClick={editItem[0]}
            params={{ ...buttonParams, link: editItem[1] }}
            id={`redirect-to-edit-item-${answerId}-${
              buttonParams.questionId
            }-${commentId}`}
          >
            <IconMd icon={pencilIcon} />
            <FormattedMessage {...messages.editButton} />
          </Button>
        </Buttons>
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
};

export default React.memo(
  connect(
    state => ({
      profile: makeSelectProfileInfo()(state),
    }),
    dispatch => ({
      changeQuestionTypeDispatch: bindActionCreators(
        changeQuestionType,
        dispatch,
      ),
      giveBountyDispatch: bindActionCreators(payBounty, dispatch),
    }),
  )(ContentHeader),
);
