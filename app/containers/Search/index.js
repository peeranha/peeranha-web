import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { css } from '@emotion/react';

import { BORDER_PRIMARY, ICON_TRASPARENT_BLUE, TEXT_DARK, TEXT_SECONDARY } from 'style-constants';
import searchIcon from 'images/searchIcon.svg?external';

import {
  singleCommunityColors,
  singleCommunityFonts,
  graphCommunityColors,
} from 'utils/communityManagement';
import { isSuiBlockchain } from 'utils/constants';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { IconLg } from 'components/Icon/IconWithSizes';
import { MediumIconStyled } from 'components/Icon/MediumIcon';
import H3 from 'components/H3';
import Seo from 'components/Seo';
import Header from 'components/Header/Simple';
import Loader from 'components/LoadingIndicator/WidthCentered';
import { MagnifyingGlassGraph } from 'components/icons';

import reducer from './reducer';
import saga from './saga';
import { selectItems, selectGetResultsProcessing } from './selectors';
import { getResults } from './actions';
import Banner from './Banner/Banner';
import SearchContent from './SearchContent';
import { selectCommunities } from '../DataCacheProvider/selectors';
import { redirectToAskQuestionPage } from '../AskQuestion/actions';
import { loginWithWallet, loginWithSui } from '../Login/actions';
import { makeSelectProfileInfo } from '../AccountProvider/selectors';

const colors = singleCommunityColors();
const { main } = singleCommunityFonts();
const graphCommunity = graphCommunityColors();

const customColor = colors.linkColor || BORDER_PRIMARY;

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
  loginWithSuiDispatch,
}) => {
  const { t } = useTranslation();
  const query = match.params.q;
  useEffect(() => {
    if (query) {
      getResultsDispatch(query);
    }
  }, [getResultsDispatch, query]);

  const loginDispatch = isSuiBlockchain ? loginWithSuiDispatch : loginWithWalletDispatch;

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
          <div
            css={css`
              .fill {
                fill: ${customColor};
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
                <MagnifyingGlassGraph size={[24, 24]} />
              ) : (
                <IconLg icon={searchIcon} width={38} fill={BORDER_PRIMARY} />
              )}
            </MediumIconStyled>
          </div>
          {t('common.search')}
        </H3>
        {Boolean(items.length) && (
          <div>
            <span
              className="semi-bold fz16"
              css={css`
                color: ${graphCommunity ? '#A7A7AD' : TEXT_DARK};
                font-family: ${main || 'Source Sans Pro, sans-serif'};
              `}
            >
              {t('common.results')}
            </span>
            <span
              className="fz16 ml8"
              css={css`
                color: ${graphCommunity ? '#A7A7AD' : TEXT_SECONDARY};
              `}
            >
              {items.length}
            </span>
          </div>
        )}
      </Header>

      {(getResultsProcessing && <Loader />) ||
        (items.length > 0 ? (
          <SearchContent locale={locale} posts={items} communities={communities} />
        ) : (
          <Banner
            profileInfo={profileInfo}
            redirectToAskQuestionPage={redirectToAskQuestionPageDispatch}
            showLoginModalWithRedirectToAskQuestionPage={() => loginDispatch(true)}
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
  loginWithSuiDispatch: PropTypes.func,
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
      redirectToAskQuestionPageDispatch: bindActionCreators(redirectToAskQuestionPage, dispatch),
      loginWithSuiDispatch: bindActionCreators(loginWithSui, dispatch),
    }),
  ),
)(Search);
