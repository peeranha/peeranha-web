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

const logos = [
  techstars,
  protocolLabs,
  sui,
  polygon,
  filecoin,
  polygonStudios,
  functionland,
  koii,
  mystenLabs,
];

const PartnersSection: React.FC = (): JSX.Element => (
  <section css={styles.background}>
    <div className="df fdc aic">
      <span className="mb32 bold fz28" css={styles.title}>
        <FormattedMessage id={messages.partners.id} />
      </span>
      <div className="full-width ovh" css={styles.slider}>
        <div className="dib no-wrap" css={styles.slideTrack}>
          {logos.map((logo, index) => (
            <div css={styles.slide} key={index}>
              <img src={logo} alt="partner logo" />
            </div>
          ))}
          {logos.map((logo, index) => (
            <div css={styles.slide} key={index}>
              <img src={logo} alt="partner logo" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default PartnersSection;
