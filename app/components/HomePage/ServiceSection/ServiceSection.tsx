import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';
import { scrollTrigger } from 'utils/animation';

import service from 'images/ico_service.svg?inline';
import language from 'images/ico_language.svg?inline';
import community from 'images/ico_community.svg?inline';
import faq from 'images/ico_faq.svg?inline';
import profile from 'images/ico_profile.svg?inline';
import discussions from 'images/ico_discussions.svg?inline';

import messages from '../messages';

import { styles } from './ServiceSection.styled';
import { pageStyles } from '../HomePage.styled';

const ServiceSection: React.FC = (): JSX.Element => {
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
                className="df jcc aic bold fz28 tc header-figure"
                css={{
                  ...styles.title,
                  ...(startHeaderAnimation && styles.headerAnimation),
                }}
              >
                <FormattedMessage id={messages.whiteGloveService.id} />
              </div>
            </div>
            <div css={styles.content}>
              <div className="service-content" css={styles.contentBlock}>
                <img
                  src={discussions}
                  alt="knowledge base icon"
                  css={{
                    ...styles.image,
                    ...(startContentAnimation && styles.iconAnimation),
                  }}
                />
                <div>
                  <h5
                    css={{
                      ...styles.header,
                      ...(startContentAnimation && styles.titleAnimation),
                    }}
                  >
                    <FormattedMessage id={messages.knowledgeBase.id} />
                  </h5>
                  <p css={styles.text}>
                    <FormattedMessage id={messages.whiteLabeledCommunity.id} />
                  </p>
                </div>
              </div>
              <div css={styles.contentBlock}>
                <img
                  src={profile}
                  alt="community support icon"
                  css={{
                    ...styles.image,
                    ...(startContentAnimation && styles.iconAnimation),
                  }}
                />
                <div>
                  <h5
                    css={{
                      ...styles.header,
                      ...(startContentAnimation && styles.titleAnimation),
                    }}
                  >
                    <FormattedMessage id={messages.communitySupport.id} />
                  </h5>
                  <p
                    css={{
                      ...styles.text,
                      ...(startContentAnimation && styles.textAnimation),
                    }}
                  >
                    <FormattedMessage id={messages.freeSupportSpecialist.id} />
                  </p>
                </div>
              </div>
              <div css={styles.contentBlock}>
                <img
                  src={faq}
                  alt="easy work icon"
                  css={{
                    ...styles.image,
                    ...(startContentAnimation && styles.iconAnimation),
                  }}
                />
                <div>
                  <h5
                    css={{
                      ...styles.header,
                      ...(startContentAnimation && styles.titleAnimation),
                    }}
                  >
                    <FormattedMessage id={messages.easyWork.id} />
                  </h5>
                  <p
                    css={{
                      ...styles.text,
                      ...(startContentAnimation && styles.textAnimation),
                    }}
                  >
                    <FormattedMessage
                      id={messages.scrapeCommunityChannels.id}
                    />
                  </p>
                </div>
              </div>
              <div className="second-service-content" css={styles.contentBlock}>
                <img
                  src={community}
                  alt="community icon"
                  css={{
                    ...styles.image,
                    ...(startSecondContentAnimation && styles.iconAnimation),
                  }}
                />
                <div>
                  <h5
                    css={{
                      ...styles.header,
                      ...(startSecondContentAnimation && styles.titleAnimation),
                    }}
                  >
                    <FormattedMessage id={messages.communityChannels.id} />
                  </h5>
                  <p
                    css={{
                      ...styles.text,
                      ...(startSecondContentAnimation && styles.textAnimation),
                    }}
                  >
                    <FormattedMessage id={messages.integrationBots.id} />
                  </p>
                </div>
              </div>
              <div css={styles.contentBlock}>
                <img
                  src={language}
                  alt="language icon"
                  css={{
                    ...styles.image,
                    ...(startSecondContentAnimation && styles.iconAnimation),
                  }}
                />
                <div>
                  <h5
                    css={{
                      ...styles.header,
                      ...(startSecondContentAnimation && styles.titleAnimation),
                    }}
                  >
                    <FormattedMessage id={messages.multiLanguage.id} />
                  </h5>
                  <p
                    css={{
                      ...styles.text,
                      ...(startSecondContentAnimation && styles.textAnimation),
                    }}
                  >
                    <FormattedMessage id={messages.supportContributors.id} />
                  </p>
                </div>
              </div>
              <div css={styles.contentBlock}>
                <img
                  src={service}
                  alt="knowledge base icon"
                  css={{
                    ...styles.image,
                    ...(startSecondContentAnimation && styles.iconAnimation),
                  }}
                />
                <div>
                  <h5
                    css={{
                      ...styles.header,
                      ...(startSecondContentAnimation && styles.titleAnimation),
                    }}
                  >
                    <FormattedMessage id={messages.lifelongService.id} />
                  </h5>
                  <p
                    css={{
                      ...styles.text,
                      ...(startSecondContentAnimation && styles.textAnimation),
                    }}
                  >
                    <FormattedMessage id={messages.trackActivity.id} />
                  </p>
                </div>
              </div>
            </div>
            <button
              className="df jcc aic fz20 start-button"
              css={{
                ...styles.button,
                ...(startButtonAnimation && styles.startButtonAnimation),
              }}
              onClick={() => createdHistory.push(routes.feed())}
            >
              <FormattedMessage id={messages.startNow.id} />
            </button>
          </div>
          <div
            className="pa t0 l0 full-width full-height fish"
            css={{
              ...styles.fishImage,
              ...(startFishAnimation && styles.fishAnimation),
            }}
          ></div>
        </div>
        <div
          className="pa t0 l0 full-width full-height bottom-right-coin"
          css={{
            ...styles.rightBottomCoinImage,
            ...(startBottomRightCoinAnimation &&
              styles.rightBottomCoinAnimation),
          }}
        ></div>
        <div
          className="pa t0 l0 full-width full-height top-left-coin"
          css={{
            ...styles.leftTopCoinImage,
            ...(startTopLeftCoinAnimation && styles.leftTopCoinAnimation),
          }}
        ></div>
        <div
          className="pa t0 l0 full-width full-height bottom-left-coin"
          css={{
            ...styles.leftBottomCoinImage,
            ...(startBottomLeftCoinAnimation && styles.leftBottomCoinAnimation),
          }}
        ></div>
        <div
          className="pa t0 l0 full-width full-height top-right-coin"
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
