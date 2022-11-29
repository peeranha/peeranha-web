import React from 'react';
import { css } from '@emotion/react';
import { styles } from './Footer.styled';
import A, { ADefault } from 'components/A';
import { FormattedMessage } from 'react-intl';
import messages from 'common-messages';

import {
  INFO_LINKS,
  LINK_PRIVACY_POLICY,
  LINK_TERMS_OF_SERVICE,
} from './constants';

type FooterLinkType = {
  path: string;
  message: { id: string };
  cssStyles: string;
};

const Link: React.FC<FooterLinkType> = ({
  path,
  message,
  cssStyles,
}): JSX.Element =>
  document.location.origin === process.env.APP_LOCATION ? (
    <A to={path} css={cssStyles}>
      <FormattedMessage id={message.id} />
    </A>
  ) : (
    <ADefault href={`${process.env.APP_LOCATION}${path}`} css={cssStyles}>
      <FormattedMessage id={message.id} />
    </ADefault>
  );

const Footer: React.FC = (): JSX.Element => {
  return (
    <>
      <div css={css(styles.footer)}>
        <div css={css(styles.border)} />
        <div className="df aic jcc " css={css(styles.infoBlock)}>
          <div className="df fz16" css={css(styles.content)}>
            {INFO_LINKS.map((element) => (
              <Link
                path={element.route}
                key={element.route}
                message={element.title}
                cssStyles={css(styles.infoLinks)}
              />
            ))}{' '}
          </div>
        </div>
        <div className="df aic jcc fdc">
          <div css={css(styles.infoData)}>
            <FormattedMessage
              id={messages.copyrightPeeranha.id}
              values={{ year: new Date().getFullYear() }}
            />
          </div>
          <div css={css(styles.infoRules)}>
            <FormattedMessage
              id={messages.reCaptchaMention.id}
              values={{
                privacyPolicy: (
                  <a
                    css={css(styles.infoRulesLink)}
                    href={LINK_PRIVACY_POLICY}
                    target="_blank"
                  >
                    <FormattedMessage id={messages.privacyPolicy.id} />
                  </a>
                ),
                termsOfService: (
                  <a
                    css={css(styles.infoRulesLink)}
                    href={LINK_TERMS_OF_SERVICE}
                    target="_blank"
                  >
                    <FormattedMessage id={messages.termsOfService.id} />
                  </a>
                ),
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
