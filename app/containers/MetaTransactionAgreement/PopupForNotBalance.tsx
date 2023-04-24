import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import TransactionHandler from 'containers/ViewProfilePage/SettingsTab/TransactionHandler';
import OutlinedButton from 'components/Button/Outlined/InfoLargeHeightStretching';
import ContainedButton from 'components/Button/Contained/InfoLargeHeightStretching';
import Popup from 'common-components/Popup';

type PopupForNotBalanceProps = {
  hideModal: () => void;
  transaction: string;
  setTransaction: (transaction: string) => void;
  writeTransactionCookie: () => void;
};

const PopupForNotBalance: React.FC<PopupForNotBalanceProps> = ({
  hideModal,
  transaction,
  setTransaction,
  writeTransactionCookie,
}): JSX.Element => {
  const [show, setShow] = useState<Boolean>(true);
  const { t } = useTranslation();
  return (
    <>
      {show ? (
        <div>
          <div className="tc pb-3 bold">
            {t('common.metaTransaction.agreeWithMetaTransactions')}
          </div>

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
        <Popup
          size="small"
          onClose={hideModal}
          css={{ '> div': { maxWidth: '570px !important' } }}
          withoutClose={false}
        >
          <TransactionHandler
            transaction={transaction}
            setTransaction={setTransaction}
          />
          <div css={{ marginTop: '30px' }}>
            <span>{t('common.transactionsText_4')}</span>
            <span className="bold">{t('common.settings')}</span>.
          </div>
          <div
            className="df aic jcfe mt-4"
            css={{ button: { maxWidth: '150px' } }}
          >
            <OutlinedButton className="mr-3" onClick={hideModal}>
              {t('common.cancel')}
            </OutlinedButton>
            <ContainedButton
              disabled={!transaction}
              block={!transaction}
              onClick={writeTransactionCookie}
            >
              {t('common.continue')}
            </ContainedButton>
          </div>
        </Popup>
      )}
    </>
  );
};

export default PopupForNotBalance;
