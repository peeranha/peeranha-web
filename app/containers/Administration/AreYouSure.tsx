import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { css } from '@emotion/react';

import { TEXT_DARK } from 'style-constants';

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
  roleName: string;
};

const AreYouSure: React.FC<AreYouSureProps> = ({
  submitAction,
  Button,
  roleName,
}): JSX.Element => {
  const { t } = useTranslation();
  const [currentTarget, changeEventData] = useState(null);
  const [isOpened, open] = useState(false);

  const closeModal = () => {
    document.getElementsByTagName('body')[0].style.position = 'relative';
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
            {t('administration.wantToRevoke', {
              role: `${roleName}`,
            })}
          </h5>

          <div className="df aic">
            <OutlinedButton className="mr12" onClick={closeModal}>
              {t('common.no')}
            </OutlinedButton>

            <ContainedButton
              onClick={() => {
                closeModal();
                submitAction({ currentTarget });
              }}
            >
              {t('common.yes')}
            </ContainedButton>
          </div>
        </ModalDialog>
      )}
    </>
  );
};

export default AreYouSure;
