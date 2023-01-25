import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import {
  MediumImageLabel,
  MediumImageLabelImage,
  LABEL_SIZE_LG,
} from 'components/Img/MediumImage';
import Popover from 'components/Popover';

import telegram from 'images/telegram-sm.svg?inline';

const TelegramUserLabel = ({ id, locale, size }) => {
  const { t } = useTranslation();

  return (
    <Popover
      id={id}
      styles={{
        position: 'absolute',
        bottom: 0,
        right: `${size === LABEL_SIZE_LG ? 0 : 7}px`,
      }}
      hiddenContent={t('common.telegram.userLabelPopover')}
    >
      <MediumImageLabel size={size}>
        <MediumImageLabelImage src={telegram} alt={t('common.telegram.user')} />
      </MediumImageLabel>
    </Popover>
  );
};

TelegramUserLabel.propTypes = {
  id: PropTypes.string,
  locale: PropTypes.string,
  size: PropTypes.string,
};

export default TelegramUserLabel;
