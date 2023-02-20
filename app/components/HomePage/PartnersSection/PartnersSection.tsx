import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { scrollTrigger } from 'utils/animation';
import techstars from 'images/logo-techstars.svg?inline';
import protocolLabs from 'images/logo-protocol-labs.svg?inline';
import sui from 'images/logo-sui.svg?inline';
import polygon from 'images/logo-polygon.svg?inline';
import filecoin from 'images/logo-f.svg?inline';
import polygonStudios from 'images/logo-poly.svg?inline';
import functionland from 'images/logo-functionland.svg?inline';
import koii from 'images/logo-koii.svg?inline';
import mystenLabs from 'images/logo-mysten-labs.svg?inline';

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

const PartnersSection: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  const [startTitleAnimation, setStartTitleAnimation] =
    useState<boolean>(false);
  const [startSliderAnimation, setStartSliderAnimation] =
    useState<boolean>(false);

  useEffect(() => {
    scrollTrigger('.partners-title', () => setStartTitleAnimation(true));
    scrollTrigger('.partners-animation', () => setStartSliderAnimation(true));
  }, []);

  return (
    <section css={styles.background}>
      <div className="df fdc aic">
        <span
          className="mb32 bold fz28 partners-title"
          css={{
            ...styles.title,
            ...(startTitleAnimation && styles.titleAnimation),
          }}
        >
          {t('homePage.partners')}
        </span>
        <div
          className="full-width ovh partners-animation"
          css={{
            ...styles.slider,
            ...(startSliderAnimation && styles.sliderAnimation),
          }}
        >
          <div
            className="dib no-wrap"
            css={startSliderAnimation && styles.slideTrackAnimation}
          >
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
};

export default PartnersSection;
