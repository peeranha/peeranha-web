import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { translationMessages } from 'i18n';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { css } from '@emotion/react';
import commonMessages from 'common-messages';
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

import messages from './messages';
import { selectCommunities } from '../DataCacheProvider/selectors';
import InfinityLoader from '../../components/InfinityLoader';
import { TEXT_SECONDARY } from '../../style-constants';
import SearchContent from './SearchContent';

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
          <MediumImageStyled src={searchIcon} alt="search" />
          <FormattedMessage {...commonMessages.search} />
        </H3>
        <div>
          <span className="bold">
            <FormattedMessage
              id={commonMessages[items.length ? 'results' : 'noResults'].id}
            />
          </span>
          {Boolean(items.length) && (
            <span
              className="fz14 ml8"
              css={css`
                color: ${TEXT_SECONDARY};
              `}
            >
              {items.length}
            </span>
          )}
        </div>
      </Header>

      {items.length > 0 && (
        <InfinityLoader
          loadNextPaginatedData={false}
          isLoading={getResultsProcessing}
          isLastFetch={false}
        >
          <SearchContent
            locale={locale}
            posts={items}
            communities={communities}
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
