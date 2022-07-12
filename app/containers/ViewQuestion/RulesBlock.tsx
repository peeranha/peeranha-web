import React from 'react';
import { css } from '@emotion/react';
import cn from 'classnames';
import warning from 'images/feedback.svg?inline';

const RulesBlock: React.FC<{}> = (): JSX.Element => (
  <div
    className={cn('full-width full-height df')}
    css={css`
      padding: 10px;
      background-color: #ffecd8;
      border-radius: 10px;
    `}
  >
    <div
      css={css`
        padding-left: 20px;
      `}
    >
      <img src={warning} alt={'warning'} />
    </div>
    <div
      css={css`
        padding-left: 20px;
      `}
    >
      <div className={cn('df fdc jcsb lh')}>
        <div
          css={css`
            padding-bottom: 15px;
          `}
        >
          Here are some tips to make your answer helpful and doesn't get deleted
          by a moderator:
        </div>
        <div>
          1. Read the question carefully to understand the problem and provide
          the best reply you can.
        </div>
        <div>
          2. Make sure your answer answers the question and isn't just a comment
          or gratitude.
        </div>
        <div>3. Be polite and respectful to others.</div>
      </div>
    </div>
  </div>
);

export default RulesBlock;
