import React from 'react';
import { css } from '@emotion/react';
import bg from '../../images/Frame2.png';
import { VIDEO_SCREEN } from './constants';

const VideoSection = () => (
  <div
    id={VIDEO_SCREEN}
    css={css`
    position:relative;
  @media (min-width: 992px) {
    height: 700px;   
    background: url(${bg});
  },
`}
  >
    <div>
      <iframe
        css={css`
          width: 100vw;
          height: 400px;
          @media (min-width: 992px) {
            position: absolute;
            top: 99px;
            left: 559px;
            width: 818px;
            height: 458px;
          }
        `}
        src="https://www.youtube.com/embed/Bvt42RqWFKc"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </div>
  </div>
);

export default VideoSection;
