import React, { useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useTranslation, Trans } from 'react-i18next';
import { css } from '@emotion/react';
import * as routes from 'routes-config';

import { TEXT_PRIMARY, TEXT_SECONDARY, BORDER_PRIMARY } from 'style-constants';
import pencilIcon from 'images/pencil.svg?external';
import closeIcon from 'images/closeCircle.svg?external';

import { isSuiBlockchain } from 'utils/constants';
import { getPermissions } from 'utils/properties';
import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';
import useMediaQuery from 'hooks/useMediaQuery';

import NavigationButton, { NavigationLink } from 'components/Button/Contained/Navigation';
import Wrapper from 'components/Header/Complex';
import Span from 'components/Span/index';
import A from 'components/A/index';
import { IconMd } from 'components/Icon/IconWithSizes';
import ScrollContainer from 'components/common/ScrollContainer';
import { PencilSimpleLineGraph, XCircleGraph } from 'components/icons';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  > * {
    flex-shrink: 0;
  }

  @media only screen and (max-width: 576px) {
    overflow: auto;
    display: flex;
  }
`;

const Div = styled.div`
  white-space: nowrap;
  flex-wrap: wrap;
  flex-grow: 1;
  max-width: ${({ isProfilePage = true }) => (isProfilePage ? '94%' : '100%')};

  @media only screen and (max-width: 767px) {
    max-width: 100%;
    div > a {
      margin-bottom: 10px;
    }
  }
`;

const hashes = ['#questions', '#answers', '#settings', '#moderation'];

const UserNavigation = ({
  userId,
  account,
  profile,
  questionsLength,
  questionsWithUserAnswersLength,
  userAchievementsLength,
  redirectToEditProfilePage,
}) => {
  const { t } = useTranslation();
  const path = window.location.pathname + window.location.hash;
  const ref = useRef(null);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    if (hashes.includes(window.location.hash) || path === routes.profileView(userId)) {
      window.scrollTo(0, 0);
    }
  }, [window.location.hash]);

  const isProfilePage =
    userId === account &&
    (path === routes.profileView(account) || path === routes.userCommunities(account));

  const isModerator = useMemo(() => !!getPermissions(profile)?.length, [profile]);

  const redirectToEditProfilePageWrapper =
    (user) =>
    ({ currentTarget: { id } }) => {
      redirectToEditProfilePage({
        buttonId: id,
        user,
      });
    };

  return (
    <Wrapper
      position="top"
      ref={ref}
      css={
        !isSuiBlockchain && {
          border: 'none',
          borderBottom: `1px solid ${graphCommunity ? '#3D3D54' : 'rgb(194, 198, 216)'}`,
          background:
            path !== routes.profileView(userId) && path !== routes.profileEdit(userId)
              ? 'none'
              : '#161425',
        }
      }
    >
      <Ul>
        <Div className="d-flex align-items-center" isProfilePage={isProfilePage}>
          <ScrollContainer>
            <NavigationLink
              to={routes.profileView(userId)}
              islink={
                path !== routes.profileView(userId) &&
                path !== routes.profileEdit(userId) &&
                path !== routes.userCommunities(userId)
                  ? 1
                  : 0
              }
            >
              {t('common.profile')}
            </NavigationLink>

            <NavigationLink
              to={routes.userQuestions(userId)}
              disabled={!questionsLength}
              tabIndex={!questionsLength ? '-1' : undefined}
              islink={path !== routes.userQuestions(userId) ? 1 : 0}
            >
              <span>
                <Trans
                  i18nKey="common.postsNumber"
                  values={{ number: questionsLength }}
                  components={[
                    <Span
                      className="ml-1"
                      fontSize="14"
                      color={path !== routes.userQuestions(userId) ? TEXT_SECONDARY : 'inherit'}
                      key="0"
                      css={{ color: path !== routes.userQuestions(userId) ? '#A7A7AD' : '' }}
                    />,
                  ]}
                />
              </span>
            </NavigationLink>

            <NavigationLink
              to={routes.userAnswers(userId)}
              disabled={!questionsWithUserAnswersLength}
              tabIndex={!questionsWithUserAnswersLength ? '-1' : undefined}
              islink={path !== routes.userAnswers(userId) ? 1 : 0}
            >
              <span>
                <Trans
                  i18nKey="common.answersNumber"
                  values={{ number: questionsWithUserAnswersLength }}
                  components={[
                    <Span
                      className="ml-1"
                      fontSize="14"
                      color={path !== routes.userAnswers(userId) ? TEXT_SECONDARY : 'inherit'}
                      key="0"
                      css={{ color: path !== routes.userAnswers(userId) ? '#A7A7AD' : '' }}
                    />,
                  ]}
                />
              </span>
            </NavigationLink>

            <NavigationLink
              className={userId !== account ? 'd-none' : ''}
              to={routes.userNotifications(userId)}
              islink={path !== routes.userNotifications(userId) ? 1 : 0}
            >
              {t('common.notifications')}
            </NavigationLink>

            <NavigationLink
              to={routes.userNFTs(userId)}
              islink={path !== routes.userNFTs(userId) ? 1 : 0}
            >
              <span>
                <Trans
                  i18nKey="common.NFTsNumber"
                  values={{ number: userAchievementsLength }}
                  components={[
                    <Span
                      className="ml-1"
                      fontSize="14"
                      color={path !== routes.userNFTs(userId) ? TEXT_SECONDARY : 'inherit'}
                      key="0"
                      css={{ color: path !== routes.userNFTs(userId) ? '#A7A7AD' : '' }}
                    />,
                  ]}
                />
              </span>
            </NavigationLink>

            {isModerator && (
              <NavigationLink
                className={userId !== account ? 'd-none' : ''}
                to={routes.userModeration(userId)}
                islink={path !== routes.userModeration(userId) ? 1 : 0}
              >
                {t('common.moderation')}
              </NavigationLink>
            )}

            {!isSuiBlockchain && (
              <NavigationLink
                className={userId !== account ? 'd-none' : ''}
                to={routes.userSettings(userId)}
                islink={path !== routes.userSettings(userId) ? 1 : 0}
              >
                {t('common.settings')}
              </NavigationLink>
            )}
          </ScrollContainer>

          {isDesktop && (
            <NavigationButton
              className={
                userId === account && path === routes.profileView(account)
                  ? 'd-inline-flex d-md-none'
                  : 'd-none'
              }
              onClick={redirectToEditProfilePageWrapper(userId)}
              id={`redireact-to-edit-${userId}-user-page-1`}
              islink
            >
              {t('common.edit')}
            </NavigationButton>
          )}
        </Div>

        <div
          className="d-none d-md-block"
          css={css`
            width: 110px;
            @media (min-width: 840px) {
              width: auto;
            }
            @media (min-width: 991px) {
              width: 110px;
            }
            @media (min-width: 1120px) {
              width: auto;
            }
          `}
        >
          <button
            onClick={redirectToEditProfilePageWrapper(userId)}
            className={`align-items-center ${isProfilePage ? 'd-inline-flex' : 'd-none'}`}
            css={css`
              margin-right: 23px;
              @media (min-width: 840px) {
                margin-right: 0;
              }
              @media (min-width: 991px) {
                margin-right: 23px;
              }
              @media (min-width: 1120px) {
                margin-right: 0;
              }
            `}
            id={`redireact-to-edit-${userId}-user-page-2`}
          >
            {graphCommunity ? (
              <PencilSimpleLineGraph size={[20, 20]} fill="#6F4CFF" />
            ) : (
              <IconMd icon={pencilIcon} color={colors.btnColor || TEXT_PRIMARY} />
            )}
            <Span
              className="ml-1"
              color={colors.btnColor || TEXT_PRIMARY}
              css={graphCommunity && { color: '#6F4CFF' }}
            >
              {t('common.edit')}
            </Span>
          </button>

          <A
            className={`align-items-center ${
              userId === account && path === routes.profileEdit(account)
                ? 'd-inline-flex'
                : 'd-none'
            }`}
            to={routes.profileView(account)}
          >
            {graphCommunity ? (
              <XCircleGraph size={[20, 20]} fill="#6F4CFF" />
            ) : (
              <IconMd
                icon={closeIcon}
                color={colors.btnColor || TEXT_PRIMARY}
                fill={colors.btnColor || BORDER_PRIMARY}
                isColorImportant
              />
            )}
            <Span
              className="ml-1"
              color={colors.btnColor || TEXT_PRIMARY}
              css={graphCommunity && { color: '#6F4CFF' }}
            >
              {t('common.close')}
            </Span>
          </A>
        </div>
      </Ul>
    </Wrapper>
  );
};

UserNavigation.propTypes = {
  userId: PropTypes.string,
  account: PropTypes.string,
  questionsLength: PropTypes.number,
  questionsWithUserAnswersLength: PropTypes.number,
  userAchievementsLength: PropTypes.number,
  loginData: PropTypes.object,
  profile: PropTypes.object,
  redirectToEditProfilePage: PropTypes.func,
};

export default UserNavigation;
