/* eslint-disable no-nested-ternary */
import React from 'react';
import { ethers } from 'ethers';
import { useTranslation } from 'react-i18next';

import { isSuiBlockchain } from 'utils/constants';
import { graphCommunityColors } from 'utils/communityManagement';
import A from 'components/A';
import { SingleCommunity } from 'icons/index';

import { styles } from './TransactionList.styled';

const graphCommunity = graphCommunityColors();

export type Transaction = {
  transactionHash: string;
  action: string;
  result: {
    status: number;
  };
  network: number;
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
            <p className="df aic" css={graphCommunity && { color: 'rgba(225, 225, 228, 1)' }}>
              {t(`common.transactionsList.${transaction.action}`)}
              <SingleCommunity
                stroke={graphCommunity ? 'rgba(111, 76, 255, 1)' : '#576FED'}
                size={[14, 14]}
                className={'cup ml4'}
              />
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
