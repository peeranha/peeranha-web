/**
 *
 * Tags
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import { DAEMON } from 'utils/constants';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { selectCommunities } from 'containers/DataCacheProvider/selectors';

import { redirectToCreateTag } from 'containers/CreateTag/actions';

import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';
import AsideBox from 'components/Base/Aside';

import reducer from './reducer';
import saga from './saga';
import { getSuggestedTags, getExistingTags } from './actions';
import * as selectors from './selectors';

import Header from './Header';
import Banner from './Banner';

/* eslint consistent-return: 0 */
/* eslint-disable react/prefer-stateless-function */
export class Tags extends React.Component {
  componentDidMount() {
    const {
      communityId,
      getSuggestedTagsDispatch,
      getExistingTagsDispatch,
    } = this.props;

    getExistingTagsDispatch({ communityId });
    getSuggestedTagsDispatch({ communityId });
  }

  componentDidUpdate(prevProps) {
    const { communityId, getExistingTagsDispatch, communities } = this.props;

    if (!prevProps.communities.length && communities.length) {
      getExistingTagsDispatch({ communityId });
    }
  }

  render() /* istanbul ignore next */ {
    const {
      sorting,
      currentCommunity,
      tagsNumber,
      sortTags,
      Content,
      Aside,
      redirectToCreateTagDispatch,
    } = this.props;

    if (!currentCommunity.tags.length) return <LoadingIndicator />;

    return (
      <div className="d-flex justify-content-center">
        <div className="flex-grow-1">
          <Header
            goToCreateTagScreen={redirectToCreateTagDispatch}
            sortTags={sortTags}
            sorting={sorting}
            currentCommunity={currentCommunity}
            tagsNumber={tagsNumber}
          />

          <div className="mb-3">{Content}</div>

          <Banner openTagForm={redirectToCreateTagDispatch} />
        </div>

        <AsideBox className="d-none d-xl-block">{Aside}</AsideBox>
      </div>
    );
  }
}

Tags.propTypes = {
  sorting: PropTypes.string,
  redirectToCreateTagDispatch: PropTypes.func,
  getSuggestedTagsDispatch: PropTypes.func,
  getExistingTagsDispatch: PropTypes.func,
  Aside: PropTypes.any,
  Content: PropTypes.any,
  sortTags: PropTypes.func,
  tagsNumber: PropTypes.number,
  currentCommunity: PropTypes.object,
  communities: PropTypes.array,
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  profile: makeSelectProfileInfo(),
  sorting: selectors.selectSorting(),
  existingTagsLoading: selectors.selectExistingTagsLoading(),
  suggestedTagsLoading: selectors.selectSuggestedTagsLoading(),
  communities: selectCommunities(),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    getSuggestedTagsDispatch: bindActionCreators(getSuggestedTags, dispatch),
    getExistingTagsDispatch: bindActionCreators(getExistingTags, dispatch),
    redirectToCreateTagDispatch: bindActionCreators(
      redirectToCreateTag,
      dispatch,
    ),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'tags', reducer });
const withSaga = injectSaga({ key: 'tags', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Tags);
