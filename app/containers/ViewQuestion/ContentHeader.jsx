import React, { useState, useRef, useMemo, useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { BORDER_SECONDARY, BORDER_PRIMARY, BORDER_ATTENTION_LIGHT } from 'style-constants';

import pencilIcon from 'images/pencil.svg?external';
import shareIcon from 'images/shareIcon.svg?external';
import deleteIcon from 'images/deleteIcon.svg?external';
import blockIcon from 'images/blockIcon.svg?external';

import { getUserAvatar } from 'utils/profileManagement';
import { ADMIN_GLOBAL } from 'utils/constants';
import { useOnClickOutside } from 'utils/click-listners';

import { IconSm, IconMd } from 'components/Icon/IconWithSizes';
import UserInfo from './UserInfo';
import ContentRating from './ContentRating';
import Button from './Button';
import AreYouSure from './AreYouSure';
import SharingModal from './SharingModal';

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

const ContentHeader = props => {
  const {
    userInfo,
    type,
    postTime,
    locale,
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
    profile,
  } = props;
  const [isModalOpen, setModalOpen] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setModalOpen(false));

  const isGlobalModerator = useMemo(
    () => !!profile?.['integer_properties'].find(x => x.key === ADMIN_GLOBAL),
    [profile],
  );

  const isItWrittenByMe = useMemo(
    () => (profile ? userInfo.user === profile.user : false),
    [profile, userInfo],
  );

  const changeQuestionTypeWithRatingRestore = useCallback(
    event => changeQuestionTypeDispatch(true, event),
    [changeQuestionTypeDispatch],
  );

  // #define COMMUNITY_ADMIN_FLG_INFINITE_ENERGY (1 << 0)
  // #define COMMUNITY_ADMIN_FLG_INFINITE_IMPACT (1 << 1)
  // #define COMMUNITY_ADMIN_FLG_IGNORE_RATING (1 << 2)
  // #define COMMUNITY_ADMIN_FLG_CREATE_TAG (1 << 4)
  // #define COMMUNITY_ADMIN_FLG_CHANGE_QUESTION_STATUS (1 << 5)
  // #define COMMUNITY_ADMIN_FLG_CHANGE_TOP_QUESTION (1 << 6)
  // #define COMMUNITY_ADMIN_FLG_OFFICIAL_ANSWER  (1 << 7)

  return (
    <Box>
      <RatingBox>
        <ContentRating {...props} />
      </RatingBox>

      <ItemInfo>
        <UserInfo
          avatar={getUserAvatar(userInfo.ipfs_avatar)}
          name={userInfo?.['display_name']}
          account={userInfo.user}
          rating={userInfo.rating}
          type={type}
          postTime={postTime}
          locale={locale}
        />

        <div className="d-flex align-items-center">
          {type === QUESTION_TYPE && (
            <Button
              id={`${type}_change_type_with_rating_restore_${answerId}`}
              show={isGlobalModerator}
              onClick={changeQuestionTypeWithRatingRestore}
              disabled={ids.includes(
                `${type}_change_type_with_rating_restore_${answerId}`,
              )}
            >
              <FormattedMessage {...messages.changeQuestionType} />
            </Button>
          )}

          <Button
            show={!profile || (!!profile && !isItWrittenByMe)}
            id={`${type}_vote_to_delete_${answerId}`}
            params={buttonParams}
            onClick={voteToDelete}
            disabled={ids.includes(`${type}_vote_to_delete_${answerId}`)}
            isVotedToDelete={isVotedToDelete}
          >
            <IconSm icon={blockIcon} fill={isVotedToDelete ? BORDER_ATTENTION_LIGHT : BORDER_PRIMARY} />
            <FormattedMessage {...messages.voteToDelete} />
          </Button>

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
                <div ref={ref}>
                  <SharingModal questionData={questionData} />
                </div>
              )}
            </DropdownBox>
          )}

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

          <div id={`${type}_delete_${answerId}`}>
            <AreYouSure
              submitAction={deleteItem}
              Button={({ onClick }) => (
                <Button
                  show={!!profile && isItWrittenByMe}
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
  profile: PropTypes.object,
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
    }),
  )(ContentHeader),
);
