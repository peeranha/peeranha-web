import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { translationMessages } from 'i18n';
import { css } from '@emotion/react';
import cn from 'classnames';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import commonMessages from 'common-messages';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import H3 from 'components/H3';
import Seo from 'components/Seo';
import Header from 'components/Header/Simple';
import { BG_PRIMARY_SPECIAL_2 } from 'style-constants';
import SearchIcon from 'icons/Search';

import reducer from './reducer';
import saga from './saga';

import { selectItems, selectGetResultsProcessing } from './selectors';
import { getResults } from './actions';

import messages from './messages';
import Content from '../Questions/Content/Content';
import { selectCommunities } from '../DataCacheProvider/selectors';
import InfinityLoader from '../../components/InfinityLoader';

const Search = ({
  match,
  locale,
  items,
  getResultsDispatch,
  getResultsProcessing,
  communities,
}) => {
  const query = match.params.q;
  useEffect(
    () => {
      if (query) {
        getResultsDispatch(query);
      }
    },
    [getResultsDispatch, query],
  );

  return (
    <div>
      <Seo
        title={translationMessages[locale][messages.title.id]}
        description={translationMessages[locale][messages.description.id]}
        language={locale}
        index={false}
      />

      <Header className="mb-to-sm-0 mb-from-sm-3">
        <H3>
          <div
            className={cn('mr16 brc')}
            css={css`
              background: ${BG_PRIMARY_SPECIAL_2};
              border: 1px solid #c2c6d8;
              line-height: 8px;
            `}
          >
            <SearchIcon
              stroke="#576FED"
              shadowFill="#BBBEC8"
              stickFill="#A5BCFF"
            />
          </div>
          <FormattedMessage {...commonMessages.search} />
        </H3>
      </Header>

      {items.length > 0 && (
        <InfinityLoader
          loadNextPaginatedData={false}
          isLoading={getResultsProcessing}
          isLastFetch={false}
        >
          <Content
            questionsList={items}
            locale={locale}
            communities={communities}
            typeFilter={0}
            createdFilter={0}
            isModerator={false}
            profileInfo={null}
            isSearchPage
          />
        </InfinityLoader>
      )}
    </div>
  );
};

Search.propTypes = {
  items: PropTypes.array,
  getResultsDispatch: PropTypes.func,
  match: PropTypes.object,
  getResultsProcessing: PropTypes.bool,
  locale: PropTypes.string,
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
    }),
    dispatch => ({
      getResultsDispatch: bindActionCreators(getResults, dispatch),
    }),
  ),
)(Search);
