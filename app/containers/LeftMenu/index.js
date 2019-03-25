/**
 *
 * LeftMenu
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import styled from 'styled-components';
import { darkblue } from 'style-constants';

import closeIcon from 'svg/close';
import Icon from 'components/Icon';
import Span from 'components/Span';

import { LEFT_MENU_WIDTH } from 'containers/App/constants';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';

import FixedContent from './FixedContent';

/* istanbul ignore next */
const Aside = styled.aside`
  ${props =>
    props.isMenuVisible
      ? `
    width: 100%;
    min-height: 100vh;`
      : `
    flex: 0 0 ${LEFT_MENU_WIDTH}px;
    margin-top: 15px;
    margin-right: 15px;
  `};
`;

const After = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 50px;
  height: 100vh;
  z-index: 9999;
  background: ${darkblue}E6;
  display: flex;
  justify-content: center;
  padding: 25px 0;
`;

const LeftMenu = /* istanbul ignore next */ ({
  profile,
  isMenuVisible,
  isNavigationExpanded,
  showMenu,
}) => (
  <Aside
    isMenuVisible={isMenuVisible}
    className={`${isMenuVisible ? 'd-block' : 'd-none d-lg-block'}`}
  >
    <FixedContent
      isNavigationExpanded={isNavigationExpanded}
      isMenuVisible={isMenuVisible}
      profile={profile}
    />

    {isMenuVisible && (
      <After onClick={showMenu}>
        <Span color="white">
          <Icon icon={closeIcon} noMargin />
        </Span>
      </After>
    )}
  </Aside>
);

LeftMenu.propTypes = {
  profile: PropTypes.object,
  isMenuVisible: PropTypes.bool,
  isNavigationExpanded: PropTypes.bool,
  showMenu: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfileInfo(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(LeftMenu);
