import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { gray } from 'style-constants';
import { FormattedMessage } from 'react-intl';

import { getFormattedDate } from 'utils/datetime';

import questionIcon from 'svg/question';
import answerIcon from 'svg/answer';
import risenIcon from 'svg/risen';

import Base from 'components/Base';
import Ul from 'components/Ul';
import Li from 'components/Li';
import Span from 'components/Span';
import RatingStatus from 'components/RatingStatus';
import Icon from 'components/Icon';
import H3 from 'components/H3';

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

const Img = styled.img`
  border-radius: 50%;
  border: 1px solid ${gray};
  width: 120px;
  height: 120px;
  display: inline-block;
`;

const MainUserInformation = ({ profile }) => (
  <Base position="middle">
    <div className="row">
      <div className="col-12 col-lg-3 col-xl-2 d-flex justify-content-center">
        <Img src={profile.ipfs_avatar} alt="avatar" />
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
              <Span fontSize="20" margin="sm" bold>
                <Icon icon={questionIcon} />
                <span>{profile.questions || 0}</span>
              </Span>
            </LiStyled>
            <LiStyled>
              <Span color="gray" fontSize="13">
                <FormattedMessage {...commonMessages.answers} />
              </Span>
              <Span fontSize="20" margin="sm" bold>
                <Icon icon={answerIcon} />
                <span>{profile.answers || 0}</span>
              </Span>
            </LiStyled>
            <LiStyled>
              <Span color="gray" fontSize="13">
                <FormattedMessage {...messages.risen} />
              </Span>
              <Span fontSize="20" margin="sm" bold>
                <Icon icon={risenIcon} />
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
