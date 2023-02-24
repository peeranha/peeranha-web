import React, { useEffect, useRef, useState } from 'react';
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
  const fishActionBlock = useRef(null);
  const topRightCoinActionBlock = useRef(null);
  const bottomRightCoinActionBlock = useRef(null);
  const topLeftCoinActionBlock = useRef(null);
  const bottomLeftCoinActionBlock = useRef(null);
  const buttonActionBlock = useRef(null);
  const contentActionBlock = useRef(null);
  const secondContentActionBlock = useRef(null);
  const headerActionBlock = useRef(null);

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
    scrollTrigger(fishActionBlock.current, () => setStartFishAnimation(true));
    scrollTrigger(topRightCoinActionBlock.current, () =>
      setStartTopRightCoinAnimation(true),
    );
    scrollTrigger(bottomRightCoinActionBlock.current, () =>
      setStartBottomRightCoinAnimation(true),
    );
    scrollTrigger(topLeftCoinActionBlock.current, () =>
      setStartTopLeftCoinAnimation(true),
    );
    scrollTrigger(bottomLeftCoinActionBlock.current, () =>
      setStartBottomLeftCoinAnimation(true),
    );
    scrollTrigger(buttonActionBlock.current, () =>
      setStartButtonAnimation(true),
    );
    scrollTrigger(contentActionBlock.current, () =>
      setStartContentAnimation(true),
    );
    scrollTrigger(secondContentActionBlock.current, () =>
      setStartSecondContentAnimation(true),
    );
    scrollTrigger(headerActionBlock.current, () =>
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
                ref={headerActionBlock}
                className="df jcc aic bold fz28 tc op0"
                css={{
                  ...styles.title,
                  ...(startHeaderAnimation && styles.headerAnimation),
                }}
              >
                {t('homePage.whiteGloveService')}
              </div>
            </div>
            <div css={styles.content}>
              <div ref={contentActionBlock} css={styles.contentBlock}>
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
              <div ref={secondContentActionBlock} css={styles.contentBlock}>
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
              ref={buttonActionBlock}
              className="df jcc aic fz20 op0"
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
            ref={fishActionBlock}
            className="pa t0 l0 full-width full-height op0"
            css={{
              ...styles.fishImage,
              ...(startFishAnimation && styles.fishAnimation),
            }}
          ></div>
        </div>
        <div
          ref={bottomRightCoinActionBlock}
          className="pa t0 l0 full-width full-height op0"
          css={{
            ...styles.rightBottomCoinImage,
            ...(startBottomRightCoinAnimation &&
              styles.rightBottomCoinAnimation),
          }}
        ></div>
        <div
          ref={topLeftCoinActionBlock}
          className="pa t0 l0 full-width full-height op0"
          css={{
            ...styles.leftTopCoinImage,
            ...(startTopLeftCoinAnimation && styles.leftTopCoinAnimation),
          }}
        ></div>
        <div
          ref={bottomLeftCoinActionBlock}
          className="pa t0 l0 full-width full-height op0"
          css={{
            ...styles.leftBottomCoinImage,
            ...(startBottomLeftCoinAnimation && styles.leftBottomCoinAnimation),
          }}
        ></div>
        <div
          ref={topRightCoinActionBlock}
          className="pa t0 l0 full-width full-height op0"
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
