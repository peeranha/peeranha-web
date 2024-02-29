import React from 'react';
import { useTranslation } from 'react-i18next';
import { styles } from './TransactionList.styled';
import { isSuiBlockchain } from 'utils/constants';
import A from 'components/A';
import { SingleCommunity } from 'icons/index';
import { ethers } from 'ethers';

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
  const explorerUrl = isSuiBlockchain
    ? process.env.SUI_TRANSACTION_INFO_URL
    : transaction?.network === 0
    ? process.env.POLYGON_TRANSACTION_INFO_URL
    : process.env.EDGEWARE_EXPLORERE_URL;

  return (
    <div css={styles.container}>
      <StatusIcon />
      <div css={styles.singleTransactionBlock}>
        {(
          isSuiBlockchain
            ? transaction?.transactionHash?.length === 44
            : ethers.utils.isHexString(transaction.transactionHash, 32)
        ) ? (
          <A
            target="_blank"
            to={{
              pathname: isSuiBlockchain
                ? explorerUrl.replace('{0}', transaction.transactionHash)
                : explorerUrl + transaction.transactionHash,
            }}
          >
            <p className="df aic" css={{ color: '#212529' }}>
              {t(`common.transactionsList.${transaction.action}`)}
              <SingleCommunity stroke={'#576FED'} size={[14, 14]} className={'cup ml4'} />
            </p>
          </A>
        ) : (
          <p>{t(`common.transactionsList.${transaction.action}`)}</p>
        )}
        <p>{t(status)}</p>
      </div>
    </div>
  );
};

export default React.memo(SingleTransaction);
