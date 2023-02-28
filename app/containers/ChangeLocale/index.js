import React from 'react';
import { useTranslation } from 'react-i18next';

import history from 'createdHistory';
import { TEXT_SECONDARY } from 'style-constants';

import { languages } from 'app/i18n';

import { setCookie } from 'utils/cookie';

import { APP_LOCALE } from 'containers/LanguageProvider/constants';

import Span from 'components/Span';
import Dropdown from 'components/Dropdown';

import { Flag, Li } from './Styled';

export const ChangeLocale = ({ withTitle, changeLocale, locale }) => {
  const { t, i18n } = useTranslation();

  const setLocale = (newLocale) => {
    setCookie({
      name: APP_LOCALE,
      value: newLocale,
      options: { neverExpires: true, defaultPath: true, allowSubdomains: true },
    });

    i18n.changeLanguage(newLocale, () => {
      const lang = history.location.pathname.slice(0, 3);

      if (newLocale === 'en') {
        history.push(history.location.pathname.slice(3));
        return;
      }

      if (
        Object.keys(languages)
          .slice(1)
          .map((item) => `/${item}`)
          .includes(lang)
      ) {
        history.push(`/${newLocale}${history.location.pathname.slice(3)}`);
      } else {
        history.push(`/${newLocale}${history.location.pathname}`);
      }
    });
    changeLocale(newLocale);
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
            <Flag src={require(`images/${locale}_lang.png`)} alt="country" />
            {withTitle && t(`common.${locale}`)}
          </Span>
        </React.Fragment>
      }
      menu={
        <ul>
          {Object.keys(languages).map((item) => (
            <Li
              key={item}
              role="presentation"
              onClick={() => setLocale(item)}
              isBold={item === locale}
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
