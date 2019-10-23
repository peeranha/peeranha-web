import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { TEXT_PRIMARY, BORDER_SECONDARY } from 'style-constants';

import pencilIcon from 'images/pencil.svg?inline';
import deleteIcon from 'images/deleteIcon.svg?inline';
import blockIcon from 'images/blockIcon.svg?inline';

import { getUserAvatar } from 'utils/profileManagement';

import Base from 'components/Base';
import Span from 'components/Span';
import MediumImage from 'components/Img/MediumImage';

import UserInfo from './UserInfo';
import ContentRating from './ContentRating';
import Button, { BlockButton } from './Button';

import messages from './messages';

const RatingBox = styled.div`
  border-right: 1px solid ${BORDER_SECONDARY};
  flex-basis: 210px;

  @media only screen and (max-width: 576px) {
    border-right: none;
    border-bottom: 1px solid ${BORDER_SECONDARY};
    flex-basis: 0px;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid ${BORDER_SECONDARY};

  @media only screen and (max-width: 576px) {
    flex-direction: column;
    align-items: stretch;

    ${MediumImage} {
      width: 32px;
      height: 32px;
    }
  }
`;

export const ContentHeader = props => (
  <Box>
    <RatingBox>
      <ContentRating {...props} />
    </RatingBox>

    <div className="flex-grow-1">
      <Base className="d-flex align-items-center justify-content-between">
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
            show={props.isItWrittenByMe}
            params={props.buttonParams}
            onClick={props.editItem}
          >
            <Span
              className="d-flex align-items-center"
              color={TEXT_PRIMARY}
              fontSize="16"
            >
              <img src={pencilIcon} alt="icon" />
              <span className="d-none d-md-inline-block ml-2">
                <FormattedMessage {...messages.editButton} />
              </span>
            </Span>
          </Button>

          <Button
            show={props.isItWrittenByMe}
            id={`${props.type}_delete_${props.answerId}`}
            params={props.buttonParams}
            onClick={props.deleteItem}
          >
            <Span
              className="d-flex align-items-center"
              color={TEXT_PRIMARY}
              fontSize="16"
            >
              <img src={deleteIcon} alt="icon" />
              <span className="d-none d-md-inline-block ml-2">
                <FormattedMessage {...messages.deleteButton} />
              </span>
            </Span>
          </Button>

          <BlockButton
            className="d-flex align-items-center"
            isItWrittenByMe={props.isItWrittenByMe}
            id={`${props.type}_vote_to_delete_${props.answerId}`}
            params={props.buttonParams}
            onClick={props.voteToDelete}
            isVotedToDelete={props.votingStatus.isVotedToDelete}
          >
            <Span
              className="d-flex align-items-center"
              color={TEXT_PRIMARY}
              fontSize="16"
            >
              <img src={blockIcon} alt="icon" />
              <span className="d-none d-md-inline-block ml-2">
                <FormattedMessage {...messages.voteToDelete} />
              </span>
            </Span>
          </BlockButton>
        </div>
      </Base>
    </div>
  </Box>
);

ContentHeader.propTypes = {
  userInfo: PropTypes.object,
  locale: PropTypes.string,
  lastEditedDate: PropTypes.number,
  postTime: PropTypes.number,
  type: PropTypes.string,
  isItWrittenByMe: PropTypes.bool,
  buttonParams: PropTypes.object,
  editItem: PropTypes.func,
  deleteItem: PropTypes.func,
  voteToDelete: PropTypes.func,
  answerId: PropTypes.number,
  votingStatus: PropTypes.object,
};

export default React.memo(ContentHeader);
