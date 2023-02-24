import React from 'react';
import createdHistory from 'createdHistory';
import { useTranslation } from 'react-i18next';
import * as routes from 'routes-config';
import { scrollToSection } from 'utils/animation';

import man from 'images/top-man.svg?inline';
import arrow from 'images/Arrow.svg?inline';

import { styles } from './GetStartedSection.styled';
import { pageStyles } from '../HomePage.styled';

const GetStartedSection: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <section>
      <div css={pageStyles.container}>
        <div className="df fdc aic" css={styles.wrapper}>
          <div className="df fdc aic" css={styles.sectionContent}>
            <div className="df fdc aic text-block" css={styles.sectionText}>
              <h1
                className="bold fz46 tc mb8 op0"
                css={{
                  ...styles.heading,
                  ...styles.titleAnimation,
                }}
              >
                {t('homePage.moreThan')}
              </h1>
              <span
                className="bold fz16 tc mb32 op0"
                css={{
                  ...styles.subHeading,
                  ...styles.subtitleAnimation,
                }}
              >
                {t('homePage.greatCommunity')}
              </span>
              <button
                className="df jcc aic fz20 op0"
                css={{
                  ...styles.button,
                  ...styles.buttonAnimation,
                }}
                onClick={() => createdHistory.push(routes.feed())}
              >
                {t('homePage.getStarted')}
              </button>
            </div>
            <img
              src={man}
              alt="intelligent man"
              className="op0 image-block"
              css={styles.manImage}
            />
          </div>
          <img
            src={arrow}
            className="cup"
            css={styles.arrowImage}
            onClick={() => scrollToSection(`#video`)}
            alt="navigation arrow"
          />
          <div
            className="pa op0"
            css={{
              ...styles.instruments,
              ...styles.instrumentsAnimation,
            }}
          ></div>
          <div
            className="pa op0"
            css={{
              ...styles.background,
              ...styles.backgroundAnimation,
            }}
          ></div>
          <div
            className="pa t0 l0 full-width full-height op0"
            css={{
              ...styles.man,
              ...styles.manAnimation,
            }}
          ></div>
          <div
            className="pa op0"
            css={{
              ...styles.circle,
              ...styles.firstCirclePosition,
              ...styles.pulseFirstCircleAnimation,
            }}
          ></div>
          <div
            className="pa op0"
            css={{
              ...styles.circle,
              ...styles.secondCirclePosition,
              ...styles.pulseSecondCircleAnimation,
            }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default GetStartedSection;
