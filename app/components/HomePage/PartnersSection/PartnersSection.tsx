import React from 'react';
import { FormattedMessage } from 'react-intl';
import techstars from 'images/logo-techstars.svg?inline';
import protocolLabs from 'images/logo-protocol-labs.svg?inline';
import sui from 'images/logo-sui.svg?inline';
import polygon from 'images/logo-polygon.svg?inline';
import filecoin from 'images/logo-f.svg?inline';
import polygonStudios from 'images/logo-poly.svg?inline';
import functionland from 'images/logo-functionland.svg?inline';
import koii from 'images/logo-koii.svg?inline';
import mystenLabs from 'images/logo-mysten-labs.svg?inline';

import messages from '../messages';

import { styles } from './PartnersSection.styled';

const PartnersSection: React.FC = (): JSX.Element => (
  <section css={styles.background}>
    <div className="df fdc aic">
      <span className="mb32 bold" css={styles.title}>
        <FormattedMessage id={messages.partners.id} />
      </span>
      <div className="df" css={styles.slider}>
        <div className="df">
          <div css={styles.slide}>
            <img src={techstars} alt="techstars logo" />
          </div>
          <div css={styles.slide}>
            <img src={protocolLabs} alt="protocolLabs logo" />
          </div>
          <div css={styles.slide}>
            <img src={sui} alt="sui logo" />
          </div>
          <div css={styles.slide}>
            <img src={polygon} alt="polygon logo" />
          </div>
          <div css={styles.slide}>
            <img src={filecoin} alt="filecoin logo" />
          </div>
          <div css={styles.slide}>
            <img src={polygonStudios} alt="polygonStudios logo" />
          </div>
          <div css={styles.slide}>
            <img src={functionland} alt="functionland logo" />
          </div>
          <div css={styles.slide}>
            <img src={koii} alt="koii logo" />
          </div>
          <div css={styles.slide}>
            <img src={mystenLabs} alt="mystenLabs logo" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PartnersSection;
