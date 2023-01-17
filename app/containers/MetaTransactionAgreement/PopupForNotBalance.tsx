import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from 'containers/MetaTransactionAgreement/messages';

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
  return (
    <>
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

        <ContainedButton onClick={agreeWithMeta}>
          <FormattedMessage id={messages.confirm.id} />
        </ContainedButton>
      </div>
    </>
  );
};

export default PopupForNotBalance;
