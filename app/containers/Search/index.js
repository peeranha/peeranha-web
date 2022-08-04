import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

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
  const { t } = useTranslation();
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
        title={t('common.search')}
        description={t('common.descriptionSearch')}
        language={locale}
        index={false}
      />

      <Header className="mb-to-sm-0 mb-from-sm-3">
        <H3>
          <MediumImageStyled src={searchIcon} alt="search" />
          {t('common.search')}
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
