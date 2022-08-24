import React from 'react';
import { css } from '@emotion/react';
import { styles } from './VideoSection.styled';
import { VIDEO_SCREEN } from '../constants';

const VideoSection: React.FC = (): JSX.Element => {
  return (
    <div css={css(styles.background)}>
      <div id={VIDEO_SCREEN} css={css(styles.videoSection)}>
        <div className="df jcc" css={css(styles.videoBlock)}>
          <iframe
            css={css(styles.videoIframe)}
            src="https://www.youtube.com/embed/Bvt42RqWFKc"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
