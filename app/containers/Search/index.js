import { singleCommunityColors } from 'utils/communityManagement';
import { IconLg } from 'components/Icon/IconWithSizes';
import { MediumIconStyled } from 'components/Icon/MediumIcon';
import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { translationMessages } from 'i18n';
import styled from 'styled-components';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { css } from '@emotion/react';
import commonMessages from 'common-messages';
import searchIcon from 'images/searchIcon.svg?external';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import H3 from 'components/H3';
import Seo from 'components/Seo';
import Header from 'components/Header/Simple';

import reducer from './reducer';
import saga from './saga';

import { selectItems, selectGetResultsProcessing } from './selectors';
import { getResults } from './actions';

import messages from './messages';
import Banner from './Banner/Banner';
import { selectCommunities } from '../DataCacheProvider/selectors';
import Loader from 'components/LoadingIndicator/WidthCentered';
import {
  BORDER_PRIMARY,
  ICON_TRASPARENT_BLUE,
  TEXT_DARK,
  TEXT_SECONDARY,
} from '../../style-constants';
import SearchContent from './SearchContent';
import { redirectToAskQuestionPage } from '../AskQuestion/actions';
import { loginWithWallet } from '../Login/actions';
import { makeSelectProfileInfo } from '../AccountProvider/selectors';

const colors = singleCommunityColors();
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
}) => {
  const query = match.params.q;
  useEffect(() => {
    if (query) {
      getResultsDispatch(query);
    }
  }, [getResultsDispatch, query]);

  return (
    <div>
      <Seo
        title={translationMessages[locale][messages.title.id]}
        description={translationMessages[locale][messages.description.id]}
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
              <IconLg icon={searchIcon} width={38} fill={BORDER_PRIMARY} />
            </MediumIconStyled>
          </div>
          <FormattedMessage {...commonMessages.search} />
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
              <FormattedMessage id={commonMessages.results.id} />
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
