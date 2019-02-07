/**
 *
 * HeaderForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import createdHistory from 'createdHistory';

import Input from 'components/Input';
import Button from 'components/Button';
import Icon from 'components/Icon';

import * as routes from 'routes-config';
import messages from 'common-messages';

import addIcon from 'svg/add';
import searchIcon from 'svg/search';
import closeIcon from 'svg/close';
import headerNavigationIcon from 'svg/headerNavigation';
import img from 'images/LogoBlack.svg';

import Wrapper from './Wrapper';
import Section from './Section';
import Logo from './Logo';

import UserAuthNavLinks from './UserAuthNavLinks';
import UserProfileNav from './UserProfileNav';
import { HEADER_ID } from './constants';

export const LoginProfile = React.memo(
  ({
    profileInfo,
    showSignUpModalDispatch,
    showLoginModalDispatch,
    isMenuVisible,
    expandLeftMenuNavigation,
  }) => {
    if (profileInfo) {
      return (
        <UserProfileNav
          isMenuVisible={isMenuVisible}
          profileInfo={profileInfo}
          expandLeftMenuNavigation={expandLeftMenuNavigation}
        />
      );
    }

    return (
      <UserAuthNavLinks
        isMenuVisible={isMenuVisible}
        showSignUpModal={showSignUpModalDispatch}
        showLoginModal={showLoginModalDispatch}
      />
    );
  },
);

const homeRoute = routes.home();
const addQuestionRoute = () => {
  createdHistory.push(routes.question_ask());
};

const HeaderForm = props => (
  <Wrapper id={HEADER_ID}>
    <div className="container">
      <div className="d-flex align-items-center justify-content-between">
        <Logo className="d-flex align-items-center">
          <Icon
            onClick={props.showMenu}
            className="mr-3 d-flex d-md-none"
            icon={!props.isMenuVisible ? headerNavigationIcon : closeIcon}
            noMargin
          />
          {!props.isMenuVisible && (
            <Link to={homeRoute} href={homeRoute}>
              <img src={img} alt="logo" />
            </Link>
          )}
        </Logo>

        <Section>
          {!props.isMenuVisible && [
            <Input
              key="1"
              className="d-none d-lg-flex"
              type="text"
              placeholder={props.intl.formatMessage({ id: messages.search.id })}
              isSearchable
            />,

            <Button
              key="2"
              className="d-flex justify-content-center align-items-center d-lg-none"
              type="red"
              onClick={addQuestionRoute}
              bg="white"
              isRounded
            >
              <Icon icon={searchIcon} noMargin />
            </Button>,

            <Button
              key="3"
              className="d-none d-lg-flex"
              type="red"
              disabled={!props.profileInfo}
              onClick={addQuestionRoute}
            >
              <Icon icon={addIcon} />
              <FormattedMessage {...messages.addQuestion} />
            </Button>,

            <Button
              key="4"
              className="d-flex justify-content-center align-items-center d-lg-none"
              type="red"
              disabled={!props.profileInfo}
              onClick={addQuestionRoute}
              isRounded
            >
              <Icon icon={addIcon} noMargin />
            </Button>,
          ]}

          <LoginProfile {...props} />
        </Section>
      </div>
    </div>
  </Wrapper>
);

HeaderForm.propTypes = {
  intl: intlShape.isRequired,
  profileInfo: PropTypes.object,
  isMenuVisible: PropTypes.bool,
  showMenu: PropTypes.func,
};

LoginProfile.propTypes = {
  profileInfo: PropTypes.object,
  showSignUpModalDispatch: PropTypes.func,
  showLoginModalDispatch: PropTypes.func,
};

export default injectIntl(React.memo(HeaderForm));
