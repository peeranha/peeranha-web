import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';

import Popup from 'components/common/Popup';

import useTrigger from 'hooks/useTrigger';
import { styles } from './Administration.styled';

type AddRoleWarningProps = {
  isEmptyUser: boolean;
  closeEmptyUserWarning: () => void;
};

const AddRoleWarning: React.FC<AddRoleWarningProps> = ({
  isEmptyUser,
  closeEmptyUserWarning,
}): JSX.Element => {
  const { t } = useTranslation();
  const [isOpen, open, close] = useTrigger(false);
  useEffect(() => {
    if (isEmptyUser) {
      open();
    }
  }, [isEmptyUser]);

  const closeWarning = () => {
    closeEmptyUserWarning();
    close();
  };

  return (
    <>
      {isOpen && (
        <Popup size="small" onClose={closeWarning}>
          <h5 css={styles.popupWarningTitle}>{t('administration.errorMessageEmptyUser')}</h5>
        </Popup>
      )}
    </>
  );
};

export default AddRoleWarning;
