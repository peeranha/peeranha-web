import LargeOutlinedButton from 'components/Button/Outlined/InfoLarge';
import ChatSection from 'containers/AISearch/Components/ChatSection';
import MainSection from 'containers/AISearch/Components/MainSection';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';
import { HEADER_HEIGHT, MOBILE_HEADER_HEIGHT } from 'containers/Header/constants';
import useMediaQuery from 'hooks/useMediaQuery';
import ButtonLoader from 'icons/ButtonLoader';
import React, { useEffect, useRef, useState } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useTranslation } from 'react-i18next';
import Base from 'components/Base';
import { BG_LIGHT } from 'style-constants';

import injectReducer from 'utils/injectReducer';
import { DAEMON } from 'utils/constants';
import injectSaga from 'utils/injectSaga';
import { isSingleCommunityWebsite, graphCommunityColors } from 'utils/communityManagement';

import { loginWithSui, loginWithWallet } from 'containers/Login/actions';
import {
  selectAnswers,
  selectChatStarted,
  selectQuestions,
  selectSearchResultLoading,
} from 'containers/AISearch/selectors';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { redirectToAskQuestionPage } from 'containers/AskQuestion/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import Seo from 'components/Seo';
import { css } from '@emotion/react';

import { SearchAI } from 'components/icons';

import { getSearchResult, stopGeneration } from './actions';
import { styles } from './AISearch.styled';
import reducer from './reducer';
import saga from './saga';

const single = isSingleCommunityWebsite();
const graphCommunity = graphCommunityColors();

const AISearch = ({
  locale,
  getSearchResultDispatch,
  redirectToAskQuestionPageDispatch,
  searchResultLoading,
  questions,
  answers,
  communities,
  chatStarted,
  stopGenerationDispatch,
}) => {
  const { t } = useTranslation();
  const inputRef = useRef(null);

  useEffect(() => {
    if (!searchResultLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchResultLoading]);
  const communityName =
    communities.find((community) => community.id === single)?.name || 'Peeranha';

  const sampleQuestions = [
    t('common.whatIs', {
      community: communityName,
    }),
    t('common.howToStart', {
      community: communityName,
    }),
  ];
  const [searchText, setSearchText] = useState('');

  const onChangeInputHandler = (e) => {
    if (searchText.length < 1000) {
      setSearchText(e.currentTarget.value);
    }
  };

  const onSampleQuestionClickHandler = (query) => {
    getSearchResultDispatch(query, single);
    setSearchText('');
  };

  const onAskInCommunityHandler = (event) => {
    redirectToAskQuestionPageDispatch(event);
  };

  const onKeyDownHandler = (e) => {
    if (e.key === 'Enter' && searchText.length > 0 && searchText.length < 1000) {
      getSearchResultDispatch(searchText, single);
      setSearchText('');
    }
  };

  const getSearchResultHandler = () => {
    if (searchText.length > 0 && searchText.length < 1000) {
      getSearchResultDispatch(searchText, single);
      setSearchText('');
    }
  };
  const isDesktop = useMediaQuery('(min-width: 991px)');
  return (
    <>
      <Seo
        title={t('common.aiPoweredSearch')}
        description={t('common.aiPoweredSearch')}
        language={locale}
        index={false}
      />
      <div
        css={css`
          height: ${isDesktop
            ? `calc(100vh - ${HEADER_HEIGHT}px - 35px)`
            : `calc(100vh - ${MOBILE_HEADER_HEIGHT}px - 35px)`};
          display: flex;
          flex-direction: column;
        `}
      >
        <Base css={styles.textField}>
          {chatStarted ? (
            <ChatSection
              questions={questions}
              answers={answers}
              answerFinished={!searchResultLoading}
              onAskInCommunityHandler={onAskInCommunityHandler}
            />
          ) : (
            <MainSection
              graphCommunity={graphCommunity}
              sampleQuestions={sampleQuestions}
              onSampleQuestionClickHandler={onSampleQuestionClickHandler}
              communityName={communityName}
            />
          )}
        </Base>
        {searchResultLoading ? (
          <div css={styles.communicationField}>
            <LargeOutlinedButton onClick={stopGenerationDispatch}>
              <ButtonLoader width="16" css={styles.loader} />
              {t('common.stopGenerating')}
            </LargeOutlinedButton>
          </div>
        ) : (
          <Base
            css={css`
              box-sizing: border-box;
              flex-grow: 0;
              padding: 20px;
              position: relative;
            `}
          >
            <div css={styles.headerSearchField}>
              <input
                type="text"
                css={styles.searchInput}
                placeholder={t('common.aiPoweredSearchInputPlaceholder')}
                value={searchText}
                onChange={onChangeInputHandler}
                onKeyDown={onKeyDownHandler}
                maxLength={999}
                ref={inputRef}
              />
              <div style={{ textAlign: 'center', marginTop: '4px' }}>
                <span css={styles.aiTip}>{t('common.generatedByAI')}</span>
              </div>
              <div css={styles.searchInputIcon}>
                <SearchAI onClick={getSearchResultHandler} size={[36, 36]} />
              </div>
            </div>
          </Base>
        )}
      </div>
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
      questions: selectQuestions(),
      answers: selectAnswers(),
      communities: selectCommunities(),
      chatStarted: selectChatStarted(),
    }),
    (dispatch) => ({
      getSearchResultDispatch: bindActionCreators(getSearchResult, dispatch),
      redirectToAskQuestionPageDispatch: bindActionCreators(redirectToAskQuestionPage, dispatch),
      loginWithSuiDispatch: bindActionCreators(loginWithSui, dispatch),
      loginWithWalletDispatch: bindActionCreators(loginWithWallet, dispatch),
      stopGenerationDispatch: bindActionCreators(stopGeneration, dispatch),
    }),
  ),
)(AISearch);
