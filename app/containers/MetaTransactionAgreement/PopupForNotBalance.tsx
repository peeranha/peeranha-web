import React, { useState } from 'react';

import { FormattedMessage } from 'react-intl';
import messages from 'containers/MetaTransactionAgreement/messages';

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

  return (
    <>
      {show && (
        <div>
          <H4 className="text-center pb-3">
            <FormattedMessage id={messages.agreeWithMetaTransactions.id} />
          </H4>

          <div className="pb-4" style={{ textAlign: 'center' }}>
            <FormattedMessage id={messages.wouldYouLike.id} />
          </div>

          <div className="d-flex align-items-center pb-3">
            <OutlinedButton className="mr-3" onClick={hideModal}>
              <FormattedMessage id={messages.cansel.id} />
            </OutlinedButton>

            <ContainedButton onClick={() => setShow(!show)}>
              <FormattedMessage id={messages.confirm.id} />
            </ContainedButton>
          </div>
        </div>
      )}
      {!show && <TransactionHandler />}
    </>
  );
};

export default PopupForNotBalance;
