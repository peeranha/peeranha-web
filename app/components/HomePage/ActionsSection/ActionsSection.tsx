import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { scrollTrigger } from 'utils/animation';
import screen_1 from 'images/scr_1.png';
import screen_2 from 'images/scr_2.png';
import screen_3 from 'images/scr_3.png';
import screen_4 from 'images/scr_4.png';

import { styles } from './ActionsSection.styled';
import { pageStyles } from '../HomePage.styled';

const ActionsSection: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

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
                className="op0"
                css={{
                  ...styles.header,
                  ...(startFirstActionAnimation && styles.titleAnimation),
                }}
              >
                {t('homePage.focusBigPicture')}
              </h3>
              <span
                className="op0"
                css={{
                  ...styles.text,
                  ...(startFirstActionAnimation && styles.textAnimation),
                }}
              >
                {t('homePage.newStandard')}
              </span>
            </div>
            <img
              src={screen_1}
              alt="experts posts"
              className="op0"
              css={{
                ...styles.image,
                ...(startFirstActionAnimation && styles.imageAnimation),
              }}
            />
          </div>
          <div className="second-action" css={styles.action}>
            <div css={styles.textBlock}>
              <h3
                className="op0"
                css={{
                  ...styles.header,
                  ...(startSecondActionAnimation && styles.titleAnimation),
                }}
              >
                {t('homePage.askAndAnswer')}
              </h3>
              <span
                className="op0"
                css={{
                  ...styles.text,
                  ...(startSecondActionAnimation && styles.textAnimation),
                }}
              >
                {t('homePage.createDiscussBreeze')}
              </span>
            </div>
            <img
              src={screen_2}
              alt="new post creation"
              className="op0"
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
                className="op0"
                css={{
                  ...styles.header,
                  ...(startThirdActionAnimation && styles.titleAnimation),
                }}
              >
                {t('homePage.trackRoad')}
              </h3>
              <span
                className="op0"
                css={{
                  ...styles.text,
                  ...(startThirdActionAnimation && styles.textAnimation),
                }}
              >
                {t('homePage.seeInformation')}
              </span>
            </div>
            <img
              src={screen_3}
              alt="profile"
              className="op0"
              css={{
                ...styles.image,
                ...(startThirdActionAnimation && styles.imageAnimation),
              }}
            />
          </div>
          <div className="fourth-action" css={styles.action}>
            <div css={styles.textBlock}>
              <h3
                className="op0"
                css={{
                  ...styles.header,
                  ...(startFourthActionAnimation && styles.titleAnimation),
                }}
              >
                {t('homePage.makeItYours')}
              </h3>
              <span
                className="op0"
                css={{
                  ...styles.text,
                  ...(startFourthActionAnimation && styles.textAnimation),
                }}
              >
                {t('homePage.rewardedForContributions')}
              </span>
            </div>
            <img
              src={screen_4}
              alt="nfts"
              className="op0"
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
