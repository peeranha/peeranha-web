import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import useMediaQuery from 'hooks/useMediaQuery';
import { css } from '@emotion/react';
import { styles } from './Footer.styled';
import A, { ADefault } from 'components/A';

import {
  INFO_LINKS,
  LINK_PRIVACY_POLICY,
  LINK_TERMS_OF_SERVICE,
} from './constants';

type FooterLinkType = {
  path: string;
  message: string;
  cssStyles: string;
};

const Link: React.FC<FooterLinkType> = ({
  path,
  message,
  cssStyles,
}): JSX.Element =>
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
          <div css={css(styles.border)} />
          <div className="df aic jcc " css={css(styles.infoBlock)}>
            <div className="df fz16" css={css(styles.content)}>
              {INFO_LINKS.map((element) => (
                <Link
                  path={element.route}
                  key={element.route}
                  message={t(`${element.title}`)}
                  cssStyles={css(styles.infoLinks)}
                />
              ))}{' '}
            </div>
          </div>
          <div className="df aic jcc fdc">
            <div css={css(styles.infoData)}>
              {t('common.copyrightPeeranha', {
                year: new Date().getFullYear(),
              })}
            </div>
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
        </div>
      )}
    </>
  );
};

export default Footer;
