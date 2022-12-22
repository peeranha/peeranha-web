// @ts-ignore
import { FormattedMessage } from 'react-intl';
import React, { ReactNode } from 'react';

import { MediumIconStyled } from 'components/Icon/MediumIcon';
import Wrapper from 'components/Header/Simple';
import Icon from 'components/Icon';
import H3 from 'components/H3';

import AddModeratorForm from 'containers/Administration/AddModeratorForm';

import commonMessages from 'common-messages';

// @ts-ignore
import usersHeader from 'images/usersHeader.svg?external';
// @ts-ignore
import AddModeratorButton from 'containers/Administration/AddModeratorButton';
import messages from 'containers/TransactionsList/messages';

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
  return (
    <div className="df fdr aic">
      <StatusIcon />

      <div className="df fdc aifs ml12">
        <p className="fz14 mb8">
          <FormattedMessage id={messages[transaction.action].id} />
        </p>
        <p className="fz12">
          <FormattedMessage id={status} />
        </p>
      </div>
    </div>
  );
};

export default React.memo(SingleTransaction);
