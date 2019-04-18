import React from 'react';
import PropTypes from 'prop-types';
import { gray } from 'style-constants';
import { FormattedMessage } from 'react-intl';

import pencilIcon from 'svg/pencil';
import deleteIcon from 'svg/deleteIcon';
import blockIcon from 'svg/blockIcon';

import Base from 'components/Base';
import Span from 'components/Span';
import Icon from 'components/Icon';

import UserInfo from './UserInfo';
import ContentRating from './ContentRating';
import Button, { BlockButton } from './Button';

import messages from './messages';

const BaseStyled = Base.extend`
  padding: 0;
  border-right: 1px solid ${gray};
  flex-basis: 210px;
`;

export const ContentHeader = /* istanbul ignore next */ props => (
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

        <div>
          <Button
            show={props.isItWrittenByMe}
            params={props.buttonParams}
            onClick={props.editItem}
          >
            <Span color="blue" fontSize="16">
              <Icon icon={pencilIcon} />
              <FormattedMessage {...messages.editButton} />
            </Span>
          </Button>

          <Button
            show={props.isItWrittenByMe}
            id={`${props.type}_delete_${props.answerId}`}
            params={props.buttonParams}
            onClick={props.deleteItem}
          >
            <Span color="blue" fontSize="16">
              <Icon icon={deleteIcon} />
              <FormattedMessage {...messages.deleteButton} />
            </Span>
          </Button>

          <BlockButton
            isItWrittenByMe={props.isItWrittenByMe}
            id={`${props.type}_vote_to_delete_${props.answerId}`}
            params={props.buttonParams}
            onClick={props.voteToDelete}
            isVotedToDelete={props.votingStatus.isVotedToDelete}
          >
            <Icon icon={blockIcon} />
            <FormattedMessage {...messages.voteToDelete} />
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
