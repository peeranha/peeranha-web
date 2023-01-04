import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';
import { scrollToSection, scrollTrigger } from 'utils/animation';

import man from 'images/top-man.svg?inline';
import arrow from 'images/Arrow.svg?inline';

import messages from '../messages';

import { styles } from './GetStartedSection.styled';
import { pageStyles } from '../HomePage.styled';

const GetStartedSection: React.FC = (): JSX.Element => {
  const [startImageBlockAnimation, setStartImageBlockAnimation] =
    useState<boolean>(false);
  const [startTextBlockAnimation, setStartTextBlockAnimation] =
    useState<boolean>(false);

  useEffect(() => {
    scrollTrigger('.text-block', () => setStartTextBlockAnimation(true));
    scrollTrigger('.image-block', () => setStartImageBlockAnimation(true));
  }, []);

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
                  ...(startTextBlockAnimation && styles.titleAnimation),
                }}
              >
                <FormattedMessage id={messages.moreThan.id} />
              </h1>
              <span
                className="bold fz16 tc mb32 op0"
                css={{
                  ...styles.subHeading,
                  ...(startTextBlockAnimation && styles.subtitleAnimation),
                }}
              >
                <FormattedMessage id={messages.greatCommunity.id} />
              </span>
              <button
                className="df jcc aic fz20 op0"
                css={{
                  ...styles.button,
                  ...(startTextBlockAnimation && styles.buttonAnimation),
                }}
                onClick={() => createdHistory.push(routes.feed())}
              >
                <FormattedMessage id={messages.getStarted.id} />
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
              ...(startImageBlockAnimation && styles.instrumentsAnimation),
            }}
          ></div>
          <div
            className="pa op0"
            css={{
              ...styles.background,
              ...(startImageBlockAnimation && styles.backgroundAnimation),
            }}
          ></div>
          <div
            className="pa t0 l0 full-width full-height op0"
            css={{
              ...styles.man,
              ...(startImageBlockAnimation && styles.manAnimation),
            }}
          ></div>
          <div
            className="pa op0"
            css={{
              ...styles.circle,
              ...styles.firstCirclePosition,
              ...(startImageBlockAnimation && styles.pulseFirstCircleAnimation),
            }}
          ></div>
          <div
            className="pa op0"
            css={{
              ...styles.circle,
              ...styles.secondCirclePosition,
              ...(startImageBlockAnimation &&
                styles.pulseSecondCircleAnimation),
            }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default GetStartedSection;
