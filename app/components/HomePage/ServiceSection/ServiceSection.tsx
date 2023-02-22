import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';
import { scrollTrigger } from 'utils/animation';

import service from 'images/ico_service.svg?inline';
import language from 'images/ico_language.svg?inline';
import community from 'images/ico_community.svg?inline';
import faq from 'images/ico_faq.svg?inline';
import profile from 'images/ico_profile.svg?inline';
import discussions from 'images/ico_discussions.svg?inline';

import { styles } from './ServiceSection.styled';
import { pageStyles } from '../HomePage.styled';

const ServiceSection: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  const [startFishAnimation, setStartFishAnimation] = useState<boolean>(false);
  const [startTopRightCoinAnimation, setStartTopRightCoinAnimation] =
    useState<boolean>(false);
  const [startBottomRightCoinAnimation, setStartBottomRightCoinAnimation] =
    useState<boolean>(false);
  const [startTopLeftCoinAnimation, setStartTopLeftCoinAnimation] =
    useState<boolean>(false);
  const [startBottomLeftCoinAnimation, setStartBottomLeftCoinAnimation] =
    useState<boolean>(false);
  const [startButtonAnimation, setStartButtonAnimation] =
    useState<boolean>(false);
  const [startContentAnimation, setStartContentAnimation] =
    useState<boolean>(false);
  const [startSecondContentAnimation, setStartSecondContentAnimation] =
    useState<boolean>(false);
  const [startHeaderAnimation, setStartHeaderAnimationAnimation] =
    useState<boolean>(false);

  useEffect(() => {
    scrollTrigger('.fish', () => setStartFishAnimation(true));
    scrollTrigger('.top-right-coin', () => setStartTopRightCoinAnimation(true));
    scrollTrigger('.bottom-right-coin', () =>
      setStartBottomRightCoinAnimation(true),
    );
    scrollTrigger('.top-left-coin', () => setStartTopLeftCoinAnimation(true));
    scrollTrigger('.bottom-left-coin', () =>
      setStartBottomLeftCoinAnimation(true),
    );
    scrollTrigger('.start-button', () => setStartButtonAnimation(true));
    scrollTrigger('.service-content', () => setStartContentAnimation(true));
    scrollTrigger('.second-service-content', () =>
      setStartSecondContentAnimation(true),
    );
    scrollTrigger('.header-figure', () =>
      setStartHeaderAnimationAnimation(true),
    );
  }, []);

  return (
    <section css={styles.container} id="service">
      <div className="pr" css={styles.backgroundImage}>
        <div
          className="pr"
          css={{
            ...pageStyles.container,
          }}
        >
          <div className="df fdc aic" css={styles.wrapper}>
            <div className="df jcc">
              <div
                className="df jcc aic bold fz28 tc op0 header-figure"
                css={{
                  ...styles.title,
                  ...(startHeaderAnimation && styles.headerAnimation),
                }}
              >
                {t('homePage.whiteGloveService')}
              </div>
            </div>
            <div css={styles.content}>
              <div className="service-content" css={styles.contentBlock}>
                <img
                  src={discussions}
                  alt="knowledge base icon"
                  className="op0"
                  css={{
                    ...styles.image,
                    ...(startContentAnimation && styles.iconAnimation),
                  }}
                />
                <div>
                  <h5
                    className="op0"
                    css={{
                      ...styles.header,
                      ...(startContentAnimation && styles.titleAnimation),
                    }}
                  >
                    {t('homePage.knowledgeBase')}
                  </h5>
                  <p css={styles.text}>{t('homePage.whiteLabeledCommunity')}</p>
                </div>
              </div>
              <div css={styles.contentBlock}>
                <img
                  src={profile}
                  alt="community support icon"
                  className="op0"
                  css={{
                    ...styles.image,
                    ...(startContentAnimation && styles.iconAnimation),
                  }}
                />
                <div>
                  <h5
                    className="op0"
                    css={{
                      ...styles.header,
                      ...(startContentAnimation && styles.titleAnimation),
                    }}
                  >
                    {t('homePage.communitySupport')}
                  </h5>
                  <p
                    className="op0"
                    css={{
                      ...styles.text,
                      ...(startContentAnimation && styles.textAnimation),
                    }}
                  >
                    {t('homePage.freeSupportSpecialist')}
                  </p>
                </div>
              </div>
              <div css={styles.contentBlock}>
                <img
                  src={faq}
                  alt="easy work icon"
                  className="op0"
                  css={{
                    ...styles.image,
                    ...(startContentAnimation && styles.iconAnimation),
                  }}
                />
                <div>
                  <h5
                    className="op0"
                    css={{
                      ...styles.header,
                      ...(startContentAnimation && styles.titleAnimation),
                    }}
                  >
                    {t('homePage.easyWork')}
                  </h5>
                  <p
                    className="op0"
                    css={{
                      ...styles.text,
                      ...(startContentAnimation && styles.textAnimation),
                    }}
                  >
                    {t('homePage.scrapeCommunityChannels')}
                  </p>
                </div>
              </div>
              <div className="second-service-content" css={styles.contentBlock}>
                <img
                  src={community}
                  alt="community icon"
                  className="op0"
                  css={{
                    ...styles.image,
                    ...(startSecondContentAnimation && styles.iconAnimation),
                  }}
                />
                <div>
                  <h5
                    className="op0"
                    css={{
                      ...styles.header,
                      ...(startSecondContentAnimation && styles.titleAnimation),
                    }}
                  >
                    {t('homePage.communityChannels')}
                  </h5>
                  <p
                    className="op0"
                    css={{
                      ...styles.text,
                      ...(startSecondContentAnimation && styles.textAnimation),
                    }}
                  >
                    {t('homePage.integrationBots')}
                  </p>
                </div>
              </div>
              <div css={styles.contentBlock}>
                <img
                  src={language}
                  alt="language icon"
                  className="op0"
                  css={{
                    ...styles.image,
                    ...(startSecondContentAnimation && styles.iconAnimation),
                  }}
                />
                <div>
                  <h5
                    className="op0"
                    css={{
                      ...styles.header,
                      ...(startSecondContentAnimation && styles.titleAnimation),
                    }}
                  >
                    {t('homePage.multiLanguage')}
                  </h5>
                  <p
                    className="op0"
                    css={{
                      ...styles.text,
                      ...(startSecondContentAnimation && styles.textAnimation),
                    }}
                  >
                    {t('homePage.supportContributors')}
                  </p>
                </div>
              </div>
              <div css={styles.contentBlock}>
                <img
                  src={service}
                  alt="knowledge base icon"
                  className="op0"
                  css={{
                    ...styles.image,
                    ...(startSecondContentAnimation && styles.iconAnimation),
                  }}
                />
                <div>
                  <h5
                    className="op0"
                    css={{
                      ...styles.header,
                      ...(startSecondContentAnimation && styles.titleAnimation),
                    }}
                  >
                    {t('homePage.lifelongService')}
                  </h5>
                  <p
                    className="op0"
                    css={{
                      ...styles.text,
                      ...(startSecondContentAnimation && styles.textAnimation),
                    }}
                  >
                    {t('homePage.trackActivity')}
                  </p>
                </div>
              </div>
            </div>
            <button
              className="df jcc aic fz20 op0 start-button"
              css={{
                ...styles.button,
                ...(startButtonAnimation && styles.startButtonAnimation),
              }}
              onClick={() => createdHistory.push(routes.feed())}
            >
              {t('homePage.startNow')}
            </button>
          </div>
          <div
            className="pa t0 l0 full-width full-height op0 fish"
            css={{
              ...styles.fishImage,
              ...(startFishAnimation && styles.fishAnimation),
            }}
          ></div>
        </div>
        <div
          className="pa t0 l0 full-width full-height op0 bottom-right-coin"
          css={{
            ...styles.rightBottomCoinImage,
            ...(startBottomRightCoinAnimation &&
              styles.rightBottomCoinAnimation),
          }}
        ></div>
        <div
          className="pa t0 l0 full-width full-height op0 top-left-coin"
          css={{
            ...styles.leftTopCoinImage,
            ...(startTopLeftCoinAnimation && styles.leftTopCoinAnimation),
          }}
        ></div>
        <div
          className="pa t0 l0 full-width full-height op0 bottom-left-coin"
          css={{
            ...styles.leftBottomCoinImage,
            ...(startBottomLeftCoinAnimation && styles.leftBottomCoinAnimation),
          }}
        ></div>
        <div
          className="pa t0 l0 full-width full-height op0 top-right-coin"
          css={{
            ...styles.rightTopCoinImage,
            ...(startTopRightCoinAnimation && styles.rightTopCoinAnimation),
          }}
        ></div>
      </div>
    </section>
  );
};

export default ServiceSection;
