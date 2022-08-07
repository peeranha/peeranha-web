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

import EditIcon from 'icons/Edit';
import ShareIcon from 'icons/Share';
import DeleteIcon from 'icons/Delete';
import BlockIcon from 'icons/Block';
import ChangeTypeIcon from 'icons/ChangeType';
import BlockchainIcon from 'icons/Blockchain';

import IPFSInformation from 'containers/Questions/Content/Body/IPFSInformation';
import commonMessages from 'common-messages';
import { POST_TYPE } from 'utils/constants';
import { getUserName } from 'utils/user';

import { getRatingByCommunity, getUserAvatar } from 'utils/profileManagement';
import { useOnClickOutside } from 'utils/click-listners';

import UserInfo from './UserInfo';
import ContentRating from './ContentRating';
import Button from './Button';
import AreYouSure from './AreYouSure';
import SharingModal from './SharingModal';

import messages from './messages';
import { makeSelectProfileInfo } from '../AccountProvider/selectors';
import { changeQuestionType, payBounty } from './actions';
import { QUESTION_TYPE } from './constants';
import {
  getPermissions,
  hasCommunityModeratorRole,
  hasGlobalModeratorRole,
} from '../../utils/properties';

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
    () =>
      hasGlobalModeratorRole(getPermissions(profile)) ||
      hasCommunityModeratorRole(
        getPermissions(profile),
        questionData.communityId,
      ),
    [profile],
  );
  //todo remove integer_properties
  const isTemporaryAccount = false;

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
  questionData?.answers?.find(({ id }) => id === correctAnswerId);
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
              <ChangeTypeIcon stroke={BORDER_PRIMARY} size={[14, 14]} />
              <FormattedMessage {...messages.changeQuestionType} />
            </Button>
          )}
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
              <BlockIcon
                stroke={BORDER_ATTENTION_LIGHT}
                fill={BORDER_ATTENTION_LIGHT}
              />
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
                  <DeleteIcon stroke={BORDER_PRIMARY} />
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
                <ShareIcon size={[14, 14]} />
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
              <BlockchainIcon size={[18, 18]} stroke="#576fed" />
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
            <EditIcon stroke="#576fed" />
            <FormattedMessage {...messages.editButton} />
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
