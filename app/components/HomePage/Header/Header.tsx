import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import * as routes from 'routes-config';
import createdHistory from 'createdHistory';

import logo from 'images/LogoBlack.svg?inline';
import { scrollToSection } from 'utils/animation';
import messages from '../messages';

import { pageStyles } from '../HomePage.styled';
import { styles } from './Header.styled';

const Header: React.FC = (): JSX.Element => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setSticky(window.scrollY > 0);
    });
  }, []);

  return (
    <>
      <section css={sticky && styles.headerSection}>
        <div
          className="df aic jcsb"
          css={{
            ...pageStyles.container,
            ...styles.wrapper,
            ...(sticky && styles.stickyWrapper),
          }}
        >
          <Link to={routes.home()}>
            <img src={logo} alt="Peeranha Logo" css={styles.logo} />
          </Link>
          <div className="df aic">
            <span css={styles.link} onClick={() => scrollToSection(`#about`)}>
              <FormattedMessage id={messages.about.id} />
            </span>
            <span css={styles.link} onClick={() => scrollToSection(`#service`)}>
              <FormattedMessage id={messages.service.id} />
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
      {sticky && <div css={pageStyles.sticky}></div>}
    </>
  );
};

export default Header;
