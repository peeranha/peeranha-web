import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import messages from 'common-messages';

import noAvatar from 'images/ico-user-no-photo.png';

import { getFormattedDate } from 'utils/datetime';
import { MONTH_3LETTERS__DAY_TIME } from 'utils/constants';

import RatingStatus from 'components/RatingStatus';
import MediumImage from 'components/Img/MediumImage';
import Span from 'components/Span';
import A from 'components/A';

import { ANSWER_TYPE, COMMENT_TYPE } from './constants';

const UserInfo = ({
  rating,
  name,
  avatar,
  account,
  type,
  postTime,
  locale,
}) => (
  <div className="d-flex">
    {type !== COMMENT_TYPE && (
      <MediumImage
        className="mr-2"
        isBordered
        src={avatar || noAvatar}
        alt="avatar"
      />
    )}

    <div
      className={`d-flex justify-content-center ${
        type !== COMMENT_TYPE ? 'flex-column' : ''
      }`}
    >
      <A
        to={routes.profileView(account)}
        className="d-flex align-items-center mr-2"
      >
        <Span className="mr-2" fontSize="14">
          {name}
        </Span>
        <RatingStatus rating={rating} size="sm" isRankOff />
      </A>

      <Span fontSize={14} color="gray">
        {type === ANSWER_TYPE ? (
          <FormattedMessage {...messages.answered} />
        ) : (
          <FormattedMessage {...messages.asked} />
        )}

        <span>
          {` ${getFormattedDate(postTime, locale, MONTH_3LETTERS__DAY_TIME)}`}
        </span>
      </Span>
    </div>
  </div>
);

UserInfo.propTypes = {
  account: PropTypes.string,
  avatar: PropTypes.string,
  name: PropTypes.string,
  rating: PropTypes.number,
  type: PropTypes.string,
  postTime: PropTypes.number,
  locale: PropTypes.string,
};

export default React.memo(UserInfo);
