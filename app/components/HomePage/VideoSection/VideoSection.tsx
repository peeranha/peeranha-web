import React, { useEffect, useState } from 'react';

import { styles } from './VideoSection.styled';
import { scrollTrigger } from 'utils/animation';

const VideoSection: React.FC = (): JSX.Element => {
  const [startVideoAnimation, setStartVideoAnimation] =
    useState<boolean>(false);

  useEffect(() => {
    scrollTrigger('#video', () => setStartVideoAnimation(true));
  }, []);

  return (
    <section className="pr df jcc" css={styles.background} id="video">
      <div
        css={{
          ...styles.videoImage,
          ...(startVideoAnimation && styles.videoImageAnimation),
        }}
      >
        <iframe
          css={styles.videoIframe}
          src="https://www.youtube.com/embed/Bvt42RqWFKc"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div
        className="pa t0 l0 full-width full-height"
        css={{
          ...styles.videoLeft,
          ...(startVideoAnimation && styles.videoLeftAnimation),
        }}
      ></div>
      <div
        className="pa t0 l0 full-width full-height"
        css={{
          ...styles.videoBackgroundLeft,
          ...(startVideoAnimation && styles.videoBackgroundLeftAnimation),
        }}
      ></div>
      <div
        className="pa t0 l0 full-width full-height"
        css={{
          ...styles.videoBackgroundRight,
          ...(startVideoAnimation && styles.videoBackgroundRightAnimation),
        }}
      ></div>

      <div
        className="pa t0 l0 full-width full-height"
        css={{
          ...styles.videoRight,
          ...(startVideoAnimation && styles.videoRightAnimation),
        }}
      ></div>
    </section>
  );
};

export default VideoSection;
