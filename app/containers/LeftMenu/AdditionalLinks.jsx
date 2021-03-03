import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { singleCommunityStyles } from 'utils/communityManagement';

import telosIcon from 'images/telosIconLight.svg?inline';
import peeranhaLogo from 'images/LogoBlack.svg?inline';

import { TEXT_SECONDARY } from 'style-constants';
import * as routes from 'routes-config';
import messages from 'common-messages';

import A, { ADefault } from 'components/A';

import { CONTACTS_ID, FORM_ID } from 'containers/Support/constants';
import ChangeLocale from 'containers/ChangeLocale';

const styles = singleCommunityStyles();

const AdditionalLinks = styled.div`
  display: flex;
  flex-direction: column;

  > * {
    padding: 10px 15px;

    span,
    a:hover,
    a {
      color: ${TEXT_SECONDARY};
    }
  }

  a {
    padding: 7px 15px;
  }

  footer {
    margin: ${styles.withoutAdditionalLinks ? 0 : 30}px 0;
    font-size: 12px;

    a {
      padding-left: 0;
    }
  }

  @media only screen and (max-width: 576px) {
    padding: 30px 10px;
  }
`;

const Img = styled.img`
  width: ${({ alt }) => (alt === 'telos' ? 40 : 60)}px;
  height: 12px;
  filter: gray;
  filter: grayscale(100%);
`;

export default React.memo(() => {
  const Link =
    document.location.origin === process.env.APP_LOCATION
      ? ({ path, message }) => (
          <A to={path}>
            <FormattedMessage {...message} />
          </A>
        )
      : ({ path, message }) => (
          <ADefault href={`${process.env.APP_LOCATION}${path}`}>
            <FormattedMessage {...message} />
          </ADefault>
        );

  return (
    <AdditionalLinks>
      {!styles.withoutAdditionalLinks ? (
        <>
          <Link path={routes.home()} message={messages.about} />
          <Link
            path={routes.support(CONTACTS_ID)}
            message={messages.contacts}
          />
          <Link path={routes.support(FORM_ID)} message={messages.support} />
          <Link
            path={routes.privacyPolicy()}
            message={messages.privacyPolicy}
          />
          <Link
            path={routes.termsAndConditions()}
            message={messages.termsOfService}
          />
        </>
      ) : null}

      <ChangeLocale />

      <footer>
        {!styles.withoutCopyright && (
          <div>
            <FormattedMessage
              {...messages.copyrightPeeranha}
              values={{ year: new Date().getFullYear() }}
            />
          </div>
        )}
        <div className="mt-2">
          <FormattedMessage
            {...messages.poweredByTelos}
            values={{
              image: styles.poweredByPeeranha ? (
                <Img key="peeranha" src={peeranhaLogo} alt="peeranha" />
              ) : (
                <Img key="telos" src={telosIcon} alt="telos" />
              ),
            }}
          >
            {(...chunks) => (
              <a
                className={
                  styles.poweredByPeeranha ? 'd-flex align-content-center' : ''
                }
                href={
                  styles.poweredByPeeranha
                    ? process.env.APP_LOCATION
                    : 'https://www.telosfoundation.io/'
                }
                target="_blank"
              >
                {chunks}
              </a>
            )}
          </FormattedMessage>
        </div>
      </footer>
    </AdditionalLinks>
  );
});
