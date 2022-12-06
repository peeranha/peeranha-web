import React from 'react';
import { styles } from './VideoSection.styled';

const VideoSection: React.FC = (): JSX.Element => (
  <section className="df jcc" css={styles.background}>
    <div css={styles.videoImage}>
      <iframe
        css={styles.videoIframe}
        src="https://www.youtube.com/embed/Bvt42RqWFKc"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  </section>
);

export default VideoSection;
