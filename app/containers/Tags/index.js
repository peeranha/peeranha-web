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

import { showLoginModal } from 'containers/Login/actions';

import BaseTransparent from 'components/Base/BaseTransparent';

import { LEFT_MENU_WIDTH } from 'containers/App/constants';

import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getSuggestedTags } from './actions';

import { createTagValidator } from './validate';

import Header from './Header';

const AsideWrapper = BaseTransparent.extend`
  width: ${LEFT_MENU_WIDTH}px;
`.withComponent('aside');

export const goToCreateTagScreen = ({
  profile,
  showLoginModalDispatch,
  locale,
  communityId,
}) => {
  if (!profile) {
    showLoginModalDispatch();
    return null;
  }

  const isValid = createTagValidator(profile, translationMessages[locale]);

  if (!isValid) {
    return null;
  }

  createdHistory.push(routes.tagsCreate(communityId));
};

/* eslint consistent-return: 0 */
/* eslint-disable react/prefer-stateless-function */
export class Tags extends React.Component {
  componentDidMount() {
    //    const { communityid } = this.props.match.params;
    //    this.props.getSuggestedTagsDispatch(communityid);
  }

  goToCreateTagScreen = () => {
    const { showLoginModalDispatch, locale, communityId, profile } = this.props;

    goToCreateTagScreen({
      profile,
      showLoginModalDispatch,
      locale,
      communityId,
    });
  };

  render() {
    const { communityId } = this.props;

    return (
      <div className="d-flex justify-content-center">
        <div className="flex-grow-1">
          <Header
            goToCreateTagScreen={this.goToCreateTagScreen}
            communityId={communityId}
          />

          <div className="my-3">CONTENT</div>
        </div>

        <AsideWrapper className="d-none d-xl-block pr-0">ASIDE</AsideWrapper>
      </div>
    );
  }
}

Tags.propTypes = {
  locale: PropTypes.string,
  profile: PropTypes.object,
  showLoginModalDispatch: PropTypes.func,
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  profile: makeSelectProfileInfo(),
  tags: selectors.selectTags(),
  tagsLoading: selectors.selectTagsLoading(),
});

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getSuggestedTagsDispatch: communityId =>
      dispatch(getSuggestedTags(communityId)),
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
