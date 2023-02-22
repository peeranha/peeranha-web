import React from 'react';
import { styled } from './TransactionHandler.styled';

type TransactionOptionProps = {
  transaction: string;
  transactionOption: string;
  transactionHandler: () => void;
  transactionTitle: string;
  transactionSubtitle: string;
  Recommended?: boolean;
  hideModal?: () => void;
};

const TransactionOption: React.FC<TransactionOptionProps> = ({
  transaction,
  transactionOption,
  transactionHandler,
  transactionTitle,
  transactionSubtitle,
  Recommended,
  hideModal,
}): JSX.Element => {
  return (
    <div className="mb-3">
      <label>
        <input
          className="mr-2 dn"
          type="radio"
          checked={transaction === transactionOption}
          onChange={transactionHandler}
          onClick={hideModal}
          css={styled.input}
        />
        <div className="df aic" css={styled.inputRadio}>
          <div>
            <div
              className="mb-1 bold pr"
              css={Recommended && styled.recommended}
            >
              {transactionTitle}
            </div>
            <div css={styled.secondaryColor}>{transactionSubtitle}</div>
          </div>
        </div>
      </label>
    </div>
  );
};

export default TransactionOption;
