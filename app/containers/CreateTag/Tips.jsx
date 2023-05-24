import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Label from 'components/FormFields/Label';
import { Ul } from 'components/TextEditor/Tips';

export const Tips = ({ faqQuestions }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Label className="mb-3">{t('common.tips')}</Label>
      <Ul>
        <li>{t('tags.tagIsKeyword')}</li>
        <li>{t('tags.usingTheRightTags')}</li>
      </Ul>
    </div>
  );
};

Tips.propTypes = {
  faqQuestions: PropTypes.array,
};

export default React.memo(Tips);
