import React from 'react';
import { css } from '@emotion/react';
import { FormattedMessage } from 'react-intl';
import commonMessages from '../../common-messages';
import warning from 'images/feedback.svg?inline';

const RulesBlock: React.FC<{}> = (): JSX.Element => (
  <div
    className="full-width full-height df"
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
      <div className="df fdc jcsb lh1-5">
        <div
          css={css`
            padding-bottom: 15px;
          `}
        >
          <FormattedMessage id={commonMessages.viewQuestionRulesBlock_1.id} />
        </div>
        <div>
          <FormattedMessage id={commonMessages.viewQuestionRulesBlock_2.id} />
        </div>
        <div>
          <FormattedMessage id={commonMessages.viewQuestionRulesBlock_3.id} />
        </div>
        <div>
          <FormattedMessage id={commonMessages.viewQuestionRulesBlock_4.id} />
        </div>
      </div>
    </div>
  </div>
);

export default RulesBlock;
