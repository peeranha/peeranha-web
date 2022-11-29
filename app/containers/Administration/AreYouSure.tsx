// @ts-ignore
import { FormattedMessage } from 'react-intl';
import React, { useState } from 'react';
import { css } from '@emotion/react';

import { TEXT_DARK } from 'style-constants';
import commonMessages from 'common-messages';

import ContainedButton from 'components/Button/Contained/InfoLargeHeightStretching';
import OutlinedButton from 'components/Button/Outlined/InfoLargeHeightStretching';
import ModalDialog, { el, modalRoot } from 'components/ModalDialog';

import messages from 'containers/Administration/messages';

type AreYouSureProps = {
  Button: React.FC<{
    onClick: (ev: { currentTarget: React.SetStateAction<null> }) => void;
  }>;
  submitAction: ({
    currentTarget,
  }: {
    currentTarget: null | HTMLInputElement;
  }) => void;
};

const AreYouSure: React.FC<AreYouSureProps> = ({
  submitAction,
  Button,
}): JSX.Element => {
  const [currentTarget, changeEventData] = useState(null);
  const [isOpened, open] = useState(false);

  const closeModal = () => {
    document.getElementsByTagName('body')[0].style.position = 'relative';
    // @ts-ignore
    modalRoot.removeChild(el);
    open(false);
  };

  return (
    <>
      <Button
        onClick={(ev: { currentTarget: React.SetStateAction<null> }) => {
          open(true);
          changeEventData(ev.currentTarget);
        }}
      />

      {isOpened && (
        <ModalDialog closeModal={closeModal} show={isOpened}>
          <h5
            css={css`
              color: ${TEXT_DARK};
              font-weight: 600;
              font-size: 22px;
              line-height: 28px;
            `}
            className="tc pb12"
          >
            <FormattedMessage id={messages.wantToRevoke.id} />
          </h5>

          <div className="df aic">
            <OutlinedButton className="mr12" onClick={closeModal}>
              <FormattedMessage id={commonMessages.no.id} />
            </OutlinedButton>

            <ContainedButton
              onClick={() => {
                closeModal();
                submitAction({ currentTarget });
              }}
            >
              <FormattedMessage id={commonMessages.yes.id} />
            </ContainedButton>
          </div>
        </ModalDialog>
      )}
    </>
  );
};

export default AreYouSure;
