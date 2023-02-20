import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import TransactionHandler from 'containers/ViewProfilePage/TransactionHandler';
import H4 from 'components/H4';
import OutlinedButton from 'components/Button/Outlined/InfoLargeHeightStretching';
import ContainedButton from 'components/Button/Contained/InfoLargeHeightStretching';

type PopupForNotBalanceProps = {
  hideModal: () => void;
};

const PopupForNotBalance: React.FC<PopupForNotBalanceProps> = ({
  hideModal,
}): JSX.Element => {
  const [show, setShow] = useState<Boolean>(true);
  const { t } = useTranslation();
  return (
    <>
      {show ? (
        <div>
          <H4 className="text-center pb-3">
            {t('common.metaTransaction.agreeWithMetaTransactions')}
          </H4>

          <div className="pb-4" style={{ textAlign: 'center' }}>
            {t('common.metaTransaction.wouldYouLike')}
          </div>

          <div className="d-flex align-items-center pb-3">
            <OutlinedButton className="mr-3" onClick={hideModal}>
              {t('common.metaTransaction.cansel')}
            </OutlinedButton>

            <ContainedButton onClick={() => setShow(!show)}>
              {t('common.metaTransaction.confirm')}
            </ContainedButton>
          </div>
        </div>
      ) : (
        <TransactionHandler />
      )}
    </>
  );
};

export default PopupForNotBalance;
