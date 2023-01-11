import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { css } from '@emotion/react';
import searchIcon from 'images/searchIcon.svg?inline';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import H3 from 'components/H3';
import Seo from 'components/Seo';
import Header from 'components/Header/Simple';
import { MediumImageStyled } from 'components/Img/MediumImage';

import reducer from './reducer';
import saga from './saga';

import { selectItems, selectGetResultsProcessing } from './selectors';
import { getResults } from './actions';

import { selectCommunities } from '../DataCacheProvider/selectors';
import Banner from './Banner/Banner';

import Loader from 'components/LoadingIndicator/WidthCentered';
import { TEXT_DARK, TEXT_SECONDARY } from '../../style-constants';
import SearchContent from './SearchContent';
import { redirectToAskQuestionPage } from '../AskQuestion/actions';
import { loginWithWallet } from '../Login/actions';
import { makeSelectProfileInfo } from '../AccountProvider/selectors';

const Search = ({
  match,
  locale,
  items,
  getResultsDispatch,
  getResultsProcessing,
  communities,
  profileInfo,
  redirectToAskQuestionPageDispatch,
  loginWithWalletDispatch,
}) => {
  const { t } = useTranslation();
  const query = match.params.q;
  useEffect(() => {
    if (query) {
      getResultsDispatch(query);
    }
  }, [getResultsDispatch, query]);

  return (
    <div>
      <Seo
        title={t('common.search')}
        description={t('common.descriptionSearch')}
        language={locale}
        index={false}
      />

      <Header
        className="mb-to-sm-0 mb-from-sm-3 df jcsb aic"
        css={css`
          padding-top: 30px;
        `}
      >
        <H3>
          <MediumImageStyled src={searchIcon} alt="search" />
          {t('common.search')}
        </H3>
        {Boolean(items.length) && (
          <div>
            <span
              className="semi-bold fz16"
              css={css`
                color: ${TEXT_DARK};
                font-family: 'Source Sans Pro', sans-serif;
              `}
            >
              {t('common.results')}
            </span>
            <span
              className="fz16 ml8"
              css={css`
                color: ${TEXT_SECONDARY};
              `}
            >
              {items.length}
            </span>
          </div>
        )}
      </Header>

      {(getResultsProcessing && <Loader />) ||
        (items.length > 0 ? (
          <SearchContent
            locale={locale}
            posts={items}
            communities={communities}
          />
        ) : (
          <Banner
            profileInfo={profileInfo}
            redirectToAskQuestionPage={redirectToAskQuestionPageDispatch}
            showLoginModalWithRedirectToAskQuestionPage={() =>
              loginWithWalletDispatch({ metaMask: true }, true)
            }
          />
        ))}
    </div>
  );
};

Search.propTypes = {
  items: PropTypes.array,
  getResultsDispatch: PropTypes.func,
  match: PropTypes.object,
  getResultsProcessing: PropTypes.bool,
  locale: PropTypes.string,
  profileInfo: PropTypes.object,
  redirectToAskQuestionPageDispatch: PropTypes.func,
  loginWithWalletDispatch: PropTypes.func,
};

export default compose(
  injectReducer({ key: 'search', reducer }),
  injectSaga({ key: 'search', saga }),
  connect(
    createStructuredSelector({
      items: selectItems(),
      communities: selectCommunities(),
      getResultsProcessing: selectGetResultsProcessing(),
      locale: makeSelectLocale(),
      profileInfo: makeSelectProfileInfo(),
    }),
    (dispatch) => ({
      getResultsDispatch: bindActionCreators(getResults, dispatch),
      loginWithWalletDispatch: bindActionCreators(loginWithWallet, dispatch),
      redirectToAskQuestionPageDispatch: bindActionCreators(
        redirectToAskQuestionPage,
        dispatch,
      ),
    }),
  ),
)(Search);
