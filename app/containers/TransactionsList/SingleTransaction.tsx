import React from 'react';
import { useTranslation } from 'react-i18next';

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
    <div className="df fdr aic">
      <StatusIcon />

      <div className="df fdc aifs ml12">
        <p className="fz14 mb8">{t(`common.transactionsList.${transaction.action}`)}</p>
        <p className="fz12">{t(status)}</p>
      </div>
    </div>
  );
};

export default React.memo(SingleTransaction);
