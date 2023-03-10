import React from 'react';
import { styled } from './TransactionHandler.styled';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
              css={
                Recommended && {
                  ...styled.recommended,
                  ':after': {
                    content: `"${t('common.metaTransaction.recommended')}"`,
                  },
                }
              }
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
