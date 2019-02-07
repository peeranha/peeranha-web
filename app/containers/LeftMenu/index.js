/**
 *
 * LeftMenu
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { compose } from 'redux';

import { LEFT_MENU_WIDTH } from 'containers/App/constants';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';

import FixedContent from './FixedContent';

const Aside = styled.aside`
  margin-right: 15px;
  margin-top: 15px;
  ${props =>
    props.isMenuVisible ? `width: 100%;` : `flex-basis: ${LEFT_MENU_WIDTH}px;`};
`;

const LeftMenu = ({ profile, isMenuVisible, isNavigationExpanded }) => (
  <Aside
    isMenuVisible={isMenuVisible}
    className={`${isMenuVisible ? 'd-block' : 'd-none d-lg-block'}`}
  >
    <FixedContent
      isNavigationExpanded={isNavigationExpanded}
      isMenuVisible={isMenuVisible}
      profile={profile}
    />
  </Aside>
);

LeftMenu.propTypes = {
  profile: PropTypes.object,
  isMenuVisible: PropTypes.bool,
  isNavigationExpanded: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfileInfo(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(LeftMenu);
