import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import useMediaQuery from 'hooks/useMediaQuery';
import { css } from '@emotion/react';
import A, { ADefault } from 'components/A';
import { isSingleCommunityWebsite, singleCommunityStyles } from 'utils/communityManagement';
import { isSuiBlockchain } from 'utils/sui/sui';

import { DOCUMENTATION_ABOUT_LINK } from 'app/constants/documentation';
import peeranhaLogo from 'images/LogoBlack.svg?inline';
import peeranhaLogoWhite from 'images/Logo.svg?inline';
import HeartIcon from 'icons/Heart';
import { styles } from './Footer.styled';

import { INFO_LINKS, LINK_PRIVACY_POLICY, LINK_TERMS_OF_SERVICE } from './constants';

type FooterLinkType = {
  path: string;
  message: string;
  cssStyles: string;
};

const isSingleCommunityMode = isSingleCommunityWebsite();
const communityStyles = singleCommunityStyles();

const Link: React.FC<FooterLinkType> = ({ path, message, cssStyles }): JSX.Element =>
  document.location.origin === process.env.APP_LOCATION ? (
    <A to={path} css={cssStyles}>
      {message}
    </A>
  ) : (
    <ADefault href={`${process.env.APP_LOCATION}${path}`} css={cssStyles}>
      {message}
    </ADefault>
  );

const Footer: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery('(min-width: 992px)');
  return (
    <>
      {isDesktop && (
        <div css={css(styles.footer)}>
          <div css={{ ...styles.border, ...(isSuiBlockchain && styles.borderBlock) }} />
          <div className="df aic jcc " css={css(styles.infoBlock)}>
            <div className="df fz16" css={css(styles.content)}>
              {INFO_LINKS.map((element) => (
                <Link
                  path={element.route}
                  key={element.route}
                  message={t(`${element.title}`)}
                  cssStyles={css(styles.infoLinks)}
                />
              ))}
              {!isSingleCommunityMode && (
                <a css={styles.infoLinks} href={DOCUMENTATION_ABOUT_LINK} target="_blank">
                  {t('common.documentation')}
                </a>
              )}{' '}
            </div>
          </div>
          <div className={!isSuiBlockchain ? 'df aic jcc' : 'df aic jcsb'}>
            <div className={!isSuiBlockchain ? 'df aic jcc fdc' : 'df ais jcc fdc ml-4'}>
              {isSingleCommunityMode ? (
                <a css={styles.infoPoweredBy} href={process.env.APP_LOCATION}>
                  <Trans
                    i18nKey="common.poweredBy"
                    values={{ year: new Date().getFullYear() }}
                    components={[
                      <img
                        key="peeranha"
                        src={communityStyles.logoWhite ? peeranhaLogoWhite : peeranhaLogo}
                        alt="peeranha"
                      />,
                    ]}
                  />
                </a>
              ) : (
                <div css={css(styles.infoData)}>
                  {t('common.copyrightPeeranha', {
                    year: new Date().getFullYear(),
                  })}
                </div>
              )}
              <div css={css(styles.infoRules)}>
                <Trans
                  i18nKey="common.reCaptchaMention"
                  values={{
                    privacyPolicy: t('common.privacyPolicy'),
                    termsOfService: t('common.termsOfService'),
                  }}
                  components={[
                    <a
                      key="0"
                      css={css(styles.infoRulesLink)}
                      href={LINK_PRIVACY_POLICY}
                      target="_blank"
                    />,
                    <a
                      key="1"
                      css={css(styles.infoRulesLink)}
                      href={LINK_TERMS_OF_SERVICE}
                      target="_blank"
                    />,
                  ]}
                />
              </div>
            </div>
            {isSuiBlockchain && (
              <div className="df aic jcc">
                <div css={css(styles.infoRules)}>
                  <Trans
                    i18nKey="common.footerMadeBy"
                    components={[<HeartIcon key="0" fill={'#7699FF'} />]}
                  />
                </div>
                <a href={process.env.APP_LOCATION} target="_blank">
                  <img
                    css={styles.imgLogo}
                    key="peeranha"
                    src={communityStyles.logoWhite ? peeranhaLogoWhite : peeranhaLogo}
                    alt="peeranha"
                  />
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
