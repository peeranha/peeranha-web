import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { TEXT_PRIMARY, BORDER_SECONDARY } from 'style-constants';

import pencilIcon from 'images/pencil.svg?inline';
import deleteIcon from 'images/deleteIcon.svg?inline';
import blockIcon from 'images/blockIcon.svg?inline';

import Base from 'components/Base';
import Span from 'components/Span';

import UserInfo from './UserInfo';
import ContentRating from './ContentRating';
import Button, { BlockButton } from './Button';

import messages from './messages';

const BaseStyled = Base.extend`
  padding: 0;
  border-right: 1px solid ${BORDER_SECONDARY};
  flex-basis: 210px;
`;

export const ContentHeader = props => (
  <Base position="top" className="d-flex align-items-center p-0">
    <BaseStyled>
      <ContentRating {...props} />
    </BaseStyled>

    <div className="flex-grow-1">
      <Base className="d-flex align-items-center justify-content-between">
        <UserInfo
          avatar={props.userInfo.ipfs_avatar}
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
              <img className="mr-2" src={pencilIcon} alt="icon" />
              <FormattedMessage {...messages.editButton} />
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
              <img className="mr-2" src={deleteIcon} alt="icon" />
              <FormattedMessage {...messages.deleteButton} />
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
              <img className="mr-2" src={blockIcon} alt="icon" />
              <FormattedMessage {...messages.voteToDelete} />
            </Span>
          </BlockButton>
        </div>
      </Base>
    </div>
  </Base>
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
