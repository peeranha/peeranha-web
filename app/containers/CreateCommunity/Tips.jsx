import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Label from 'components/FormFields/Label';
import { Li, Ul } from 'components/TextEditor/Tips';

export const Tips = ({ faqQuestions }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Label className="mb-3">{t('common.tips')}</Label>

      <Ul>
        <li>
          <span>{t('createCommunity.imageWillBeTheFace')}</span>
        </li>
        <li>
          <span>{t('createCommunity.specifyMemorableTitle')}</span>
        </li>
        <li>
          <span>{t('createCommunity.communityDescriptionShouldBe')}</span>
        </li>
        <li>
          <span>{t('createCommunity.writeWhyDoWeeNeed')}</span>
        </li>
      </Ul>

      {faqQuestions && (
        <ul>
          {faqQuestions.map((x) => (
            <Li key={x.props.children}>{x}</Li>
          ))}
        </ul>
      )}
    </div>
  );
};

Tips.propTypes = {
  faqQuestions: PropTypes.array,
};

export default React.memo(Tips);
