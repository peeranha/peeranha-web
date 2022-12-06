import React from 'react';
import { FormattedMessage } from 'react-intl';
import * as routes from 'routes-config';
import createdHistory from 'createdHistory';

import logo from 'images/LogoBlack.svg?inline';

import messages from '../messages';

import { pageStyles } from '../HomePage.styled';
import { styles } from './Header.styled';

const Header: React.FC = (): JSX.Element => (
  <section css={pageStyles.container}>
    <div className="df aic jcsb" css={styles.wrapper}>
      <img src={logo} alt="Peeranha Logo" css={styles.logo} />
      <div className="df aic">
        <span css={styles.link}>
          <FormattedMessage id={messages.about.id} />
        </span>
        <span css={styles.link}>
          <FormattedMessage id={messages.rewards.id} />
        </span>
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
