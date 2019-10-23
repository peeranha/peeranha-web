import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import commonMessages from 'common-messages';
import { TEXT_SECONDARY } from 'style-constants';

import { getFormattedDate } from 'utils/datetime';
import { getUserAvatar } from 'utils/profileManagement';

import questionRoundedIcon from 'images/question2.svg?inline';
import answerIcon from 'images/answer.svg?inline';
import pencilIcon from 'images/pencil.svg?inline';

import Base from 'components/Base';
import Ul from 'components/Ul';
import Span from 'components/Span';
import RatingStatus from 'components/RatingStatus';
import A from 'components/A';
import TransparentButton from 'components/Button/Contained/Transparent';

import LargeImage from 'components/Img/LargeImage';

import messages from 'containers/Profile/messages';

const UlStyled = Ul.extend`
  display: flex;
  flex-wrap: wrap;
  border: none;
  padding: 0;

  li:last-child {
    padding-right: 0;
  }

  li {
    display: flex;
    flex-direction: column;
    padding: 15px 45px 15px 0;

    > :nth-child(1) {
      margin-bottom: 5px;
    }

    img {
      margin-right: 5px;
    }

    @media only screen and (max-width: 768px) {
      padding: 10px 25px 5px 0;
    }

    @media only screen and (max-width: 576px) {
      padding: 7px 15px 7px 0;

      span {
        font-size: 14px !important;
      }
    }
  }
`;

const MainUserInformation = ({ profile, userId, account }) => (
  <Base className="d-flex align-items-start" position="middle">
    <div className="d-flex justify-content-center">
      <A to={routes.profileEdit(userId)} disabled={account !== userId}>
        <LargeImage
          className="d-none d-md-block mr-3"
          src={getUserAvatar(profile.ipfs_avatar, userId, account)}
          alt="avatar"
          isBordered
        />
      </A>
    </div>

    <div className="flex-grow-1">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <A to={routes.profileEdit(userId)} disabled={account !== userId}>
            <LargeImage
              className="d-block d-md-none mr-3"
              src={getUserAvatar(profile.ipfs_avatar, userId, account)}
              alt="avatar"
              isBordered
            />
          </A>

          <div>
            <Span fontSize="38" mobileFS="28" bold>
              {profile.display_name}
            </Span>

            <span className="d-flex d-sm-none">
              <RatingStatus rating={profile.rating} size="lg" />
            </span>
          </div>
        </div>

        {userId === account && (
          <A to={routes.profileEdit(userId)}>
            <TransparentButton>
              <img src={pencilIcon} alt="icon" />
              <span className="d-none d-sm-inline-block ml-2">
                <FormattedMessage {...commonMessages.edit} />
              </span>
            </TransparentButton>
          </A>
        )}
      </div>

      <div className="d-flex align-items-center">
        <UlStyled>
          <li className="d-none d-sm-flex">
            <Span color={TEXT_SECONDARY} fontSize="13">
              <FormattedMessage {...messages.reputation} />
            </Span>
            <RatingStatus rating={profile.rating} size="lg" />
          </li>

          <li>
            <Span color={TEXT_SECONDARY} fontSize="13">
              <FormattedMessage {...commonMessages.questions} />
            </Span>
            <Span
              className="d-flex align-items-center"
              fontSize="18"
              margin="sm"
              bold
            >
              <img src={questionRoundedIcon} alt="icon" />
              <span>{profile.questions_asked}</span>
            </Span>
          </li>

          <li>
            <Span color={TEXT_SECONDARY} fontSize="13">
              <FormattedMessage {...commonMessages.answers} />
            </Span>
            <Span
              className="d-flex align-items-center"
              fontSize="18"
              margin="sm"
              bold
            >
              <img src={answerIcon} alt="icon" />
              <span>{profile.answers_given}</span>
            </Span>
          </li>

          <li>
            <Span color={TEXT_SECONDARY} fontSize="13">
              <FormattedMessage {...messages.memberSince} />
              <span>{getFormattedDate(profile.registration_time)}</span>
            </Span>
          </li>
        </UlStyled>
      </div>
    </div>
  </Base>
);

MainUserInformation.propTypes = {
  profile: PropTypes.object,
  userId: PropTypes.string,
  account: PropTypes.string,
};

export default React.memo(MainUserInformation);
