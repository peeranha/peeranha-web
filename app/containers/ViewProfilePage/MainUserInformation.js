import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { getFormattedDate } from 'utils/datetime';

import questionRoundedIcon from 'images/question.png';
import risenIcon from 'images/risen.png';
import answerIcon from 'images/answer.png';

import Base from 'components/Base';
import Ul from 'components/Ul';
import Li from 'components/Li';
import Span from 'components/Span';
import RatingStatus from 'components/RatingStatus';
import H3 from 'components/H3';
import Img from 'components/Img';

import messages from 'containers/Profile/messages';
import commonMessages from 'common-messages';

const UlStyled = Ul.extend`
  display: flex;
  flex-wrap: wrap;
  border: none;
  padding: 0;
`;

const LiStyled = Li.extend`
  display: flex;
  flex-direction: column;
  padding: 16px ${props => (props.last ? '0' : '47px')} 16px 0;
`;

const MainUserInformation = ({ profile }) => (
  <Base position="middle">
    <div className="row">
      <div className="col-12 col-lg-3 col-xl-2 d-flex justify-content-center">
        <Img src={profile.ipfs_avatar} alt="avatar" size={5} isBordered />
      </div>
      <div className="col-12 col-lg-9 col-xl-10">
        <H3>{profile.display_name}</H3>
        <div className="d-flex align-items-center">
          <UlStyled>
            <LiStyled>
              <Span color="gray" fontSize="13">
                <FormattedMessage {...messages.reputation} />
              </Span>
              <RatingStatus rating={profile.rating} size="lg" />
            </LiStyled>
            <LiStyled>
              <Span color="gray" fontSize="13">
                <FormattedMessage {...commonMessages.questions} />
              </Span>
              <Span
                className="d-flex align-items-center"
                fontSize="20"
                margin="sm"
                bold
              >
                <Img
                  className="mr-1"
                  size={0.75}
                  notRounded
                  src={questionRoundedIcon}
                  alt="?"
                />
                <span>{profile.questions || 0}</span>
              </Span>
            </LiStyled>
            <LiStyled>
              <Span color="gray" fontSize="13">
                <FormattedMessage {...commonMessages.answers} />
              </Span>
              <Span
                className="d-flex align-items-center"
                fontSize="20"
                margin="sm"
                bold
              >
                <Img
                  className="mr-1"
                  size={0.75}
                  notRounded
                  src={answerIcon}
                  alt="+"
                />
                <span>{profile.answers || 0}</span>
              </Span>
            </LiStyled>
            <LiStyled>
              <Span color="gray" fontSize="13">
                <FormattedMessage {...messages.risen} />
              </Span>
              <Span
                className="d-flex align-items-center"
                fontSize="20"
                margin="sm"
                bold
              >
                <Img
                  className="mr-1"
                  size={0.75}
                  notRounded
                  src={risenIcon}
                  alt="?"
                />
                <span>{profile.risen || 0}</span>
              </Span>
            </LiStyled>
            <LiStyled last>
              <Span color="gray" fontSize="13">
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
};

export default React.memo(MainUserInformation);
