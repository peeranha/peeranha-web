import React from 'react';
import { css } from '@emotion/react';
import { FormattedMessage } from 'react-intl';
import commonMessages from '../../common-messages';
import warning from 'images/feedback.svg?inline';

const RulesBlock: React.FC<{}> = (): JSX.Element => (
  <div
    className="full-width full-height p20 df"
    css={css`
      background-color: #ffecd8;
      border-radius: 10px;
    `}
  >
    <div className="pl20">
      <img src={warning} alt={'warning'} />
    </div>
    <div className="pl20">
      <div className="df fdc jcsb lh1-5">
        <div className="pb20">
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
