import React, { useState, useRef, useMemo, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { css } from '@emotion/react';

import {
  BORDER_SECONDARY,
  BORDER_PRIMARY,
  BORDER_ATTENTION_LIGHT,
  TEXT_PRIMARY,
} from 'style-constants';

import pencilIcon from 'images/pencil.svg?external';
import shareIcon from 'images/shareIcon.svg?external';
import deleteIcon from 'images/deleteIcon.svg?external';
import blockIcon from 'images/blockIcon.svg?external';
import blockchainLogo from 'images/blockchain-outline-32.svg?external';

import { isSuiBlockchain } from 'utils/constants';
import { getRatingByCommunity, getUserAvatar } from 'utils/profileManagement';
import { useOnClickOutside } from 'utils/click-listners';
import {
  getPermissions,
  hasCommunityModeratorRole,
  hasGlobalModeratorRole,
  hasProtocolAdminRole,
  isBotAddress,
} from 'utils/properties';
import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';
import { getUserName } from 'utils/user';

import IPFSInformation from 'containers/Questions/Content/Body/IPFSInformation';
import SeeOriginal from 'containers/ViewQuestion/SeeOriginal';
import { ShareNetworkGraph, FileArrowUpGraph, TrashGraph } from 'components/icons';
import { IconSm, IconMd } from 'components/Icon/IconWithSizes';
import ViewTransactionLoader from 'components/icons/ViewTransactionLoader';
import { OptimisticPopover } from 'containers/ViewQuestion/OptimisticPopover';

import UserInfo from './UserInfo';
import ContentRating from './ContentRating';
import Button from './Button';
import AreYouSure from './AreYouSure';
import SharingModal from './SharingModal';
import { QUESTION_TYPE } from './constants';
import BotInfo from './BotInfo';
import { makeSelectProfileInfo } from '../AccountProvider/selectors';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

const RatingBox = styled.div`
  border-right: 1px solid ${graphCommunity ? '#3D3D54' : BORDER_SECONDARY};
  flex-basis: 193px;
  padding: 0 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 680px) {
    border-right: none;
    border-bottom: 1px solid ${graphCommunity ? '#3D3D54' : BORDER_SECONDARY};
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
  border-bottom: 1px solid ${graphCommunity ? '#3D3D54' : BORDER_SECONDARY};
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

const inlineBlockButton = {
  display: 'inline-block',
};

const transactionLoader = {
  color: graphCommunity ? 'rgba(111, 76, 255, 1)' : colors.linkColor || TEXT_PRIMARY,
};

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
  const isOptimisticPost = Boolean(questionData.optimisticHash);
  const deleteButtonId = `${type}_delete_${answerId}`;
  const sourceButtonId = `${type}_source_${answerId}`;
  const redirectToEditItemButtonId = `redirect-to-edit-item-${answerId}-${buttonParams.questionId}-${commentId}`;

  const ipfsHashValue =
    type === QUESTION_TYPE
      ? questionData.ipfsHash
      : questionData.answers.find((answer) => answer.id === answerId).ipfsHash;

  const formattedHistories =
    type === QUESTION_TYPE
      ? histories
      : histories?.filter((history) => history.reply?.id === `${questionData.id}-${answerId}`);
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
      hasCommunityModeratorRole(getPermissions(profile), questionData.communityId) ||
      hasProtocolAdminRole(getPermissions(profile)),
    [profile, questionData.communityId],
  );

  const isBot = isBotAddress(author);
  const isItWrittenByMe = useMemo(() => {
    const authorId = isSuiBlockchain ? author.id.toLowerCase() : author.user.toLowerCase();
    return profile ? authorId === profile.user.toLowerCase() : false;
  }, [profile, author]);

  const isMarkedTheBest = useMemo(
    () => (bestReplyId !== 0 ? bestReplyId === answerId : false),
    [answerId, bestReplyId],
  );

  let deleteAction;
  if (isItWrittenByMe) {
    deleteAction = deleteItem;
  } else {
    deleteAction = isGlobalAdmin || infiniteImpact ? deleteItem : null;
  }

  const shouldShowDeleteBtn =
    !profile || (!!profile && !isItWrittenByMe && !isGlobalAdmin && !infiniteImpact);

  return (
    <Box>
      <RatingBox>
        <ContentRating {...props} isOptimisticPost={isOptimisticPost} />
      </RatingBox>

      <ItemInfo>
        {isBot ? (
          <BotInfo
            postTime={postTime}
            locale={locale}
            messengerType={author.messengerType}
            isPost={isPostContent}
          />
        ) : (
          <UserInfo
            avatar={getUserAvatar(author.avatar)}
            name={getUserName(author.displayName, author.id)}
            account={author.user}
            rating={getRatingByCommunity(author, props.commId, props.communities, true)}
            type={type}
            postTime={postTime}
            locale={locale}
            achievementsCount={author.achievements?.length}
            isBot={isBot}
            handle={author.handle}
            messengerType={author.messengerType}
            customName={author.customName}
          />
        )}
        <ButtonContainer>
          <div>
            <SeeOriginal
              isOriginalLanguage={isOriginalLanguage}
              showOriginal={showOriginal}
              setShowOriginal={setShowOriginal}
              locale={locale}
              translation={translation}
              language={type === QUESTION_TYPE ? questionData?.language : language}
            />
          </div>
          {infiniteImpact ? (
            <Button
              show={
                !profile || (!!profile && !isItWrittenByMe && !isGlobalAdmin && !infiniteImpact)
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
            <OptimisticPopover
              isOptimisticPost={isOptimisticPost}
              networkId={questionData.networkId}
              transactionHash={questionData.optimisticHash}
            >
              <div id={deleteButtonId}>
                <AreYouSure
                  submitAction={deleteAction}
                  isGlobalAdmin={isGlobalAdmin}
                  isMarkedTheBest={isMarkedTheBest}
                  Button={({ onClick }) => (
                    <Button
                      show={!shouldShowDeleteBtn}
                      id={deleteButtonId}
                      params={buttonParams}
                      onClick={onClick}
                      disabled={ids.includes(deleteButtonId) || isOptimisticPost}
                      isDisabledWithStyle={isOptimisticPost}
                      css={css(inlineBlockButton)}
                    >
                      {graphCommunity ? (
                        <TrashGraph size={[20, 20]} fill="rgba(111, 76, 255, 1)" />
                      ) : (
                        <IconMd icon={deleteIcon} fill={colors.contentHeader || BORDER_PRIMARY} />
                      )}

                      <span>{t('post.deleteButton')}</span>
                    </Button>
                  )}
                />
              </div>
            </OptimisticPopover>
          )}

          {type === QUESTION_TYPE && (
            <DropdownBox>
              <Button
                show
                disabled={isModalOpen}
                onClick={() => setModalOpen(true)}
                css={css(inlineBlockButton)}
              >
                {graphCommunity ? (
                  <ShareNetworkGraph size={[20, 20]} fill="rgba(111, 76, 255, 1)" />
                ) : (
                  <IconSm icon={shareIcon} />
                )}
                <span>{t('post.shareButton')}</span>
              </Button>

              {isModalOpen && (
                <div ref={refSharingModal}>
                  <SharingModal questionData={questionData} />
                </div>
              )}
            </DropdownBox>
          )}

          <OptimisticPopover
            isOptimisticPost={isOptimisticPost}
            networkId={questionData.networkId}
            transactionHash={questionData.optimisticHash}
          >
            <DropdownBox>
              <Button
                show
                id={sourceButtonId}
                disabled={isPopoverOpen || isOptimisticPost}
                isDisabledWithStyle={isOptimisticPost}
                onClick={() => setPopoverOpen(true)}
                css={css(inlineBlockButton)}
              >
                {graphCommunity ? (
                  <FileArrowUpGraph size={[20, 20]} fill="rgba(111, 76, 255, 1)" />
                ) : (
                  <IconMd icon={blockchainLogo} />
                )}
                <span>{t('common.source')}</span>
              </Button>

              {isPopoverOpen && (
                <div ref={refPopover}>
                  <IPFSInformation
                    locale={locale}
                    ipfsHash={ipfsHashValue}
                    histories={formattedHistories}
                    networkId={props.questionData.networkId}
                  />
                </div>
              )}
            </DropdownBox>
          </OptimisticPopover>

          <OptimisticPopover
            isOptimisticPost={isOptimisticPost}
            networkId={questionData.networkId}
            transactionHash={questionData.optimisticHash}
          >
            <Button
              show={(!!profile && isItWrittenByMe) || (isPostContent && isGlobalAdmin)}
              onClick={editItem[0]}
              params={{ ...buttonParams, link: editItem[1] }}
              id={redirectToEditItemButtonId}
              css={css(inlineBlockButton)}
              disabled={isOptimisticPost}
              isDisabledWithStyle={isOptimisticPost}
            >
              <IconMd icon={pencilIcon} />
              <span>{t('post.editButton')}</span>
            </Button>
          </OptimisticPopover>

          {isOptimisticPost && (
            <OptimisticPopover
              isOptimisticPost={isOptimisticPost}
              networkId={questionData.networkId}
              transactionHash={questionData.optimisticHash}
            >
              <ViewTransactionLoader css={css(transactionLoader)} />
            </OptimisticPopover>
          )}
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
  connect((state) => ({
    profile: makeSelectProfileInfo()(state),
  }))(ContentHeader),
);
