import React, { useState } from 'react';
import Link from 'react-router-dom/Link';
import styled from 'styled-components';
import LargeOutlinedButton from '../Button/Outlined/InfoLarge';
import { singleCommunityStyles } from '../../utils/communityManagement';
import { FormattedMessage } from 'react-intl';
import commonMessages from '../../common-messages';

const styles = singleCommunityStyles();

const CookieConsent = styled.div`
  background: #f0f8ffff;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 9999;

  animation: ${props =>
    props.enableAnimation ? 'animation 1s forwards' : 'none'};

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

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 0;
`;

const Text = styled.p`
  padding-right: 20px;
`;

const CookieConsentPopup = () => {
  const [enableAnimation, setEnableAnimation] = useState(false);
  const [isCookieConsent, setIsCookieConsent] = useState(
    !!localStorage.getItem('cookie-consent'),
  );

  const acceptCookiePolicy = () => {
    localStorage.setItem('cookie-consent', 'true');
    setEnableAnimation(true);

    setTimeout(() => setIsCookieConsent(true), 2000);
  };

  return (
    <>
      {!isCookieConsent && (
        <CookieConsent enableAnimation={enableAnimation}>
          <div className="container">
            <Wrapper>
              <Text>
                <FormattedMessage id={commonMessages.cookieConsent.id} />
                <Link to="/privacy-policy">More info</Link>
              </Text>
              <LargeOutlinedButton
                onClick={acceptCookiePolicy}
                customStyles={styles.headerLoginButtonStyles}
              >
                <FormattedMessage id={commonMessages.confirm.id} />
              </LargeOutlinedButton>
            </Wrapper>
          </div>
        </CookieConsent>
      )}
    </>
  );
};

export default CookieConsentPopup;
