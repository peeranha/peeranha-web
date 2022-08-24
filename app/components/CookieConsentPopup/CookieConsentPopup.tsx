import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import cn from 'classnames';
import useEventListener from 'hooks/useEventListener';
import LargeOutlinedButton from '../Button/Outlined/InfoLarge';
import { singleCommunityStyles } from '../../utils/communityManagement';

import { styles } from './CookieConsentPopup.styled';

const cookie = require('../../images/cookie.svg?inline');

const stylesCommunity = singleCommunityStyles();

const CookieConsentPopup: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
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
          className={cn('pf b0 full-width')}
          css={css({
            ...styles.cookieConsent,
            ...(enableAnimation && styles.cookieConsentAnimation),
          })}
        >
          <div className={cn('container')}>
            <div className={cn('df aic jcsb pt24 pb24')}>
              <div className={cn('df aic')}>
                <img
                  src={cookie}
                  alt={'cookie'}
                  className={cn('mr20 dn')}
                  css={css(styles.cookieImage)}
                />
                <p className={cn('pr20 pl10')} css={css(styles.text)}>
                  {t('common.cookieConsent')}
                  <Link to="/privacy-policy">{t('common.moreInfo')}</Link>
                </p>
              </div>
              <LargeOutlinedButton
                onClick={acceptCookiePolicy}
                customStyles={stylesCommunity.headerLoginButtonStyles}
                className="no-wrap"
              >
                {t('common.confirm')}
              </LargeOutlinedButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsentPopup;
