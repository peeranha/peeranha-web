import React from 'react';
import LargeButton from 'components/Button/Contained/InfoLarge';
import { OPEN_ADD_MODERATOR_FORM_BUTTON } from 'containers/Administration/constants';
import { IconSm } from 'components/Icon/IconWithSizes';
import { BG_LIGHT } from 'style-constants';
import { useTranslation } from 'react-i18next';
import addIcon from 'images/add.svg?external';
import { styles } from './Administration.styled';

const AddModeratorButton = ({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const { t } = useTranslation();

  return (
    <LargeButton
      id={OPEN_ADD_MODERATOR_FORM_BUTTON}
      onClick={onClick}
      css={styles.addModeratorButton}
    >
      <IconSm fill={BG_LIGHT} icon={addIcon} />
      <span className="dn d-lg-inline ml-2">{t('administration.addRole')}</span>
    </LargeButton>
  );
};

export default AddModeratorButton;
