import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import * as routes from 'routes-config';
import { TEXT_SECONDARY } from 'style-constants';

import { getFormattedDate } from 'utils/datetime';

import noAvatar from 'images/noAvatar.png';
import editUserNoAvatar from 'images/editUserNoAvatar.png';

import questionRoundedIcon from 'images/question2.svg?inline';
import answerIcon from 'images/answer.svg?inline';
import pencilIcon from 'images/pencil.svg?inline';
import risenIcon from 'images/risen.svg?inline';

import Base from 'components/Base';
import Ul from 'components/Ul';
import Li from 'components/Li';
import Span from 'components/Span';
import RatingStatus from 'components/RatingStatus';
import H3 from 'components/H3';
import A from 'components/A';
import TransparentButton from 'components/Button/Contained/Transparent';

import LargeImage from 'components/Img/LargeImage';

import messages from 'containers/Profile/messages';
import commonMessages from 'common-messages';

const UlStyled = Ul.extend`
  display: flex;
  flex-wrap: wrap;
  border: none;
  padding: 0;
`;

/* istanbul ignore next */
const LiStyled = Li.extend`
  display: flex;
  flex-direction: column;
  padding: 16px ${props => (props.last ? '0' : '47px')} 16px 0;

  > :nth-child(1) {
    margin-bottom: 5px;
  }

  img {
    margin-right: 5px;
  }
`;

const MainUserInformation = /* istanbul ignore next */ ({
  profile,
  userId,
  account,
}) => (
  <Base position="middle">
    <div className="row">
      <div className="col-12 col-lg-3 col-xl-2 d-flex justify-content-center">
        <LargeImage
          src={
            profile.ipfs_avatar ||
            (userId === account ? editUserNoAvatar : noAvatar)
          }
          alt="avatar"
          isBordered
        />
      </div>

      <div className="col-12 col-lg-9 col-xl-10">
        <div className="d-flex justify-content-between align-items-center">
          <H3>{profile.display_name}</H3>

          <A to={routes.profileEdit(userId)} href={routes.profileEdit(userId)}>
            <TransparentButton>
              <img className="mr-2" src={pencilIcon} alt="icon" />
              <FormattedMessage {...commonMessages.edit} />
            </TransparentButton>
          </A>
        </div>

        <div className="d-flex align-items-center">
          <UlStyled>
            <LiStyled>
              <Span color={TEXT_SECONDARY} fontSize="13">
                <FormattedMessage {...messages.reputation} />
              </Span>
              <RatingStatus rating={profile.rating} size="lg" />
            </LiStyled>

            <LiStyled>
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
                <span>{profile.questions_asked || 0}</span>
              </Span>
            </LiStyled>

            <LiStyled>
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
                <span>{profile.answers_given || 0}</span>
              </Span>
            </LiStyled>

            <LiStyled>
              <Span color={TEXT_SECONDARY} fontSize="13">
                <FormattedMessage {...messages.risen} />
              </Span>
              <Span
                className="d-flex align-items-center"
                fontSize="18"
                margin="sm"
                bold
              >
                <img
                  src={risenIcon}
                  className="d-flex align-items-center"
                  alt="icon"
                />
                <span>{profile.correct_answers || 0}</span>
              </Span>
            </LiStyled>

            <LiStyled last>
              <Span color={TEXT_SECONDARY} fontSize="13">
                <FormattedMessage {...messages.memberSince} />
                <span>{getFormattedDate(profile.registration_time)}</span>
              </Span>
            </LiStyled>
          </UlStyled>
        </div>
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
