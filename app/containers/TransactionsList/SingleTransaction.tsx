import React from 'react';
import { useTranslation } from 'react-i18next';
import { styles } from './TransactionList.styled';

export type Transaction = {
  transactionHash: string;
  action: string;
  result: {
    status: number;
  };
};

type TransactionProps = {
  transaction: Transaction;
  status: string;
  StatusIcon: any;
};

export const SingleTransaction: React.FC<TransactionProps> = ({
  transaction,
  status,
  StatusIcon,
}): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div css={styles.container}>
      <StatusIcon />
      <div css={styles.singleTransactionBlock}>
        <p>{t(`common.transactionsList.${transaction.action}`)}</p>
        <p>{t(status)}</p>
      </div>
    </div>
  );
};

export default React.memo(SingleTransaction);
