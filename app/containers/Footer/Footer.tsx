import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { isSingleCommunityWebsite, singleCommunityStyles } from 'utils/communityManagement';
import { APP_MAIN_NAME, TARGET_BLANK } from 'utils/constants';
import { isSuiBlockchain } from 'utils/sui/sui';
import { styles } from './Footer.styled';
import peeranhaLogo from 'images/LogoBlack.svg?inline';
import peeranhaLogoWhite from 'images/Logo.svg?inline';
import {
  INFO_LINKS,
  CONTACTS_LINKS,
  LINK_PRIVACY_POLICY,
  LINK_TERMS_OF_SERVICE,
  FOOTER_LINK_COLOR,
} from './constants';

const isSingleCommunityMode = isSingleCommunityWebsite();
const communityStyles = singleCommunityStyles();

const Footer: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div
      css={{
        ...styles.footer,
        ...((Boolean(isSingleCommunityMode) || isSuiBlockchain) && styles.footerCommunityMode),
      }}
    >
      <div>
        <div css={styles.logo}>
          {!isSingleCommunityMode && !isSuiBlockchain && (
            <img
              key={APP_MAIN_NAME}
              src={communityStyles.logoWhite ? peeranhaLogoWhite : peeranhaLogo}
              alt={APP_MAIN_NAME}
            />
          )}
        </div>

        <div>
          <div css={styles.infoBlock}>
            <div css={styles.content}>
              {INFO_LINKS.map((link) => {
                if (Boolean(isSingleCommunityMode)) {
                  [INFO_LINKS[1], INFO_LINKS[3]] = [INFO_LINKS[3], INFO_LINKS[1]];
                }

                return (
                  <a
                    key={link.title}
                    href={link.route}
                    target={TARGET_BLANK}
                    css={styles.infoLinks}
                  >
                    {t(`${link.title}`)}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div css={styles.border} />

      <div css={styles.contacts}>
        <div
          css={{
            ...styles.info,
            ...((Boolean(isSingleCommunityMode) || isSuiBlockchain) && styles.infoSingleComm),
          }}
        >
          {isSingleCommunityMode || isSuiBlockchain ? (
            <a css={styles.infoPoweredBy} href={process.env.APP_LOCATION}>
              <Trans
                i18nKey="common.poweredBy"
                values={{ year: new Date().getFullYear() }}
                components={[
                  <img
                    key={APP_MAIN_NAME}
                    src={communityStyles.logoWhite ? peeranhaLogoWhite : peeranhaLogo}
                    alt={APP_MAIN_NAME}
                  />,
                ]}
              />
            </a>
          ) : (
            <div css={styles.infoData}>
              {t('common.copyrightPeeranha', {
                year: new Date().getFullYear(),
              })}
            </div>
          )}
          <div css={styles.infoRules}>
            <Trans
              i18nKey="common.reCaptchaMention"
              values={{
                privacyPolicy: t('common.privacyPolicy'),
                termsOfService: t('common.termsOfService'),
              }}
              components={[
                <a
                  key={LINK_PRIVACY_POLICY}
                  css={styles.infoRulesLink}
                  href={LINK_PRIVACY_POLICY}
                  target={TARGET_BLANK}
                />,
                <a
                  key={LINK_TERMS_OF_SERVICE}
                  css={styles.infoRulesLink}
                  href={LINK_TERMS_OF_SERVICE}
                  target={TARGET_BLANK}
                />,
              ]}
            />
          </div>
        </div>
        {!isSingleCommunityMode && !isSuiBlockchain && (
          <div css={styles.contactsLogo}>
            {CONTACTS_LINKS.map((link) => (
              <a key={link.title} href={link.route} target={TARGET_BLANK}>
                <link.icon fill={FOOTER_LINK_COLOR} />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Footer;
