import React from 'react';
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

/* eslint-disable react/prefer-stateless-function */
export class TagsOfCommunity extends React.Component {
  clearTextField = () => {
    const text = '';

    this.props.getExistingTagsDispatch({
      communityId: this.currentCommunity.id,
      text,
    });
  };

  typeInput = ev => {
    const text = ev.target.value;

    this.props.getExistingTagsDispatch({
      communityId: this.currentCommunity.id,
      text,
    });
  };

  sortTags = ev => {
    const { key } = ev.currentTarget.dataset;

    this.props.getExistingTagsDispatch({
      communityId: this.currentCommunity.id,
      sorting: key,
    });
  };

  loadMoreTags = () => {
    this.props.getExistingTagsDispatch({
      communityId: this.currentCommunity.id,
      loadMore: true,
    });
  };

  render() /* istanbul ignore next */ {
    const {
      locale,
      match,
      communities,
      emptyCommunity,
      existingTags,
      isLastFetch,
      existingTagsLoading,
      text,
      suggestedTags,
    } = this.props;

    const commId = isSingleCommunityWebsite() || +match.params.communityid;

    this.currentCommunity =
      getFollowedCommunities(communities, [commId])[0] || emptyCommunity;

    const keywords = this.currentCommunity.tags.map(x => x.name);

    return (
      <div>
        <Seo
          title={translationMessages[locale][messages.title.id]}
          description={translationMessages[locale][messages.description.id]}
          language={locale}
          keywords={keywords}
        />

        <Tags
          sortTags={this.sortTags}
          communityId={commId}
          tagsNumber={this.currentCommunity.tags.length}
          currentCommunity={this.currentCommunity}
          Aside={<Aside suggestedTags={suggestedTags} communityId={commId} />}
          Content={
            <Content
              tags={existingTags}
              loadMoreTags={this.loadMoreTags}
              isLastFetch={isLastFetch}
              existingTagsLoading={existingTagsLoading}
              typeInput={this.typeInput}
              text={text}
              clearTextField={this.clearTextField}
              locale={locale}
            />
          }
        />
      </div>
    );
  }
}

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
