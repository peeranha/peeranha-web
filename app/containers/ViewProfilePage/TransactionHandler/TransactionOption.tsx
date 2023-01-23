import React from 'react';

import { FormattedMessage } from 'react-intl';

import { styled } from './TransactionHandler.styled';

type TransactionOptionProps = {
  transaction: string;
  transactionOption: string;
  transactionHandler: () => void;
  transactionTitle: string;
  transactionSubtitle: string;
  Recommended?: boolean;
};

const TransactionOption: React.FC<TransactionOptionProps> = ({
  transaction,
  transactionOption,
  transactionHandler,
  transactionTitle,
  transactionSubtitle,
  Recommended,
}): JSX.Element => {
  return (
    <div className="mb-3">
      <label>
        <input
          className="mr-2 dn"
          type="radio"
          checked={transaction === transactionOption}
          onChange={transactionHandler}
          css={styled.input}
        />
        <div className="df aic" css={styled.inputRadio}>
          <div>
            <div
              className="mb-1 bold pr"
              css={Recommended && styled.recommended}
            >
              <FormattedMessage id={transactionTitle} />
            </div>
            <div css={styled.secondaryColor}>
              <FormattedMessage id={transactionSubtitle} />
            </div>
          </div>
        </div>
      </label>
    </div>
  );
};

export default TransactionOption;
