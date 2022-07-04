import React, { useState } from 'react';
import { css } from '@emotion/react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import LargeOutlinedButton from '../Button/Outlined/InfoLarge';
import { singleCommunityStyles } from '../../utils/communityManagement';

import commonMessages from '../../common-messages';

import { wait } from '../../utils/wait';

const styles = singleCommunityStyles();

const CookieConsentPopup: React.FC = () => {
  const [enableAnimation, setEnableAnimation] = useState<boolean>(false);
  const [isCookieConsent, setIsCookieConsent] = useState<boolean>(
    !!localStorage.getItem('cookie-consent'),
  );

  const acceptCookiePolicy = () => {
    localStorage.setItem('cookie-consent', 'true');
    setEnableAnimation(true);

    wait(2000).then(() => setIsCookieConsent(true));
  };

  return (
    <>
      {!isCookieConsent && (
        <div
          css={css`
            background: aliceblue;
            position: fixed;
            bottom: 0;
            width: 100%;
            z-index: 9999;

            animation: ${enableAnimation ? 'animation 1s forwards' : 'none'};

            @keyframes animation {
              0% {
                transform: translateY(0);
              }
              100% {
                transform: translateY(100%);
                display: none;
              }
            }
          `}
        >
          <div className="container">
            <div
              css={css`
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 24px 0;
              `}
            >
              <p
                css={css`
                  padding-right: 20px;
                `}
              >
                <FormattedMessage id={commonMessages.cookieConsent.id} />
                <Link to="/privacy-policy">
                  <FormattedMessage id={commonMessages.moreInfo.id} />
                </Link>
              </p>
              <LargeOutlinedButton
                onClick={acceptCookiePolicy}
                customStyles={styles.headerLoginButtonStyles}
              >
                <FormattedMessage id={commonMessages.confirm.id} />
              </LargeOutlinedButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsentPopup;
