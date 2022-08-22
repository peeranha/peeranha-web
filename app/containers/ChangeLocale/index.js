import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TEXT_SECONDARY } from 'style-constants';

import { languages, currentLocale } from 'app/i18n';

import { setCookie } from 'utils/cookie';

import { APP_LOCALE } from 'containers/LanguageProvider/constants';

import Span from 'components/Span';
import Dropdown from 'components/Dropdown';

import { Flag, Li } from './Styled';

export const ChangeLocale = ({ withTitle }) => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(currentLocale);

  const setLocale = locale => {
    setCookie({
      name: APP_LOCALE,
      value: locale,
      options: { neverExpires: true, defaultPath: true, allowSubdomains: true },
    });

    setLanguage(locale);
    i18n.changeLanguage(locale);
  };

  return (
    <Dropdown
      className="mr-3"
      button={
        <React.Fragment>
          <Span
            className="d-flex align-items-center mr-1"
            fontSize="16"
            lineHeight="20"
            color={TEXT_SECONDARY}
          >
            <Flag src={require(`images/${language}_lang.png`)} alt="country" />
            {withTitle && t(`common.${language}`)}
          </Span>
        </React.Fragment>
      }
      menu={
        <ul>
          {Object.keys(languages).map(item => (
            <Li
              key={item}
              role="presentation"
              onClick={() => setLocale(item)}
              isBold={item === currentLocale}
            >
              <Flag src={require(`images/${item}_lang.png`)} alt="language" />
              {t(`common.${item}`)}
            </Li>
          ))}
        </ul>
      }
      id="choose-language-dropdown"
      isArrowed
      isMenuLabelMobile
      isArrowMarginMobile
    />
  );
};

export default ChangeLocale;
