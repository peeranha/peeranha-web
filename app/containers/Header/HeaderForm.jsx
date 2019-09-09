/**
 *
 * HeaderForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import { BG_LIGHT } from 'style-constants';
import createdHistory from 'createdHistory';

import RoundedButton from 'components/Button/Contained/InfoRoundedMedium';
import LargeButton from 'components/Button/Contained/InfoLarge';
import Icon from 'components/Icon';

import * as routes from 'routes-config';
import messages from 'common-messages';

import addIcon from 'images/add.svg?external';
import searchIcon from 'images/search.svg?inline';
import closeIcon from 'images/close.svg?inline';
import headerNavigationIcon from 'images/headerNavigation.svg?inline';
import img from 'images/LogoBlack.svg?inline';

import Wrapper from './Wrapper';
import Section from './Section';
import Logo from './Logo';

import ButtonGroupForNotAuthorizedUser from './ButtonGroupForNotAuthorizedUser';
import ButtonGroupForAuthorizedUser from './ButtonGroupForAuthorizedUser';
import SearchForm from './SearchForm';

import { HEADER_ID } from './constants';

const RoundedButtonStyled = RoundedButton.extend`
  background: ${BG_LIGHT};
`;

export const LoginProfile = React.memo(
  ({
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

const HeaderForm = props => (
  <Wrapper id={HEADER_ID}>
    <div className="container">
      <div className="d-flex align-items-center justify-content-between">
        {!props.isMenuVisible && (
          <div className="d-flex align-items-center">
            <button
              className="mt-1 mr-3 d-flex d-md-none"
              onClick={props.showMenu}
            >
              <img
                src={!props.isMenuVisible ? headerNavigationIcon : closeIcon}
                alt="switch"
              />
            </button>

            <Logo to={routes.home()} href={routes.home()}>
              <img src={img} alt="logo" />
            </Logo>
          </div>
        )}

        <Section isMenuVisible={props.isMenuVisible}>
          {!props.isMenuVisible && (
            <React.Fragment>
              <SearchForm
                placeholder={props.intl.formatMessage({
                  id: messages.search.id,
                })}
              />

              <RoundedButtonStyled
                className="d-flex justify-content-center align-items-center d-lg-none"
                onClick={() => createdHistory.push(routes.questionAsk())}
              >
                <img src={searchIcon} alt="icon" />
              </RoundedButtonStyled>

              <LargeButton
                className="d-none d-lg-flex"
                disabled={!props.profileInfo}
                onClick={() => createdHistory.push(routes.questionAsk())}
              >
                <Icon color={BG_LIGHT} icon={addIcon} width="14" />
                <FormattedMessage {...messages.addQuestion} />
              </LargeButton>

              <RoundedButton
                className="d-flex justify-content-center align-items-center d-lg-none"
                disabled={!props.profileInfo}
                onClick={() => createdHistory.push(routes.questionAsk())}
              >
                <Icon color={BG_LIGHT} icon={addIcon} width="14" noMargin />
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
