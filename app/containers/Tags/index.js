/**
 *
 * Tags
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { translationMessages } from 'i18n';

import { DAEMON } from 'utils/constants';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';

import { selectCommunities } from 'containers/DataCacheProvider/selectors';

import { showLoginModal } from 'containers/Login/actions';
import { LEFT_MENU_WIDTH } from 'containers/App/constants';

import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';
import BaseTransparent from 'components/Base/BaseTransparent';

import reducer from './reducer';
import saga from './saga';
import { getSuggestedTags, getExistingTags } from './actions';
import { createTagValidator } from './validate';
import * as selectors from './selectors';

import Header from './Header';
import GoToCreateTagFromBanner from './GoToCreateTagFromBanner';

const AsideWrapper = BaseTransparent.extend`
  flex: 0 0 ${LEFT_MENU_WIDTH}px;
  padding-top: 20px;
`.withComponent('aside');

export const goToCreateTagScreen = ({
  profile,
  showLoginModalDispatch,
  locale,
  communityId,
  buttonId,
}) => {
  if (!profile) {
    showLoginModalDispatch();
    return null;
  }

  const isValid = createTagValidator(
    profile,
    translationMessages[locale],
    buttonId,
  );

  if (!isValid) {
    return null;
  }

  createdHistory.push(routes.tagsCreate(communityId));
};

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

  goToCreateTagScreen = /* istanbul ignore next */ e => {
    const { showLoginModalDispatch, locale, communityId, profile } = this.props;

    goToCreateTagScreen({
      profile,
      showLoginModalDispatch,
      locale,
      communityId,
      buttonId: e.currentTarget.id,
    });
  };

  render() /* istanbul ignore next */ {
    const {
      sorting,
      currentCommunity,
      tagsNumber,
      sortTags,
      Content,
      Aside,
    } = this.props;

    if (!currentCommunity.tags.length) return <LoadingIndicator />;

    return (
      <div className="d-flex justify-content-center">
        <div className="flex-grow-1">
          <Header
            goToCreateTagScreen={this.goToCreateTagScreen}
            sortTags={sortTags}
            sorting={sorting}
            currentCommunity={currentCommunity}
            tagsNumber={tagsNumber}
          />

          <div className="my-3">{Content}</div>

          <GoToCreateTagFromBanner openTagForm={this.goToCreateTagScreen} />
        </div>

        <AsideWrapper className="d-none d-xl-block pr-0">{Aside}</AsideWrapper>
      </div>
    );
  }
}

Tags.propTypes = {
  locale: PropTypes.string,
  sorting: PropTypes.string,
  profile: PropTypes.object,
  showLoginModalDispatch: PropTypes.func,
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
    getSuggestedTagsDispatch: obj => dispatch(getSuggestedTags(obj)),
    getExistingTagsDispatch: obj => dispatch(getExistingTags(obj)),
    showLoginModalDispatch: () => dispatch(showLoginModal()),
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
