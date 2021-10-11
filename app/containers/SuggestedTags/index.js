import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';
import { bindActionCreators } from 'redux';

import {
  getFollowedCommunities,
  isSingleCommunityWebsite,
} from 'utils/communityManagement';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { getSuggestedTags } from 'containers/Tags/actions';

import {
  selectExistingTags,
  selectIsLastFetchForSuggestedTags,
} from 'containers/Tags/selectors';

import { selectCommunities } from 'containers/DataCacheProvider/selectors';

import Seo from 'components/Seo';
import Tags from 'containers/Tags';

import messages from './messages';

import Content from './Content';
import Aside from './Aside';

const single = isSingleCommunityWebsite();

export const SuggestedTags = ({
  locale,
  match,
  communities,
  suggestedTags,
  emptyCommunity,
  isLastFetch,
  suggestedTagsLoading,
  existingTags,
  getSuggestedTagsDispatch,
}) => {
  const commId = useMemo(() => single || +match.params.communityid, [
    single,
    match.params.communityid,
  ]);

  const currentCommunity = useMemo(
    () => getFollowedCommunities(communities, [commId])[0] || emptyCommunity,
    [communities, commId, emptyCommunity],
  );

  const sortTags = useCallback(
    ev =>
      getSuggestedTagsDispatch({
        sorting: ev.currentTarget.dataset.key,
        communityId: currentCommunity.id,
      }),
    [currentCommunity.id],
  );

  const loadMoreTags = useCallback(
    () =>
      getSuggestedTagsDispatch({
        communityId: currentCommunity.id,
        loadMore: true,
      }),
    [currentCommunity.id],
  );

  const keywords = useMemo(() => currentCommunity.tags.map(x => x.name), [
    currentCommunity.tags,
  ]);

  return (
    <div>
      <Seo
        title={translationMessages[locale][messages.title.id]}
        description={translationMessages[locale][messages.description.id]}
        language={locale}
        keywords={keywords}
      />

      <Tags
        sortTags={sortTags}
        communityId={commId}
        currentCommunity={currentCommunity}
        Aside={
          <Aside
            existingTags={existingTags}
            currentCommunity={currentCommunity}
          />
        }
        Content={
          <Content
            loadMoreTags={loadMoreTags}
            isLastFetch={isLastFetch}
            communityId={commId}
            suggestedTagsLoading={suggestedTagsLoading}
            suggestedTags={suggestedTags}
          />
        }
      />
    </div>
  );
};

SuggestedTags.defaultProps = {
  emptyCommunity: {
    tags: [],
  },
};

SuggestedTags.propTypes = {
  locale: PropTypes.string,
  communities: PropTypes.array,
  suggestedTags: PropTypes.array,
  isLastFetch: PropTypes.bool,
  suggestedTagsLoading: PropTypes.bool,
  existingTags: PropTypes.array,
  match: PropTypes.object,
  emptyCommunity: PropTypes.object,
  getSuggestedTagsDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  communities: selectCommunities(),
  isLastFetch: selectIsLastFetchForSuggestedTags(),
  existingTags: selectExistingTags(),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    getSuggestedTagsDispatch: bindActionCreators(getSuggestedTags, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SuggestedTags);
