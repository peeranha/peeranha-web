import React, { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';
import { bindActionCreators } from 'redux';

import {
  getFollowedCommunities,
  isSingleCommunityWebsite,
} from 'utils/communityManagement';

import { selectCommunities } from 'containers/DataCacheProvider/selectors';

import {
  selectText,
  selectExistingTags,
  selectExistingTagsLoading,
  selectIsLastFetchForExistingTags,
  selectSuggestedTags,
} from 'containers/Tags/selectors';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { getExistingTags } from 'containers/Tags/actions';

import Tags from 'containers/Tags';
import Seo from 'components/Seo';

import messages from './messages';

import Content from './Content';
import Aside from './Aside';

const single = isSingleCommunityWebsite();

export const TagsOfCommunity = ({
  locale,
  match,
  communities,
  emptyCommunity,
  existingTags,
  isLastFetch,
  existingTagsLoading,
  text,
  suggestedTags,
  getExistingTagsDispatch,
}) => {
  const communityId = useMemo(() => single || +match.params.communityid, [
    match.params.communityid,
    single,
  ]);

  const currentCommunity = useMemo(
    () =>
      getFollowedCommunities(communities, [communityId])[0] || emptyCommunity,
    [communities, communityId, emptyCommunity],
  );

  const typeInput = useCallback(
    ev =>
      getExistingTagsDispatch({
        communityId: currentCommunity.id,
        text: ev.target.value,
      }),
    [currentCommunity.id],
  );

  const clearTextField = useCallback(
    () =>
      getExistingTagsDispatch({
        communityId: currentCommunity.id,
        text: '',
      }),
    [currentCommunity.id],
  );

  const sortTags = useCallback(
    ev =>
      getExistingTagsDispatch({
        communityId: currentCommunity.id,
        sorting: ev.currentTarget.dataset.key,
      }),
    [currentCommunity.id],
  );

  const loadMoreTags = useCallback(
    () =>
      getExistingTagsDispatch({
        communityId: currentCommunity.id,
        loadMore: true,
      }),
    [currentCommunity.id],
  );

  const keywords = useMemo(() => currentCommunity.tags.map(x => x.name), [
    currentCommunity.tags,
  ]);

  useEffect(
    () => {
      getExistingTagsDispatch({
        loadMore: false,
        communityId: currentCommunity.id,
      });
    },
    [communities.length, currentCommunity],
  );

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
        communityId={communityId}
        tagsNumber={currentCommunity.tags.length}
        currentCommunity={currentCommunity}
        Aside={
          <Aside suggestedTags={suggestedTags} communityId={communityId} />
        }
        Content={
          <Content
            tags={existingTags}
            loadMoreTags={loadMoreTags}
            isLastFetch={isLastFetch}
            existingTagsLoading={existingTagsLoading}
            typeInput={typeInput}
            text={text}
            clearTextField={clearTextField}
            locale={locale}
          />
        }
      />
    </div>
  );
};

TagsOfCommunity.defaultProps = {
  emptyCommunity: {
    tags: [],
  },
};

TagsOfCommunity.propTypes = {
  locale: PropTypes.string,
  communities: PropTypes.array,
  existingTags: PropTypes.array,
  existingTagsLoading: PropTypes.bool,
  isLastFetch: PropTypes.bool,
  text: PropTypes.string,
  suggestedTags: PropTypes.array,
  emptyCommunity: PropTypes.object,
  getExistingTagsDispatch: PropTypes.func,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  communities: selectCommunities(),
  existingTags: selectExistingTags(),
  existingTagsLoading: selectExistingTagsLoading(),
  isLastFetch: selectIsLastFetchForExistingTags(),
  text: selectText(),
  suggestedTags: selectSuggestedTags(),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    getExistingTagsDispatch: bindActionCreators(getExistingTags, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TagsOfCommunity);
