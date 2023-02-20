import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as routes from 'routes-config';
import createdHistory from 'createdHistory';

import logo from 'images/LogoBlack.svg?inline';
import { scrollToSection } from 'utils/animation';

import { pageStyles } from '../HomePage.styled';
import { styles } from './Header.styled';

const Header: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  const [sticky, setSticky] = useState<boolean>(false);

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
            <span
              className="cup dn fz16"
              css={styles.link}
              onClick={() => scrollToSection(`#about`)}
            >
              {t('homePage.about')}
            </span>
            <span
              className="cup dn fz16"
              css={styles.link}
              onClick={() => scrollToSection(`#service`)}
            >
              {t('homePage.service')}
            </span>
            <button
              className="df jcc aic fz14"
              css={styles.button}
              onClick={() => createdHistory.push(routes.feed())}
            >
              {t('homePage.goToApp')}
            </button>
          </div>
        </div>
      </section>
      {sticky && <div css={pageStyles.sticky}></div>}
    </>
  );
};

export default Header;
