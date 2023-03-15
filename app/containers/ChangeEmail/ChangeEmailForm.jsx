import React from 'react';
import H4 from 'components/H4';
import letterCompleteImg from 'images/EmailComplete.svg?inline';
import { useTranslation } from 'react-i18next';
import { TEXT_SECONDARY } from 'style-constants';

const ChangeEmailForm = () => {
  const { t } = useTranslation();

  return (
    <div>
      <H4 className="text-center">{t('profile.excellent')}</H4>
      <div className="text-center pb-3" css={{ color: TEXT_SECONDARY }}>
        {t('profile.excellentText')}
      </div>

      <div className="text-center">
        <img className="pb-3" src={letterCompleteImg} alt="check your email" />
      </div>
    </div>
  );
};

export default ChangeEmailForm;
