import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { scrollTrigger } from 'utils/animation';
import techstars from 'images/techstars-logo.svg?inline';
import protocolLabs from 'images/logo-protocol-labs.svg?inline';
import sui from 'images/logo-sui.svg?inline';
import polygon from 'images/logo-polygon.svg?inline';
import filecoin from 'images/logo-filecoin.svg?inline';
import polygonStudios from 'images/logo-poly.svg?inline';
import functionland from 'images/logo-fnlnd.svg?inline';
import koii from 'images/logo-koii.svg?inline';
import mystenLabs from 'images/logo-mysten-labs.svg?inline';

import { styles } from './PartnersSection.styled';

const logos = [
  protocolLabs,
  sui,
  polygon,
  techstars,
  filecoin,
  polygonStudios,
  functionland,
  koii,
  mystenLabs,
];

const PartnersSection: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  const titleBlock = useRef(null);
  const sliderBlock = useRef(null);

  const [startTitleAnimation, setStartTitleAnimation] = useState<boolean>(false);
  const [startSliderAnimation, setStartSliderAnimation] = useState<boolean>(false);

  useEffect(() => {
    scrollTrigger(titleBlock.current, () => setStartTitleAnimation(true));
    scrollTrigger(sliderBlock.current, () => setStartSliderAnimation(true));
  }, []);

  return (
    <section css={styles.background}>
      <div className="df fdc aic">
        <span
          ref={titleBlock}
          className="mb32 bold fz28 op0"
          css={{
            ...styles.title,
            ...(startTitleAnimation && styles.titleAnimation),
          }}
        >
          {t('homePage.partners')}
        </span>
        <div
          ref={sliderBlock}
          className="full-width op0 ovh"
          css={{
            ...styles.slider,
            ...(startSliderAnimation && styles.sliderAnimation),
          }}
        >
          <div className="dib no-wrap" css={startSliderAnimation && styles.slideTrackAnimation}>
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
