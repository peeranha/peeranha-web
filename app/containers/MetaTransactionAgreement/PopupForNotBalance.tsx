import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { graphCommunityColors } from 'utils/communityManagement';

import TransactionHandler from 'containers/ViewProfilePage/TransactionHandler';
import OutlinedButton from 'components/Button/Outlined/InfoLargeHeightStretching';
import ContainedButton from 'components/Button/Contained/InfoLargeHeightStretching';
import Popup from 'common-components/Popup';

const graphCommunity = graphCommunityColors();

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
  const [show, setShow] = useState<boolean>(true);
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
          <TransactionHandler transaction={transaction} setTransaction={setTransaction} />
          <div css={{ marginTop: '30px' }}>
            <span css={graphCommunity && { color: '#E1E1E4' }}>
              {t('common.transactionsText_4')}
            </span>
            <span css={graphCommunity && { color: '#E1E1E4' }} className="bold">
              {t('common.settings')}
            </span>
            .
          </div>
          <div className="df aic jcfe mt-4" css={{ button: { maxWidth: '150px' } }}>
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
