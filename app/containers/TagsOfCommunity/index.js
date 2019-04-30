import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';

import { getFollowedCommunities } from 'utils/communityManagement';

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

import messages from './messages';

import Content from './Content';
import Aside from './Aside';

/* eslint-disable react/prefer-stateless-function */
export class TagsOfCommunity extends React.Component {
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

  render() {
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

    this.currentCommunity =
      getFollowedCommunities(communities, [+match.params.communityid])[0] ||
      emptyCommunity;

    return (
      <div>
        <Helmet>
          <title>{translationMessages[locale][messages.title.id]}</title>
          <meta
            name="description"
            content={translationMessages[locale][messages.description.id]}
          />
        </Helmet>

        <Tags
          sortTags={this.sortTags}
          communityId={+match.params.communityid}
          tagsNumber={this.currentCommunity.tags.length}
          currentCommunity={this.currentCommunity}
          Aside={
            <Aside
              suggestedTags={suggestedTags}
              communityId={+match.params.communityid}
            />
          }
          Content={
            <Content
              tags={existingTags}
              loadMoreTags={this.loadMoreTags}
              isLastFetch={isLastFetch}
              existingTagsLoading={existingTagsLoading}
              typeInput={this.typeInput}
              text={text}
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

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    getExistingTagsDispatch: obj => dispatch(getExistingTags(obj)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TagsOfCommunity);
