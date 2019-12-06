import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { BORDER_SECONDARY } from 'style-constants';

import pencilIcon from 'images/pencil.svg?inline';
import deleteIcon from 'images/deleteIcon.svg?inline';
import blockIcon from 'images/blockIcon.svg?external';

import { getUserAvatar } from 'utils/profileManagement';

import Icon from 'components/Icon';

import UserInfo from './UserInfo';
import ContentRating from './ContentRating';
import Button from './Button';
import AreYouSure from './AreYouSure';

import messages from './messages';

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

export const ContentHeader = props => (
  <Box>
    <RatingBox>
      <ContentRating {...props} />
    </RatingBox>

    <ItemInfo>
      <UserInfo
        avatar={getUserAvatar(props.userInfo.ipfs_avatar)}
        name={props.userInfo.display_name}
        account={props.userInfo.user}
        rating={props.userInfo.rating}
        type={props.type}
        postTime={props.postTime}
        locale={props.locale}
      />

      <div className="d-flex align-items-center">
        <Button
          show={!props.isItWrittenByMe}
          id={`${props.type}_vote_to_delete_${props.answerId}`}
          params={props.buttonParams}
          onClick={props.voteToDelete}
          disabled={props.voteToDeleteLoading}
          isVotedToDelete={props.votingStatus.isVotedToDelete}
        >
          <Icon icon={blockIcon} width="14" />
          <FormattedMessage {...messages.voteToDelete} />
        </Button>

        <Button
          show={props.isItWrittenByMe}
          onClick={props.editItem[0]}
          params={{ ...props.buttonParams, link: props.editItem[1] }}
          id={`redirect-to-edit-item-${props.answerId}-${props.questionId}-${
            props.commentId
          }`}
        >
          <img src={pencilIcon} alt="icon" />
          <FormattedMessage {...messages.editButton} />
        </Button>

        <AreYouSure
          submitAction={props.deleteItem}
          Button={({ onClick }) => (
            <Button
              show={props.isItWrittenByMe}
              id={`${props.type}_delete_${props.answerId}`}
              params={props.buttonParams}
              onClick={onClick}
              disabled={props.deleteItemLoading}
            >
              <img src={deleteIcon} alt="icon" />
              <FormattedMessage {...messages.deleteButton} />
            </Button>
          )}
        />
      </div>
    </ItemInfo>
  </Box>
);

ContentHeader.propTypes = {
  userInfo: PropTypes.object,
  locale: PropTypes.string,
  lastEditedDate: PropTypes.number,
  postTime: PropTypes.number,
  type: PropTypes.string,
  isItWrittenByMe: PropTypes.bool,
  deleteItemLoading: PropTypes.bool,
  voteToDeleteLoading: PropTypes.bool,
  buttonParams: PropTypes.object,
  editItem: PropTypes.func,
  deleteItem: PropTypes.func,
  voteToDelete: PropTypes.func,
  answerId: PropTypes.number,
  questionId: PropTypes.number,
  commentId: PropTypes.number,
  votingStatus: PropTypes.object,
};

export default React.memo(ContentHeader);
