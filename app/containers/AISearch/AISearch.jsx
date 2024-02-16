/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useTranslation } from 'react-i18next';

import { BORDER_PRIMARY, BORDER_RADIUS_M, ICON_TRASPARENT_BLUE, TEXT_LIGHT } from 'style-constants';
import AIIcon from 'images/aiIcon.svg?external';

import injectReducer from 'utils/injectReducer';
import { DAEMON, isSuiBlockchain } from 'utils/constants';
import injectSaga from 'utils/injectSaga';
import {
  isSingleCommunityWebsite,
  singleCommunityColors,
  graphCommunityColors,
} from 'utils/communityManagement';

import { loginWithSui, loginWithWallet } from 'containers/Login/actions';
import { selectSearchResult, selectSearchResultLoading } from 'containers/AISearch/selectors';
import Banner from 'containers/AISearch/Banner/Banner';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { redirectToAskQuestionPage } from 'containers/AskQuestion/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import Seo from 'components/Seo';
import Header from 'components/Header/Simple';
import { css } from '@emotion/react';
import H3 from 'components/H3';
import { MediumIconStyled } from 'components/Icon/MediumIcon';
import { IconLg } from 'components/Icon/IconWithSizes';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';
import MarkdownPreviewBlock from 'components/TextEditor/MarkdownPreview';
import {
  TrendingUp,
  Time,
  OutlinedBurger,
  SearchAI,
  Close,
  TimerGraph,
  DatabaseGraph,
  TrendUpGraph,
  SparkleGraph,
  XGraph,
  MagnifyingGlassGraph,
} from 'components/icons';
import Button from 'components/common/Button';

import { getSearchResult } from './actions';
import { styles } from './AISearch.styled';
import reducer from './reducer';
import saga from './saga';

const colors = singleCommunityColors();
const single = isSingleCommunityWebsite();
const graphCommunity = graphCommunityColors();
const customColor = colors.linkColor || BORDER_PRIMARY;

const AISearch = ({
  locale,
  getSearchResultDispatch,
  profileInfo,
  redirectToAskQuestionPageDispatch,
  loginWithWalletDispatch,
  loginWithSuiDispatch,
  searchResultLoading,
  searchResult,
}) => {
  const { t } = useTranslation();
  const loginDispatch = isSuiBlockchain ? loginWithSuiDispatch : loginWithWalletDispatch;
  const [searchText, setSearchText] = useState('');
  const onChangeInputHandler = (e) => {
    if (searchText.length < 1000) {
      setSearchText(e.currentTarget.value);
    }
  };
  const onKeyDownHandler = (e) => {
    if (e.key === 'Enter' && searchText.length > 0 && searchText.length < 1000) {
      getSearchResultDispatch(searchText, single);
    }
  };
  const clearInputHandler = () => {
    setSearchText('');
  };
  const getSearchResultHandler = () => {
    if (searchText.length > 0 && searchText.length < 1000) {
      getSearchResultDispatch(searchText, single);
    }
  };

  return (
    <>
      <Seo
        title={t('common.aiPoweredSearch')}
        description={t('common.aiPoweredSearch')}
        language={locale}
        index={false}
      />

      <Header
        className="mb-to-sm-0 mb-from-sm-3 df fdc"
        css={css`
          align-items: baseline;
          padding-top: 30px;
          @media only screen and (max-width: 576px) {
            border: none;
          }
        `}
      >
        <H3>
          <div
            css={css`
              .fill {
                fill: ${customColor};
              }

              .white {
                fill: #fff !important;
              }

              .stroke {
                stroke: ${customColor};
              }

              .semitransparent {
                fill: ${colors.transparentIconColor || ICON_TRASPARENT_BLUE};
              }
            `}
          >
            <MediumIconStyled>
              {graphCommunity ? (
                <SparkleGraph size={[28, 28]} />
              ) : (
                <IconLg icon={AIIcon} width={32} fill={BORDER_PRIMARY} />
              )}
            </MediumIconStyled>
          </div>
          <span css={styles.aiPoweredSearchText}>{t('common.aiPoweredSearch')}</span>
        </H3>
        <div css={styles.headerSearchField}>
          <input
            type="text"
            css={styles.searchInput}
            placeholder={t('common.aiPoweredSearchInputPlaceholder')}
            value={searchText}
            onChange={onChangeInputHandler}
            onKeyDown={onKeyDownHandler}
          />
          {searchText ? (
            graphCommunity ? (
              <XGraph size={[24, 24]} onClick={clearInputHandler} css={styles.closeInputIcon} />
            ) : (
              <Close fill={'#BDBDBD'} onClick={clearInputHandler} css={styles.closeInputIcon} />
            )
          ) : graphCommunity ? (
            <MagnifyingGlassGraph size={[24, 24]} css={styles.searchInputIcon} />
          ) : (
            <SearchAI size={[30, 30]} stroke={'#BDBDBD'} css={styles.searchInputIcon} />
          )}
          <Button
            id="header-ask-question"
            onClick={getSearchResultHandler}
            disabled={searchResultLoading}
            css={css`
              opacity: ${searchResultLoading ? '0.8' : '1'};
              position: absolute;
              top: 10px;
              right: 15px;
              border-radius: ${BORDER_RADIUS_M};

              .fill {
                fill: ${TEXT_LIGHT};
              }

              .stroke {
                stroke: ${TEXT_LIGHT};
              }

              span {
                display: flex;
                align-items: center;
              }

              background: ${colors.btnColor};
              :hover {
                opacity: 0.8;
              }
            `}
          >
            {graphCommunity ? (
              <SparkleGraph size={[24, 24]} />
            ) : (
              <IconLg fill={TEXT_LIGHT} icon={AIIcon} />
            )}
            <span
              className="ml-2"
              css={css`
                color: ${TEXT_LIGHT};
              `}
            >
              {t('common.askAI')}
            </span>
          </Button>
        </div>
      </Header>
      <div css={styles.searchBlock}>
        <div css={styles.searchField}>
          <input
            type="text"
            css={styles.searchInput}
            placeholder={t('common.askAIQuestion')}
            value={searchText}
            onChange={onChangeInputHandler}
            onKeyDown={onKeyDownHandler}
          />
          {searchText ? (
            <Close fill={'#A7A7AE'} css={styles.closeInputIcon} onClick={clearInputHandler} />
          ) : (
            <SearchAI size={[30, 30]} stroke={'#BDBDBD'} css={styles.searchInputIcon} />
          )}
        </div>
        <Button
          id="header-ask-question"
          onClick={getSearchResultHandler}
          disabled={searchResultLoading}
          css={css`
            opacity: ${searchResultLoading ? '0.8' : '1'};
            margin-top: 15px;

            .fill {
              fill: ${TEXT_LIGHT};
            }

            .stroke {
              stroke: ${TEXT_LIGHT};
            }

            span {
              display: flex;
              align-items: center;
            }

            background: ${colors.btnColor};

            :hover {
              opacity: 0.8;
            }
          `}
        >
          <IconLg fill={TEXT_LIGHT} icon={AIIcon} />
          <span
            className="ml-2"
            css={css`
              color: ${TEXT_LIGHT};
            `}
          >
            {t('common.askAI')}
          </span>
        </Button>
      </div>
      {!searchResultLoading && !searchResult.hasOwnProperty('found') && (
        <>
          <h3 css={styles.subTitle}>{t('common.exploreAI')}</h3>
          <div css={styles.additionalInfo}>
            <div css={styles.additionalInfoItem}>
              <MediumIconStyled>
                {graphCommunity ? <TimerGraph size={[24, 24]} /> : <Time stroke={customColor} />}
              </MediumIconStyled>
              <h4 css={styles.additionalInfoItemTitle}>{t('common.timeEfficiency')}</h4>
              <p css={styles.additionalInfoItemContent}>{t('common.unlockPotential')}</p>
            </div>
            <div css={styles.additionalInfoItem}>
              <MediumIconStyled>
                {graphCommunity ? (
                  <DatabaseGraph size={[24, 24]} />
                ) : (
                  <OutlinedBurger stroke={customColor} />
                )}
              </MediumIconStyled>
              <h4 css={styles.additionalInfoItemTitle}>{t('common.broadBase')}</h4>
              <p css={styles.additionalInfoItemContent}>{t('common.connectAI')}</p>
            </div>
            <div css={styles.additionalInfoItem}>
              <MediumIconStyled>
                {graphCommunity ? (
                  <TrendUpGraph size={[24, 24]} />
                ) : (
                  <TrendingUp stroke={customColor} />
                )}
              </MediumIconStyled>
              <h4 css={styles.additionalInfoItemTitle}>{t('common.continuousImprovement')}</h4>
              <p css={styles.additionalInfoItemContent}>{t('common.experienceEnhancements')}</p>
            </div>
          </div>
        </>
      )}
      {!searchResultLoading && searchResult.found === true && (
        <>
          <h3 css={styles.subTitle}>{t('common.results')}</h3>
          <div css={styles.searchMainBlock}>
            <div css={styles.searchResult}>
              <h2 css={styles.searchResultTitle}>{searchResult.question}</h2>
              <MarkdownPreviewBlock content={searchResult.answer} />
            </div>
            <div css={styles.sources}>
              <h3 css={styles.sourcesTitle}>{t('common.sources')}</h3>
              <ul css={styles.sourcesList}>
                {searchResult.resources.map((resource) => (
                  <li css={styles.sourcesListItem} key={resource.url}>
                    <a href={resource.url} target="_blank">
                      <h4 css={styles.sourcesListItemTitle}>{resource.title}</h4>
                      <p css={styles.sourcesListItemText}>{resource.content}</p>
                      <span css={styles.sourcesListItemLink}>{resource.url}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
      {!searchResultLoading && searchResult.found === false && (
        <Banner
          profileInfo={profileInfo}
          redirectToAskQuestionPage={redirectToAskQuestionPageDispatch}
          showLoginModalWithRedirectToAskQuestionPage={() => loginDispatch(true)}
        />
      )}

      {searchResultLoading && <LoadingIndicator />}
    </>
  );
};

export default compose(
  injectReducer({ key: 'aiSearchReducer', reducer }),
  injectSaga({ key: 'aiSearchReducer', saga, mode: DAEMON }),
  connect(
    createStructuredSelector({
      locale: makeSelectLocale(),
      profileInfo: makeSelectProfileInfo(),
      searchResultLoading: selectSearchResultLoading(),
      searchResult: selectSearchResult(),
    }),
    (dispatch) => ({
      getSearchResultDispatch: bindActionCreators(getSearchResult, dispatch),
      redirectToAskQuestionPageDispatch: bindActionCreators(redirectToAskQuestionPage, dispatch),
      loginWithSuiDispatch: bindActionCreators(loginWithSui, dispatch),
      loginWithWalletDispatch: bindActionCreators(loginWithWallet, dispatch),
    }),
  ),
)(AISearch);
