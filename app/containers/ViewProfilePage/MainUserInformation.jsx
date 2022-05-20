import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import commonMessages from 'common-messages';
import { TEXT_DARK, TEXT_SECONDARY } from 'style-constants';
import { LABEL_SIZE_LG } from 'components/Img/MediumImage';
import { TEMPORARY_ACCOUNT_KEY } from 'utils/constants';
import { getUserAvatar } from 'utils/profileManagement';

import questionRoundedIcon from 'images/question2.svg?inline';
import answerIcon from 'images/answer.svg?inline';

import Base from 'components/Base';
import A from 'components/A';
import Ul from 'components/Ul';
import Span from 'components/Span';
import RatingStatus from 'components/RatingStatus';
import AchievementsStatus from 'components/AchievementsStatus/index';

import LargeImage from 'components/Img/LargeImage';
import TelegramUserLabel from 'components/Labels/TelegramUserLabel';
import LoadingIndicator from 'components/LoadingIndicator';

import messages from 'containers/Profile/messages';
import { customRatingIconColors } from 'constants/customRating';
import ProfileSince from 'components/ProfileSince';

const InlineLoader = styled(LoadingIndicator)`
  margin: auto;
  margin-top: 5px;
`;

export const UlStyled = Ul.extend`
  display: flex;
  border: none;
  padding: 0;
  overflow-x: hidden;
  white-space: nowrap;
  flex-wrap: wrap;

  @media (min-width: 400px) and (max-width: 488px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }

  @media (max-width: 420px) {
    display: flex;
    overflow-x: hidden;
    white-space: nowrap;
    flex-wrap: wrap;
  }

  li:last-child {
    padding-right: 0;
  }

  li {
    display: flex;
    flex-direction: column;
    padding: 15px 30px 15px 0;

    @media (max-width: 399px) {
      white-space: wrap;
      word-break: break-word;
      white-space: pre-line;
      overflow-wrap: break-word;
      overflow-x: auto;
    }

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

    @media only screen and (max-width: 1354px) {
      div {
        display: inline;
      }
    }

    @media only screen and (max-width: 1280px) {
      padding: 10px 45px;
    }

    @media only screen and (max-width: 768px) {
      padding: 10px 25px 5px 0;
      span,
      div {
        font-size: 16px !important;
      }
    }

    @media only screen and (max-width: 500px) {
      height: 70px;
      span,
      div {
        font-size: 13px !important;
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
  const isTemporaryAccount = !!profile?.integer_properties?.find(
    x => x.key === TEMPORARY_ACCOUNT_KEY && x.value,
  );
  const userPolygonScanAddress = process.env.BLOCKCHAIN_EXPLORERE_URL + userId;
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
              src={getUserAvatar(profile.avatar, userId, account)}
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
              {profile?.displayName}
            </Span>
          </div>

          <div className="d-flex align-items-center">
            <UlStyled>
              <li>
                <FormattedMessage {...messages.status} />
                <RatingStatus
                  customRatingIconColors={customRatingIconColors}
                  rating={profile.highestRating.rating}
                  size="lg"
                />
              </li>

              <li>
                <FormattedMessage {...commonMessages.posts} />
                <span>
                  <img src={questionRoundedIcon} alt="icon" />
                  {profile.postCount}
                </span>
              </li>

              <li>
                <FormattedMessage {...commonMessages.answers} />
                <span>
                  <img src={answerIcon} alt="icon" />
                  {profile.answersGiven}
                </span>
              </li>

              <li>
                <FormattedMessage {...messages.achievements} />
                {typeof profile.achievements === 'object' ? (
                  <AchievementsStatus
                    count={profile.achievements.length}
                    size="lg"
                  />
                ) : (
                  <InlineLoader width={7} height={7} margin={3} />
                )}
              </li>
              {!isTemporaryAccount && (
                <li>
                  <FormattedMessage {...commonMessages.walletAddress} />
                  <A
                    to={{ pathname: userPolygonScanAddress }}
                    href={userPolygonScanAddress}
                    target="_blank"
                  >
                    <span>{userId}</span>
                  </A>
                </li>
              )}

              <li>
                <div>
                  <FormattedMessage {...messages.memberSince} />
                  <div>
                    <ProfileSince
                      creationTime={profile?.creationTime}
                      locale={locale}
                    />
                  </div>
                </div>
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
