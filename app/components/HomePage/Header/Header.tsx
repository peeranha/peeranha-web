import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import * as routes from 'routes-config';
import createdHistory from 'createdHistory';

import logo from 'images/LogoBlack.svg?inline';

import messages from '../messages';

import { pageStyles } from '../HomePage.styled';
import { styles } from './Header.styled';

const Header: React.FC<{ sticky: boolean }> = ({ sticky }): JSX.Element => (
  <section className="ps t0" css={sticky && styles.headerSection}>
    <div
      className="df aic jcsb"
      css={{ ...pageStyles.container, ...styles.wrapper }}
    >
      <Link to={routes.home()}>
        <img src={logo} alt="Peeranha Logo" css={styles.logo} />
      </Link>
      <div className="df aic">
        <Link to="#about">
          <span
            css={styles.link}
            onClick={() =>
              setTimeout(() => createdHistory.push(routes.home()), 1000)
            }
          >
            <FormattedMessage id={messages.about.id} />
          </span>
        </Link>
        <Link to="#service">
          <span
            css={styles.link}
            onClick={() =>
              setTimeout(() => createdHistory.push(routes.home()), 1000)
            }
          >
            <FormattedMessage id={messages.service.id} />
          </span>
        </Link>
        <button
          className="df jcc aic fz14"
          css={styles.button}
          onClick={() => createdHistory.push(routes.feed())}
        >
          <FormattedMessage id={messages.goToApp.id} />
        </button>
      </div>
    </div>
  </section>
);

export default Header;
