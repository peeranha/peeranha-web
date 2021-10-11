/**
 *
 * Tags
 *
 */

import React, { useEffect } from 'react';
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

import AsideBox from 'components/Base/Aside';

import reducer from './reducer';
import saga from './saga';
import { getExistingTags } from './actions';
import * as selectors from './selectors';

import Header from './Header';
import Banner from './Banner';

export const Tags = ({
  communityId,
  communities,
  sorting,
  currentCommunity,
  tagsNumber,
  sortTags,
  Content,
  redirectToCreateTagDispatch,
  getExistingTagsDispatch,
  profile,
}) => {
  useEffect(
    () => {
      getExistingTagsDispatch({ communityId });
    },
    [communityId],
  );

  useEffect(
    () => {
      if (!communities.length) {
        getExistingTagsDispatch({ communityId });
      }
    },
    [communities.length],
  );

  return (
    <div className="d-flex justify-content-center">
      <div className="flex-grow-1">
        <Header
          goToCreateTagScreen={redirectToCreateTagDispatch}
          sortTags={sortTags}
          sorting={sorting}
          currentCommunity={currentCommunity}
          tagsNumber={tagsNumber}
          profile={profile}
        />

        <div className="mb-3">{Content}</div>

        <Banner
          openTagForm={redirectToCreateTagDispatch}
          communityId={currentCommunity.id}
        />
      </div>
    </div>
  );
};

Tags.propTypes = {
  sorting: PropTypes.string,
  redirectToCreateTagDispatch: PropTypes.func,
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
  communities: selectCommunities(),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
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
