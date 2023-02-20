import React from 'react';
import { useTranslation } from 'react-i18next';

import H4 from 'components/H4';
import OutlinedButton from 'components/Button/Outlined/InfoLargeHeightStretching';
import ContainedButton from 'components/Button/Contained/InfoLargeHeightStretching';

type PopupForNotBalanceProps = {
  agreeWithMeta: () => void;
  hideModal: () => void;
};

const PopupForNotBalance: React.FC<PopupForNotBalanceProps> = ({
  agreeWithMeta,
  hideModal,
}): JSX.Element => {
  const { t } = useTranslation();
  return (
    <>
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

        <ContainedButton onClick={agreeWithMeta}>
          {t('common.metaTransaction.confirm')}
        </ContainedButton>
      </div>
    </>
  );
};

export default PopupForNotBalance;
