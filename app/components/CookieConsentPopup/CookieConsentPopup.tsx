import React, { useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import useEventListener from 'hooks/useEventListener';
import LargeOutlinedButton from '../Button/Outlined/InfoLarge';
import { singleCommunityStyles } from '../../utils/communityManagement';

import commonMessages from '../../common-messages';
import { styles } from './CookieConsentPopup.styled';

const cookie = require('../../images/cookie.svg?inline');

const stylesCommunity = singleCommunityStyles();

const CookieConsentPopup: React.FC = (): JSX.Element => {
  const [enableAnimation, setEnableAnimation] = useState<boolean>(false);
  const [isCookieConsent, setIsCookieConsent] = useState<boolean>(() =>
    Boolean(localStorage.getItem('cookie-consent')),
  );
  const popup = useRef();
  useEventListener({
    target: popup,
    event: 'animationend',
    handler: () => setIsCookieConsent(true),
  });

  const acceptCookiePolicy = () => {
    localStorage.setItem('cookie-consent', 'true');
    setEnableAnimation(true);
  };

  return (
    <>
      {!isCookieConsent && (
        <div
          ref={popup}
          className="pf b0 full-width"
          css={css({
            ...styles.cookieConsent,
            ...(enableAnimation && styles.cookieConsentAnimation),
          })}
        >
          <div className="container">
            <div className="df aic jcsb pt24 pb24">
              <div className="df aic">
                <img
                  src={cookie}
                  alt={'cookie'}
                  className="mr20 dn"
                  css={css(styles.cookieImage)}
                />
                <p className="pr20 pl10" css={css(styles.text)}>
                  <FormattedMessage id={commonMessages.cookieConsent.id} />
                  <Link to="/privacy-policy">
                    <FormattedMessage id={commonMessages.moreInfo.id} />
                  </Link>
                </p>
              </div>
              <LargeOutlinedButton
                onClick={acceptCookiePolicy}
                customStyles={stylesCommunity.headerLoginButtonStyles}
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
