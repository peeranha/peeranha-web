import React, { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';
import { bindActionCreators, compose } from 'redux';

import {
  getFollowedCommunities,
  isSingleCommunityWebsite,
} from 'utils/communityManagement';
import injectReducer from 'utils/injectReducer';

import { selectCommunities } from 'containers/DataCacheProvider/selectors';

import {
  selectExistingTags,
  selectExistingTagsLoading,
  selectIsLastFetchForExistingTags,
  selectText,
} from 'containers/Tags/selectors';

import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { getExistingTags } from 'containers/Tags/actions';

import Tags from 'containers/Tags';
import Seo from 'components/Seo';

import reducer from './reducer';

import { setEditTagData } from './actions';
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
  getExistingTagsDispatch,
  setEditTagDataDispatch,
  profileInfo,
}) => {
  const communityId = useMemo(() => single || +match.params.communityid, [
    match.params.communityid,
    single,
  ]);

  const currentCommunity = useMemo(
    () =>
      getFollowedCommunities(communities, [communityId])[0] || emptyCommunity,
    [communityId, communities.length, emptyCommunity],
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
    [communityId, communities.length, currentCommunity],
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
        Aside={<Aside suggestedTags={[]} communityId={communityId} />}
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
            communityId={communityId}
            setEditTagData={setEditTagDataDispatch}
            profileInfo={profileInfo}
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
  emptyCommunity: PropTypes.object,
  getExistingTagsDispatch: PropTypes.func,
  match: PropTypes.object,
  setEditTagDataDispatch: PropTypes.func,
  profileInfo: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  communities: selectCommunities(),
  existingTags: selectExistingTags(),
  existingTagsLoading: selectExistingTagsLoading(),
  isLastFetch: selectIsLastFetchForExistingTags(),
  text: selectText(),
  profileInfo: makeSelectProfileInfo(),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    getExistingTagsDispatch: bindActionCreators(getExistingTags, dispatch),
    setEditTagDataDispatch: bindActionCreators(setEditTagData, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'tagsOfCommunity', reducer });

export default compose(
  withConnect,
  withReducer,
)(TagsOfCommunity);
