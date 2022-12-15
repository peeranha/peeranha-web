import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { scrollTrigger } from 'utils/animation';
import screen_1 from 'images/scr_1.jpg';
import screen_2 from 'images/scr_2.jpg';
import screen_3 from 'images/scr_3.jpg';
import screen_4 from 'images/scr_4.jpg';
import messages from '../messages';

import { styles } from './ActionsSection.styled';
import { pageStyles } from '../HomePage.styled';

const ActionsSection: React.FC = (): JSX.Element => {
  const [startFirstActionAnimation, setStartFirstActionAnimation] =
    useState<boolean>(false);
  const [startSecondActionAnimation, setStartSecondActionAnimation] =
    useState<boolean>(false);
  const [startThirdActionAnimation, setStartThirdActionAnimation] =
    useState<boolean>(false);
  const [startFourthActionAnimation, setStartFourthActionAnimation] =
    useState<boolean>(false);

  useEffect(() => {
    scrollTrigger('.first-action', () => setStartFirstActionAnimation(true));
    scrollTrigger('.second-action', () => setStartSecondActionAnimation(true));
    scrollTrigger('.third-action', () => setStartThirdActionAnimation(true));
    scrollTrigger('.fourth-action', () => setStartFourthActionAnimation(true));
  }, []);

  return (
    <section css={styles.backgroundImage}>
      <div css={pageStyles.container} id="about">
        <div className="df fdc aic" css={styles.wrapper}>
          <div
            className="first-action"
            css={{ ...styles.action, ...styles.reverse }}
          >
            <div css={styles.textBlock}>
              <h3
                css={{
                  ...styles.header,
                  ...(startFirstActionAnimation && styles.titleAnimation),
                }}
              >
                <FormattedMessage id={messages.focusBigPicture.id} />
              </h3>
              <span
                css={{
                  ...styles.text,
                  ...(startFirstActionAnimation && styles.textAnimation),
                }}
              >
                <FormattedMessage id={messages.newStandard.id} />
              </span>
            </div>
            <img
              src={screen_1}
              alt="experts posts"
              css={{
                ...styles.image,
                ...(startFirstActionAnimation && styles.imageAnimation),
              }}
            />
          </div>
          <div className="second-action" css={styles.action}>
            <div css={styles.textBlock}>
              <h3
                css={{
                  ...styles.header,
                  ...(startSecondActionAnimation && styles.titleAnimation),
                }}
              >
                <FormattedMessage id={messages.askAndAnswer.id} />
              </h3>
              <span
                css={{
                  ...styles.text,
                  ...(startSecondActionAnimation && styles.textAnimation),
                }}
              >
                <FormattedMessage id={messages.createDiscussBreeze.id} />
              </span>
            </div>
            <img
              src={screen_2}
              alt="new post creation"
              css={{
                ...styles.image,
                ...(startSecondActionAnimation && styles.evenImageAnimation),
              }}
            />
          </div>
          <div
            className="third-action"
            css={{ ...styles.action, ...styles.reverse }}
          >
            <div css={styles.textBlock}>
              <h3
                css={{
                  ...styles.header,
                  ...(startThirdActionAnimation && styles.titleAnimation),
                }}
              >
                <FormattedMessage id={messages.trackRoad.id} />
              </h3>
              <span
                css={{
                  ...styles.text,
                  ...(startThirdActionAnimation && styles.textAnimation),
                }}
              >
                <FormattedMessage id={messages.seeInformation.id} />
              </span>
            </div>
            <img
              src={screen_3}
              alt="profile"
              css={{
                ...styles.image,
                ...(startThirdActionAnimation && styles.imageAnimation),
              }}
            />
          </div>
          <div className="fourth-action" css={styles.action}>
            <div css={styles.textBlock}>
              <h3
                css={{
                  ...styles.header,
                  ...(startFourthActionAnimation && styles.titleAnimation),
                }}
              >
                <FormattedMessage id={messages.makeItYours.id} />
              </h3>
              <span
                css={{
                  ...styles.text,
                  ...(startFourthActionAnimation && styles.textAnimation),
                }}
              >
                <FormattedMessage id={messages.rewardedForContributions.id} />
              </span>
            </div>
            <img
              src={screen_4}
              alt="nfts"
              css={{
                ...styles.image,
                ...(startFourthActionAnimation && styles.evenImageAnimation),
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActionsSection;
