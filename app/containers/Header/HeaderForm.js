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
import img from 'images/LogoBlack.svg';

import Wrapper from './Wrapper';
import Section from './Section';
import Logo from './Logo';

import UserAuthNavLinks from './UserAuthNavLinks';
import UserProfileNav from './UserProfileNav';

export const LoginProfile = React.memo(
  ({ profileInfo, showSignUpModalDispatch, showLoginModalDispatch }) => {
    if (profileInfo) {
      return <UserProfileNav profileInfo={profileInfo} />;
    }

    return (
      <UserAuthNavLinks
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
  <Wrapper>
    <div className="container">
      <div className="d-flex align-items-center">
        <Logo>
          <Link to={homeRoute} href={homeRoute}>
            <img src={img} alt="logo" />
          </Link>
        </Logo>

        <Section>
          <Input
            type="text"
            placeholder={props.intl.formatMessage({ id: messages.search.id })}
            isSearchable
          />
          <Button
            type="red"
            disabled={!props.profileInfo}
            onClick={addQuestionRoute}
          >
            <Icon icon={addIcon} />
            <FormattedMessage {...messages.addQuestion} />
          </Button>
          <LoginProfile {...props} />
        </Section>
      </div>
    </div>
  </Wrapper>
);

HeaderForm.propTypes = {
  intl: intlShape.isRequired,
  profileInfo: PropTypes.bool,
};

LoginProfile.propTypes = {
  profileInfo: PropTypes.bool,
  showSignUpModalDispatch: PropTypes.func,
  showLoginModalDispatch: PropTypes.func,
};

export default injectIntl(React.memo(HeaderForm));
