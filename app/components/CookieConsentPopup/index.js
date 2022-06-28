import React, { useState } from 'react';
import Link from 'react-router-dom/Link';
import styled from 'styled-components';
import LargeOutlinedButton from '../Button/Outlined/InfoLarge';
import { singleCommunityStyles } from '../../utils/communityManagement';

const styles = singleCommunityStyles();

const CookieConsent = styled.div`
  background: aliceblue;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  z-index: 9999;
  padding: 24px 0;

  animation: ${props => (props.yeah ? 'animation 1s forwards' : 'none')};

  @keyframes animation {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(100%);
      display: none;
    }
  }
`;

const CookieConsentPopup = () => {
  const [yeah, setYeah] = useState(false);

  const [isCookieConsent, setIsCookieConsent] = useState(
    !!localStorage.getItem('cookie-consent'),
  );

  const acceptCookiePolicy = () => {
    localStorage.setItem('cookie-consent', 'true');
    setYeah(true);

    setTimeout(() => setIsCookieConsent(true), 2000);
  };

  return (
    <>
      {!isCookieConsent && (
        <CookieConsent yeah={yeah}>
          <p>
            We use cookies to ensure you get the best experience on our website.
            <Link to="/privacy-policy">More info</Link>
          </p>
          <LargeOutlinedButton
            className="d-none d-sm-flex"
            onClick={acceptCookiePolicy}
            customStyles={styles.headerLoginButtonStyles}
          >
            Accept
          </LargeOutlinedButton>
        </CookieConsent>
      )}
    </>
  );
};

export default CookieConsentPopup;
