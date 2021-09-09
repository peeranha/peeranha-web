import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import commonMessages from 'common-messages';
import { TEXT_DARK, TEXT_SECONDARY } from 'style-constants';
import { LABEL_SIZE_LG } from 'components/Img/MediumImage';
import {
  MONTH_3LETTERS__DAY_YYYY,
  TEMPORARY_ACCOUNT_KEY,
} from 'utils/constants';

import { getFormattedDate } from 'utils/datetime';
import { getUserAvatar } from 'utils/profileManagement';

import questionRoundedIcon from 'images/question2.svg?inline';
import answerIcon from 'images/answer.svg?inline';

import Base from 'components/Base';
import Ul from 'components/Ul';
import Span from 'components/Span';
import RatingStatus from 'components/RatingStatus';
import AchievementsStatus from 'components/AchievementsStatus/index';

import LargeImage from 'components/Img/LargeImage';
import TelegramUserLabel from 'components/Labels/TelegramUserLabel';
import LoadingIndicator from 'components/LoadingIndicator';

import messages from 'containers/Profile/messages';

const InlineLoader = styled(LoadingIndicator)`
  margin: auto;
  margin-top: 5px;
`;

export const UlStyled = Ul.extend`
  display: flex;
  flex-wrap: nowrap;
  border: none;
  padding: 0;
  overflow-x: auto;
  white-space: nowrap;

  li:last-child {
    padding-right: 0;
  }

  li {
    display: flex;
    flex-direction: column;
    padding: 15px 45px 15px 0;

    > *:nth-child(1) {
      font-size: 13px;
      line-height: 25px;
      color: ${TEXT_SECONDARY};
    }

    > *:nth-child(2) {
      display: flex;
      align-items: center;
      font-size: 18px;
      font-weight: 600;
      color: ${TEXT_DARK};

      img {
        margin-right: 5px;
        height: 18px;
      }
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

export const Box = Base.extend`
  > div {
    display: flex;
    align-items: start;

    > *:nth-child(1) {
      display: flex;
      justify-content: flex-start;
      align-items: start;
      flex: 0 0 150px;

      @media only screen and (max-width: 576px) {
        flex: 0 0 90px;
      }
    }

    > *:nth-child(2) {
      flex: 0 0 calc(100% - 150px);
      max-width: calc(100% - 150px);
      overflow: hidden;

      @media only screen and (max-width: 576px) {
        flex: 0 0 calc(100% - 90px);
        max-width: calc(100% - 90px);
      }
    }
  }
`;

const LargeImageButton = styled.button`
  position: relative;
`;

const MainUserInformation = ({
  profile,
  userId,
  account,
  locale,
  redirectToEditProfilePage,
}) => {
  const isTemporaryAccount = !!profile?.['integer_properties']?.find(
    x => x.key === TEMPORARY_ACCOUNT_KEY && x.value,
  );

  return (
    <Box position="middle">
      <div>
        <div>
          <LargeImageButton
            onClick={redirectToEditProfilePage}
            data-user={userId}
            disabled={account !== userId}
          >
            <LargeImage
              src={getUserAvatar(profile.ipfs_avatar, userId, account)}
              alt="avatar"
              isBordered
            />
            {isTemporaryAccount && (
              <TelegramUserLabel
                id={`temporary-account-${userId}-label`}
                locale={locale}
                size={LABEL_SIZE_LG}
              />
            )}
          </LargeImageButton>
        </div>

        <div>
          <div className="d-flex align-items-center">
            <Span fontSize="38" lineHeight="47" mobileFS="28" bold>
              {profile?.['display_name']}
            </Span>
          </div>

          <div className="d-flex align-items-center">
            <UlStyled>
              <li>
                <FormattedMessage {...messages.status} />
                <RatingStatus rating={profile.rating} size="lg" />
              </li>

              <li>
                <FormattedMessage {...commonMessages.questions} />
                <span>
                  <img src={questionRoundedIcon} alt="icon" />
                  {profile.questions_asked}
                </span>
              </li>

              <li>
                <FormattedMessage {...commonMessages.answers} />
                <span>
                  <img src={answerIcon} alt="icon" />
                  {profile.answers_given}
                </span>
              </li>

              <li>
                <FormattedMessage {...messages.achievements} />
                {typeof profile.achievements_reached === 'object' ? (
                  <AchievementsStatus
                    count={profile.achievements_reached.length}
                    size="lg"
                  />
                ) : (
                  <InlineLoader width={7} height={7} margin={3} />
                )}
              </li>
              {!isTemporaryAccount && (
                <li>
                  <FormattedMessage {...commonMessages.eosAccount} />
                  <span>{userId}</span>
                </li>
              )}

              <li>
                <span>
                  <FormattedMessage {...messages.memberSince} />
                  {getFormattedDate(
                    profile.registration_time,
                    locale,
                    MONTH_3LETTERS__DAY_YYYY,
                  )}
                </span>
              </li>
            </UlStyled>
          </div>
        </div>
      </div>
    </Box>
  );
};

MainUserInformation.propTypes = {
  profile: PropTypes.object,
  userId: PropTypes.string,
  account: PropTypes.string,
  locale: PropTypes.string,
  redirectToEditProfilePage: PropTypes.func,
};

export default React.memo(MainUserInformation);
