import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import TransactionHandler from 'containers/ViewProfilePage/TransactionHandler';
import H4 from 'components/H4';
import OutlinedButton from 'components/Button/Outlined/InfoLargeHeightStretching';
import ContainedButton from 'components/Button/Contained/InfoLargeHeightStretching';
import Popup from 'common-components/Popup';

type PopupForNotBalanceProps = {
  hideModal: () => void;
  transaction: string;
  setTransaction: (transaction: string) => void;
};

const PopupForNotBalance: React.FC<PopupForNotBalanceProps> = ({
  hideModal,
  transaction,
  setTransaction,
}): JSX.Element => {
  const [show, setShow] = useState<Boolean>(true);
  const { t } = useTranslation();
  return (
    <>
      {show ? (
        <div>
          <H4 className="tc pb-3">
            {t('common.metaTransaction.agreeWithMetaTransactions')}
          </H4>

          <div className="pb-4" style={{ textAlign: 'center' }}>
            {t('common.metaTransaction.wouldYouLike')}
          </div>

          <div className="df aic pb-3">
            <OutlinedButton className="mr-3" onClick={hideModal}>
              {t('common.metaTransaction.cansel')}
            </OutlinedButton>

            <ContainedButton onClick={() => setShow(!show)}>
              {t('common.metaTransaction.confirm')}
            </ContainedButton>
          </div>
        </div>
      ) : (
        <Popup size="small" onClose={hideModal} withoutClose={false}>
          <TransactionHandler
            transaction={transaction}
            setTransaction={setTransaction}
            hideModal={hideModal}
          />
          {t('common.transactionsText_4')}
        </Popup>
      )}
    </>
  );
};

export default PopupForNotBalance;
