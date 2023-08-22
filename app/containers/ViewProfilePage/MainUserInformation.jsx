import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { css } from '@emotion/react';

import { TEXT_DARK, TEXT_SECONDARY, LINK_COLOR, TEXT_PRIMARY } from 'style-constants';
import { LABEL_SIZE_LG } from 'components/Img/MediumImage';
import { TEMPORARY_ACCOUNT_KEY } from 'utils/constants';
import { getUserAvatar } from 'utils/profileManagement';

import FaqIcon from 'icons/Faq';
import AnswerWithAIcon from 'icons/AnswerWithA';
import pencilIcon from 'images/pencil.svg?external';
import CopyTextIcon from 'icons/CopyText';

import Base from 'components/Base';
import A from 'components/A';
import Ul from 'components/Ul';
import Span from 'components/Span';
import RatingStatus from 'components/RatingStatus';
import AchievementsStatus from 'components/AchievementsStatus/index';
import { IconMd } from 'components/Icon/IconWithSizes';
import { closePopover, showPopover } from 'utils/popover';
import LargeImage from 'components/Img/LargeImage';
import TelegramUserLabel from 'components/Labels/TelegramUserLabel';
import LoadingIndicator from 'components/LoadingIndicator';

import { customRatingIconColors } from 'constants/customRating';
import { getUserName } from 'utils/user';
import useMediaQuery from 'hooks/useMediaQuery';

import { singleCommunityColors } from 'utils/communityManagement';
import { isSuiBlockchain } from 'utils/sui/sui';
import { SuiNS } from 'icons/index';

const colors = singleCommunityColors();
const InlineLoader = styled(LoadingIndicator)`
  margin: auto;
  margin-top: 5px;
`;

export const UlStyled = Ul.extend`
  display: flex;
  border: none;
  padding: 0;
  white-space: nowrap;
  flex-wrap: wrap;

  @media (max-width: 420px) {
    display: flex;
    overflow-x: hidden;
    white-space: nowrap;
    flex-wrap: wrap;
  }
  li {
    display: flex;
    flex-direction: column;
    padding-right: 25px;
    div {
      display: inline;
    }
    span {
      height: 20px;
    }
    @media (max-width: 420px) {
      word-break: break-word;
      white-space: pre-line;
      overflow-wrap: break-word;
    }

    @media (max-width: 399px) {
      overflow-x: auto;
    }

    > *:nth-child(1) {
      font-size: 14px;
      line-height: 25px;
      padding-bottom: 25px;
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

      svg {
        margin-right: 5px;
      }
      span {
        height: 18px;
        white-space: nowrap;
      }
    }

    @media only screen and (max-width: 1385px) {
      padding-right: 18px;
    }

    @media only screen and (max-width: 768px) {
      padding: 10px 25px 5px 0;
      > *:nth-child(1) {
        font-size: 14px !important;
      }
      a span {
        font-size: 16px !important;
      }
    }

    @media only screen and (max-width: 500px) {
      div {
        font-size: 13px !important;
      }
    }
    @media only screen and (max-width: 400px) {
      display: block;
      width: 100%;
      padding: 10px 15px 5px 0;
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
      align-items: ${(props) => (props.isLogin ? 'center' : 'start')};
      flex: 1 1;
    }

    > *:nth-child(2) {
      flex: 0 0 calc(100% - 150px);
      max-width: calc(100% - 10px);
      overflow: break-word;
    }
  }
`;

const LargeImageButton = styled.button`
  position: relative;
  img {
    @media only screen and (max-width: 576px) {
      width: 80px;
      height: 80px;
    }
  }
`;

const MainUserInformation = ({
  profile,
  userId,
  account,
  locale,
  redirectToEditProfilePage,
  userAchievementsLength,
}) => {
  const { t } = useTranslation();
  const isTemporaryAccount = !!profile?.integer_properties?.find(
    (x) => x.key === TEMPORARY_ACCOUNT_KEY && x.value,
  );
  const userAddress = isSuiBlockchain
    ? process.env.SUI_EXPLORERE_URL.replace(
        '{0}',
        profile?.customName ? profile?.walletAddress : userId,
      )
    : process.env.BLOCKCHAIN_EXPLORERE_URL + userId;
  const [copied, setCopied] = useState('');
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const writeToBuffer = (event) => {
    navigator.clipboard.writeText(profile?.customName || userId);
    setCopied(colors.btnColor || LINK_COLOR);
    if (isDesktop) {
      showPopover(event.currentTarget.id, t('common.copied'));
    }
  };

  const showSuiNSPopover = (event) => {
    showPopover(event.currentTarget.id, 'Sui Name Service', { timer: false });
  };
  const hideSuiNSPopover = (event) => {
    closePopover(event.currentTarget.id);
  };

  const onClickRedirectToEditProfilePage =
    (user) =>
    ({ currentTarget: { id } }) => {
      redirectToEditProfilePage({
        buttonId: id,
        user,
      });
    };
  const shortUserId = (id) => {
    if (id.length > 40 && window.innerWidth > 576) {
      return `${id.substring(0, 41)}...${id.substring(id.length - 5)}`;
    }
    if (id.length > 40 && window.innerWidth <= 576) {
      return `${id.substring(0, 25)}...${id.substring(id.length - 5)}`;
    }
    return id;
  };

  return (
    <Box
      position="middle"
      className="pb-0"
      isLogin={userId !== account}
      css={
        isSuiBlockchain && {
          borderLeft: `1px solid ${colors.border}`,
          borderRight: `1px solid ${colors.border}`,
        }
      }
    >
      <div
        css={css`
          flex-direction: column;
          @media (min-width: 768px) {
            flex-direction: row;
            background: ${colors.userInformation || 'rgba(165, 188, 255, 0.1)'};
            border-radius: 170px;
          }
        `}
      >
        <div
          css={css`
            background: ${colors.userInformation || 'rgba(165, 188, 255, 0.1)'};
            border-radius: 170px;
            min-width: calc(100% - 5px);
            @media (min-width: 768px) {
              background: none;
              min-width: 0;
            }
            @media (min-width: 768px) and (max-width: 1308px) {
              padding-top: 10px;
            }
          `}
        >
          <LargeImageButton
            onClick={onClickRedirectToEditProfilePage(userId)}
            id={`redireact-to-edit-${userId}-user-page-1`}
            disabled={account !== userId}
          >
            <LargeImage
              src={getUserAvatar(profile.avatar, userId, account)}
              alt="avatar"
              isBordered
              css={css`
                border: 2px solid ${colors.btnColor || TEXT_PRIMARY};
                padding: 2px;
              `}
            />
            {isTemporaryAccount && (
              <TelegramUserLabel
                id={`temporary-account-${userId}-label`}
                locale={locale}
                size={LABEL_SIZE_LG}
              />
            )}
          </LargeImageButton>
          <div
            className={!isDesktop ? 'd-flex ais fdc' : 'd-none'}
            css={css`
              min-width: calc(100% - 5px);
              padding: 0 80px 0 10px;
            `}
          >
            <Span
              fontSize="24"
              lineHeight="47"
              bold
              css={css`
                @media (min-width: 577px) {
                  padding: 20px 0;
                }
              `}
            >
              {getUserName(profile?.displayName, userId)}
            </Span>
            <button
              onClick={onClickRedirectToEditProfilePage(userId)}
              id={`redireact-to-edit-${userId}-user-page-2`}
              className={
                isDesktop || userId !== account ? 'd-none' : `align-items-center d-inline-flex`
              }
            >
              <IconMd icon={pencilIcon} color={colors.btnColor || TEXT_PRIMARY} />
              <Span className="ml-1" color={colors.btnColor || TEXT_PRIMARY}>
                {t('profile.editProfile')}
              </Span>
            </button>
          </div>
        </div>

        <div>
          <div className={isDesktop ? 'd-flex align-items-center' : 'd-none'}>
            <Span
              fontSize="38"
              lineHeight="47"
              mobileFS="28"
              bold
              css={css`
                @media (min-width: 768px) and (max-width: 1308px) {
                  padding-top: 0;
                }
                padding-top: 12px;
              `}
            >
              {getUserName(profile?.displayName, userId)}
            </Span>
          </div>
          <div className="d-flex align-items-center">
            <UlStyled>
              <li
                css={css`
                  flex: 1 1 60%;
                  @media (min-width: 768px) {
                    flex: 0 1;
                  }
                `}
              >
                <span>{t('profile.status')}</span>

                <RatingStatus
                  isProfilePage={true}
                  customRatingIconColors={customRatingIconColors}
                  rating={profile.highestRating.rating}
                  size="lg"
                  css={css`
                    span:last-child {
                      font-size: 18px;
                    }
                  `}
                />
              </li>

              <li
                css={css`
                  flex: 1 1 40%;
                  @media (min-width: 768px) {
                    flex: 0 1;
                  }
                `}
              >
                <span>{t('common.posts')}</span>
                <span>
                  <FaqIcon
                    className="mr-2"
                    size={[18, 18]}
                    stroke={colors.linkColor || TEXT_PRIMARY}
                    fill={colors.linkColor || TEXT_PRIMARY}
                  />
                  {profile.postCount}
                </span>
              </li>

              <li
                css={css`
                  flex: 1 1 60%;
                  @media (min-width: 768px) {
                    flex: 0 1;
                  }
                `}
              >
                <span>{t('common.answers')}</span>
                <span>
                  <AnswerWithAIcon
                    className="mr-2"
                    size={[18, 18]}
                    stroke={colors.linkColor || TEXT_PRIMARY}
                  />
                  {profile.answersGiven}
                </span>
              </li>

              <li
                css={css`
                  flex: 1 1 40%;
                  @media (min-width: 768px) {
                    flex: 0 1;
                  }
                  span:last-child {
                    span:last-child {
                      font-size: 18px;
                      height: 20px;
                    }
                  }
                `}
              >
                <span>{t('profile.achievements')}</span>

                {typeof profile.achievements === 'object' ? (
                  <AchievementsStatus
                    isProfilePage={true}
                    count={userAchievementsLength}
                    size="lg"
                  />
                ) : (
                  <InlineLoader width={7} height={7} margin={3} />
                )}
              </li>
              {!isTemporaryAccount && (
                <li
                  css={css`
                    flex-direction: row;
                  `}
                >
                  <span>
                    {t(
                      isSuiBlockchain && !profile?.customName
                        ? 'common.userId'
                        : 'common.walletAddress',
                    )}
                  </span>
                  <div>
                    <A to={{ pathname: userAddress }} href={userAddress} target="_blank">
                      {profile?.customName && (
                        <button
                          onMouseEnter={showSuiNSPopover}
                          onMouseLeave={hideSuiNSPopover}
                          id="sui-ns-banner"
                          css={css`
                            margin-right: 3px !important;
                          `}
                        >
                          <SuiNS
                            size={[19, 19]}
                            css={css`
                              margin-right: 0 !important;
                            `}
                          />
                        </button>
                      )}
                      <span
                        id="copytext1"
                        css={css`
                          border-bottom: 1px solid;
                          color: ${LINK_COLOR};
                          font-weight: 400;
                          font-size: 16px;
                          line-height: 23px;
                        `}
                      >
                        {profile?.customName || shortUserId(userId)}
                      </span>
                    </A>
                    <button
                      css={css`
                        margin-left: 10px;
                      `}
                      id="share-link-copy"
                      onClick={writeToBuffer}
                    >
                      <CopyTextIcon
                        className={colors.btnColor || LINK_COLOR}
                        fill={copied}
                        stroke={colors.btnColor || LINK_COLOR}
                      />
                    </button>
                  </div>
                </li>
              )}
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
