import React from 'react';
import PropTypes from 'prop-types';
import { translationMessages } from 'i18n';

import messages from 'telegram-messages';

import { MediumImageLabel, LABEL_SIZE_LG } from 'components/Img/MediumImage';
import Popover from 'components/Popover';

import TelegramIcon from 'icons/Telegram';

const TelegramUserLabel = ({ id, locale, size }) => (
  <Popover
    id={id}
    styles={{
      position: 'absolute',
      bottom: 0,
      right: `${size == LABEL_SIZE_LG ? 0 : 7}px`,
    }}
    hiddenContent={
      translationMessages[locale][messages.telegramUserLabelPopover.id]
    }
  >
    <MediumImageLabel size={size}>
      <TelegramIcon fill={'#0088cc'} size={[20, 20]} />
    </MediumImageLabel>
  </Popover>
);

TelegramUserLabel.propTypes = {
  id: PropTypes.string,
  locale: PropTypes.string,
  size: PropTypes.string,
};

export default TelegramUserLabel;
