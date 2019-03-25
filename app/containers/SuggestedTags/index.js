/**
 *
 * SuggestedCommunities
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import LoadingIndicator from 'components/LoadingIndicator';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { getSuggestedTags, upVote, downVote } from './actions';

import SuggestedTagsView from './SuggestedTagsView';
import NoSuggestedTags from './NoSuggestedTags';

/* eslint-disable react/prefer-stateless-function */
export class SuggestedTags extends React.Component {
  componentDidMount() {
    const { communityid } = this.props.match.params;
    this.props.getSuggestedTagsDispatch(communityid);
  }

  upVote = ev => {
    const { communityid } = this.props.match.params;
    const { id, dataset } = ev.currentTarget;
    const { tagid } = dataset;

    this.props.upVoteDispatch(communityid, tagid, id);
  };

  downVote = ev => {
    const { communityid } = this.props.match.params;
    const { id, dataset } = ev.currentTarget;
    const { tagid } = dataset;

    this.props.downVoteDispatch(communityid, tagid, id);
  };

  render() {
    const { tags, tagsLoading, locale } = this.props;

    return (
      <div className="container">
        <Helmet>
          <title>{translationMessages[locale][messages.title.id]}</title>
          <meta
            name="description"
            content={translationMessages[locale][messages.description.id]}
          />
        </Helmet>

        {!tagsLoading && !tags.length && <NoSuggestedTags />}

        {!tagsLoading ? (
          <SuggestedTagsView
            tags={tags}
            upVote={this.upVote}
            downVote={this.downVote}
          />
        ) : (
          <LoadingIndicator />
        )}
      </div>
    );
  }
}

SuggestedTags.propTypes = {
  locale: PropTypes.string,
  match: PropTypes.object,
  tags: PropTypes.array,
  tagsLoading: PropTypes.bool,
  getSuggestedTagsDispatch: PropTypes.func,
  upVoteDispatch: PropTypes.func,
  downVoteDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  tags: selectors.selectTags(),
  tagsLoading: selectors.selectTagsLoading(),
});

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getSuggestedTagsDispatch: communityid =>
      dispatch(getSuggestedTags(communityid)),
    upVoteDispatch: (communityid, tagid, buttonId) =>
      dispatch(upVote(communityid, tagid, buttonId)),
    downVoteDispatch: (communityid, tagid, buttonId) =>
      dispatch(downVote(communityid, tagid, buttonId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'suggestedTags', reducer });
const withSaga = injectSaga({ key: 'suggestedTags', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SuggestedTags);
