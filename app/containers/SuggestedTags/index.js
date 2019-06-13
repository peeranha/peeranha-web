/**
 *
 * SuggestedCommunities
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';

import { getFollowedCommunities } from 'utils/communityManagement';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { getSuggestedTags } from 'containers/Tags/actions';

import {
  selectSuggestedTags,
  selectIsLastFetchForSuggestedTags,
  selectSuggestedTagsLoading,
  selectExistingTags,
} from 'containers/Tags/selectors';

import { selectCommunities } from 'containers/DataCacheProvider/selectors';

import Seo from 'components/Seo';
import Tags from 'containers/Tags';

import messages from './messages';

import Content from './Content';
import Aside from './Aside';

/* eslint-disable react/prefer-stateless-function */
export class SuggestedTags extends React.Component {
  sortTags = ev => {
    const sorting = ev.currentTarget.dataset.key;

    this.props.getSuggestedTagsDispatch({
      sorting,
      communityId: this.currentCommunity.id,
    });
  };

  loadMoreTags = () => {
    this.props.getSuggestedTagsDispatch({
      communityId: this.currentCommunity.id,
      loadMore: true,
    });
  };

  render() /* istanbul ignore next */ {
    const {
      locale,
      match,
      communities,
      suggestedTags,
      emptyCommunity,
      isLastFetch,
      suggestedTagsLoading,
      existingTags,
    } = this.props;

    this.currentCommunity =
      getFollowedCommunities(communities, [+match.params.communityid])[0] ||
      emptyCommunity;

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
          communityId={+match.params.communityid}
          currentCommunity={this.currentCommunity}
          Aside={<Aside existingTags={existingTags} />}
          Content={
            <Content
              loadMoreTags={this.loadMoreTags}
              isLastFetch={isLastFetch}
              communityId={+match.params.communityid}
              suggestedTagsLoading={suggestedTagsLoading}
              suggestedTags={suggestedTags}
            />
          }
        />
      </div>
    );
  }
}

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
  suggestedTags: selectSuggestedTags(),
  isLastFetch: selectIsLastFetchForSuggestedTags(),
  suggestedTagsLoading: selectSuggestedTagsLoading(),
  existingTags: selectExistingTags(),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    getSuggestedTagsDispatch: obj => dispatch(getSuggestedTags(obj)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SuggestedTags);
