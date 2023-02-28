import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import history from 'createdHistory';

import { languages } from 'app/i18n';

import { setCookie } from 'utils/cookie';

import { APP_LOCALE } from 'containers/LanguageProvider/constants';

import ChangeLocalePopup from './ChangeLocalePopup';
import ChangeLocaleButton from './ChangeLocaleButton';

import Dropdown from 'components/Dropdown';

import { Flag, Li } from './Styled';
import SelectedArrow from 'icons/SelectedArrow';
import useMediaQuery from 'hooks/useMediaQuery';
import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

export const ChangeLocale = ({ changeLocale, locale }) => {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const isDesktop = useMediaQuery('(min-width: 992px)');

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
    <>
      {isDesktop ? (
        <Dropdown
          className="mr-3"
          button={<ChangeLocaleButton locale={locale} />}
          menu={
            <ul>
              {Object.keys(languages).map((item) => (
                <Li
                  key={item}
                  role="presentation"
                  onClick={() => setLocale(item)}
                  isBold={item === locale}
                >
                  <Flag
                    src={`https://images.peeranha.io/languages/${item}_lang.svg`}
                    alt="language"
                    css={{
                      width: '18px',
                      height: '18px',
                    }}
                  />
                  {t(`common.${item}`)}
                  {item === locale && (
                    <SelectedArrow
                      className="ml-3"
                      css={{ path: { fill: 'none' } }}
                      stroke={colors.linkColor || 'var(--color-blue)'}
                    />
                  )}
                </Li>
              ))}
            </ul>
          }
          id="choose-language-dropdown"
          isArrowed
          isMenuLabelMobile
          isArrowMarginMobile
        />
      ) : (
        <div
          className="full-width df aic jcsb cup"
          onClick={() => setOpen(true)}
        >
          <ChangeLocalePopup
            setLocale={setLocale}
            locale={locale}
            open={open}
            setOpen={setOpen}
          />
        </div>
      )}
    </>
  );
};

export default ChangeLocale;
