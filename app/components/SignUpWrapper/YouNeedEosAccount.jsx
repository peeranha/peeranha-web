import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import * as routes from 'routes-config';

import { selectFaqQuestions } from 'containers/DataCacheProvider/selectors';

import peeranhaLogo from 'images/LogoBlack.svg?inline';
import eosIcon from 'images/eosIcon.svg?inline';

import {
  BORDER_SECONDARY,
  TEXT_SECONDARY_LIGHT,
  TEXT_LIGHT,
  BG_PRIMARY,
  BG_LIGHT,
} from 'style-constants';

import H3 from 'components/H3';

import messages from 'containers/SignUp/messages';

import {
  WHY_DO_I_NEES_THIS_SERVICE_QUESTION,
  HOW_MUCH_DOES_IT_COST_QUESTION,
  IS_THIS_WEBSITE_SAFE_QUESTION,
  HOW_TO_USE_KEYS_QUESTION,
} from 'containers/Faq/constants';

import SignUpWrapper from './index';
import { Li, P } from './SignUpOptions';

const LeftMenu = ({ faqQuestions }) => (
  <React.Fragment>
    <div className="mb-4">
      <Link to={routes.questions()} href={routes.questions()}>
        <img src={peeranhaLogo} width="180px" alt="Peeranha logo" />
      </Link>
    </div>

    <H3 className="d-flex align-items-center mb-4">
      <img className="mr-3" src={eosIcon} alt="EOS icon" />
      <FormattedMessage {...messages.youNeedEosAccount} />
    </H3>

    <div className="mb-4">
      <P>
        <FormattedMessage {...messages.theWayEosWorks} />
      </P>
      <P>
        <FormattedMessage {...messages.ifYouCreateEos} />
      </P>
    </div>

    {faqQuestions && (
      <ul className="mb-4">{faqQuestions.map(x => <Li>{x}</Li>)}</ul>
    )}
  </React.Fragment>
);

const NavigationStyled = styled.div`
  display: flex;
  border: 1px solid ${BORDER_SECONDARY};
  border-radius: 5px;
  margin: 20px 30px;
  overflow: hidden;
`;

const NavButton = styled.a`
  flex: 1;
  padding: 10px 15px;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  cursor: pointer;

  :not(:last-child) {
    border-right: 1px solid ${BORDER_SECONDARY};
  }

  ${x =>
    x.to === window.location.pathname
      ? `
    color: ${TEXT_LIGHT};
    background: ${BG_PRIMARY};

    :hover {
      color: ${TEXT_LIGHT};
    }
  `
      : `
    color: ${TEXT_SECONDARY_LIGHT};
    background: ${BG_LIGHT};

    :hover {
      color: ${TEXT_SECONDARY_LIGHT};
    }
  `};
`.withComponent(Link);

const Navigation = () => (
  <NavigationStyled>
    <NavButton to={routes.signup.haveEosAccount.name}>
      <FormattedMessage {...messages.iHaveEosAccount} />
    </NavButton>
    <NavButton to={routes.signup.dontHaveEosAccount.name}>
      <FormattedMessage {...messages.idontHaveEosAccount} />
    </NavButton>
  </NavigationStyled>
);

/* eslint react/no-children-prop: 0 */
const RightMenu = ({ children }) => (
  <React.Fragment>
    <Navigation />
    <div>{children}</div>
  </React.Fragment>
);

const YouNeedEosAccount = ({ children, faqQuestions }) => (
  <SignUpWrapper
    LeftMenuChildren={<LeftMenu faqQuestions={faqQuestions} />}
    RightMenuChildren={<RightMenu children={children} />}
  />
);

LeftMenu.propTypes = {
  faqQuestions: PropTypes.array,
};

RightMenu.propTypes = {
  children: PropTypes.any,
};

YouNeedEosAccount.propTypes = {
  children: PropTypes.any,
  faqQuestions: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  faqQuestions: selectFaqQuestions([
    WHY_DO_I_NEES_THIS_SERVICE_QUESTION,
    HOW_MUCH_DOES_IT_COST_QUESTION,
    IS_THIS_WEBSITE_SAFE_QUESTION,
    HOW_TO_USE_KEYS_QUESTION,
  ]),
});

export default connect(
  mapStateToProps,
  null,
)(YouNeedEosAccount);
