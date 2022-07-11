import React from 'react';
import { css } from '@emotion/react';

const RulesBlock: React.FC<{}> = (): JSX.Element => (
  <div
    css={css`
      width: 100%;
      height: 100%;
      padding: 10px;
      border: solid 2px red;
      color: red;
    `}
  >
    <div
      css={css`
        display: flex;
        align-items: start;
        flex-direction: column;
        justify-content: space-around;
        line-height: 1.5;
      `}
    >
      <div
        css={css`
          padding-bottom: 15px;
        `}
      >
        Here are some tips to make your answer helpful and doesn't get deleted
        by a moderator:
      </div>
      <div
        css={css`
          padding-left: 30px;
        `}
      >
        1. Read the question carefully to understand the problem and provide the
        best reply you can.
      </div>
      <div
        css={css`
          padding-left: 30px;
        `}
      >
        2. Make sure your answer answers the question and isn't just a comment
        or gratitude.
      </div>
      <div
        css={css`
          padding-left: 30px;
        `}
      >
        3. Be polite and respectful to others.
      </div>
    </div>
  </div>
);

export default RulesBlock;
