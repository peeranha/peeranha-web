import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import * as routes from 'routes-config';

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

import SignUpWrapper from './index';
import { Li, P } from './SignUpOptions';

const LeftMenu = () => (
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

    <ul className="mb-4">
      <Li>
        <Link to={routes.faq()} href={routes.faq()}>
          <FormattedMessage {...messages.whyDoIneedThisService} />
        </Link>
      </Li>
      <Li>
        <Link to={routes.faq()} href={routes.faq()}>
          <FormattedMessage {...messages.howMuchDoesItCost} />
        </Link>
      </Li>
      <Li>
        <Link to={routes.faq()} href={routes.faq()}>
          <FormattedMessage {...messages.ifThisWebsiteSafe} />
        </Link>
      </Li>
      <Li>
        <Link to={routes.faq()} href={routes.faq()}>
          <FormattedMessage {...messages.whatKeysAndHowToUse} />
        </Link>
      </Li>
    </ul>
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

const YouNeedEosAccount = ({ children }) => (
  <SignUpWrapper
    LeftMenuChildren={<LeftMenu />}
    RightMenuChildren={<RightMenu children={children} />}
  />
);

RightMenu.propTypes = {
  children: PropTypes.any,
};

YouNeedEosAccount.propTypes = {
  children: PropTypes.any,
};

export default React.memo(YouNeedEosAccount);
