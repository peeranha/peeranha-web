import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import LargeOutlinedButton from '../Button/Outlined/InfoLarge';
import { singleCommunityStyles } from '../../utils/communityManagement';

import commonMessages from '../../common-messages';

import { wait } from '../../utils/wait';
import { css } from '@emotion/react';
import { styles } from './CookieConsentPopup.styled';

const cookie = require('../../images/cookie.svg?inline');

const stylesCommunity = singleCommunityStyles();

const CookieConsentPopup: React.FC = (): JSX.Element => {
  const [enableAnimation, setEnableAnimation] = useState<boolean>(false);
  const [isCookieConsent, setIsCookieConsent] = useState<boolean>(() =>
    Boolean(localStorage.getItem('cookie-consent')),
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
