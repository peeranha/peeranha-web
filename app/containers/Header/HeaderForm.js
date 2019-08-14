/**
 *
 * HeaderForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import { BG_LIGHT } from 'style-constants';
import createdHistory from 'createdHistory';

import Input from 'components/Input';
import RoundedButton from 'components/Button/Contained/InfoRoundedMedium';
import LargeButton from 'components/Button/Contained/InfoLarge';
import Icon from 'components/Icon';

import * as routes from 'routes-config';
import messages from 'common-messages';

import addIcon from 'images/add.svg?external';
import searchIcon from 'images/search.svg?inline';
import closeIcon from 'images/close.svg?external';
import headerNavigationIcon from 'images/headerNavigation.svg?external';
import img from 'images/LogoBlack.svg?inline';

import Wrapper from './Wrapper';
import Section from './Section';
import Logo from './Logo';

import ButtonGroupForNotAuthorizedUser from './ButtonGroupForNotAuthorizedUser';
import ButtonGroupForAuthorizedUser from './ButtonGroupForAuthorizedUser';
import { HEADER_ID } from './constants';

const RoundedButtonStyled = RoundedButton.extend`
  background: ${BG_LIGHT};
`;

export const LoginProfile = React.memo(
  /* istanbul ignore next */ ({
    profileInfo,
    showLoginModalDispatch,
    isMenuVisible,
    expandLeftMenuNavigation,
  }) => {
    if (profileInfo) {
      return (
        <ButtonGroupForAuthorizedUser
          isMenuVisible={isMenuVisible}
          profileInfo={profileInfo}
          expandLeftMenuNavigation={expandLeftMenuNavigation}
        />
      );
    }

    return (
      <ButtonGroupForNotAuthorizedUser
        isMenuVisible={isMenuVisible}
        showLoginModal={showLoginModalDispatch}
      />
    );
  },
);

const homeRoute = routes.home();
export const addQuestionRoute = /* istanbul ignore next */ () => {
  createdHistory.push(routes.questionAsk());
};

const HeaderForm = /* istanbul ignore next */ props => (
  <Wrapper id={HEADER_ID}>
    <div className="container">
      <div className="d-flex align-items-center justify-content-between">
        {!props.isMenuVisible && (
          <Logo className="d-flex align-items-center">
            <Icon
              width="20"
              onClick={props.showMenu}
              className="mr-3 d-flex d-md-none"
              icon={!props.isMenuVisible ? headerNavigationIcon : closeIcon}
              noMargin
            />

            <Link to={homeRoute} href={homeRoute}>
              <img src={img} alt="logo" />
            </Link>
          </Logo>
        )}

        <Section isMenuVisible={props.isMenuVisible}>
          {!props.isMenuVisible && (
            <React.Fragment>
              <Input
                className="d-none d-lg-flex"
                type="text"
                placeholder={props.intl.formatMessage({
                  id: messages.search.id,
                })}
                isSearchable
              />

              <RoundedButtonStyled
                className="d-flex justify-content-center align-items-center d-lg-none"
                onClick={addQuestionRoute}
              >
                <img src={searchIcon} alt="icon" />
              </RoundedButtonStyled>

              <LargeButton
                className="d-none d-lg-flex"
                disabled={!props.profileInfo}
                onClick={addQuestionRoute}
              >
                <Icon color={BG_LIGHT} icon={addIcon} width="14" />
                <FormattedMessage {...messages.addQuestion} />
              </LargeButton>

              <RoundedButton
                className="d-flex justify-content-center align-items-center d-lg-none"
                disabled={!props.profileInfo}
                onClick={addQuestionRoute}
              >
                <img src={addIcon} alt="icon" />
              </RoundedButton>
            </React.Fragment>
          )}

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
  showLoginModalDispatch: PropTypes.func,
};

export default injectIntl(React.memo(HeaderForm));
