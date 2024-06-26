import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';

import ContainedButton from 'components/Button/Contained/InfoLargeHeightStretching';
import OutlinedButton from 'components/Button/Outlined/InfoLargeHeightStretching';
import Popup from 'components/common/Popup';

import useTrigger from 'hooks/useTrigger';
import { styles } from './Administration.styled';

type AreYouSureProps = {
  Button: React.FC<{
    onClick: (ev: { currentTarget: React.SetStateAction<null> }) => void;
  }>;
  submitAction: ({ currentTarget }: { currentTarget: null | HTMLInputElement }) => void;
  roleName: string;
};

const AreYouSure: React.FC<AreYouSureProps> = ({ submitAction, Button, roleName }): JSX.Element => {
  const { t } = useTranslation();
  const [currentTarget, changeEventData] = useState(null);
  const [isOpen, open, close] = useTrigger(false);

  return (
    <>
      <Button
        onClick={(ev: { currentTarget: React.SetStateAction<null> }) => {
          open();
          changeEventData(ev.currentTarget);
        }}
      />

      {isOpen && (
        <Popup size="tiny" onClose={close}>
          <h5 className="tc pb12 fz22 semi-bold" css={styles.popupTitle}>
            {t('administration.wantToRevoke', {
              role: `${roleName}`,
            })}
          </h5>

          <div className="df aic">
            <OutlinedButton className="mr12" onClick={close}>
              {t('common.no')}
            </OutlinedButton>

            <ContainedButton
              onClick={() => {
                close();
                submitAction({ currentTarget });
              }}
            >
              {t('common.yes')}
            </ContainedButton>
          </div>
        </Popup>
      )}
    </>
  );
};

export default AreYouSure;
