import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { languages } from 'app/i18n';

import SelectedArrow from 'icons/SelectedArrow';
import useMediaQuery from 'hooks/useMediaQuery';
import { setCookie, getCookie } from 'utils/cookie';
import {
  graphCommunityColors,
  isSingleCommunityWebsite,
  singleCommunityColors,
} from 'utils/communityManagement';

import { APP_LOCALE } from 'containers/LanguageProvider/constants';
import Dropdown from 'components/Dropdown';

import ChangeLocalePopup from './ChangeLocalePopup';
import ChangeLocaleButton from './ChangeLocaleButton';

import { Flag, Li } from './Styled';

const colors = singleCommunityColors();
const singleCommunityId = isSingleCommunityWebsite();
const graphCommunity = graphCommunityColors();

export const ChangeLocale = ({ changeLocale, locale, communities }) => {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const isDesktop = useMediaQuery('(min-width: 992px)');

  const getAvailableLanguages = useMemo(() => {
    const communityTranslations = communities?.find(
      (community) => community.id === singleCommunityId,
    )?.communitytranslation;

    if (singleCommunityId) {
      const singleCommunityLanguages = {
        en: 'en',
        ...communityTranslations
          ?.map((translation) => translation.language)
          ?.reduce((acc, value) => ({ ...acc, [value]: value }), {}),
      };
      return Object.keys(singleCommunityLanguages);
    }
    return Object.keys(languages);
  }, [communities]);

  useEffect(() => {
    const lang = getCookie(APP_LOCALE);

    if (lang && lang !== 'en') {
      changeLocale(lang);
      i18n.changeLanguage(lang);
    }
  }, []);

  const setLocale = (newLocale) => {
    setCookie({
      name: APP_LOCALE,
      value: newLocale,
      options: { neverExpires: true, defaultPath: true, allowSubdomains: true },
    });

    changeLocale(newLocale);
    i18n.changeLanguage(newLocale);
  };

  return (
    <>
      {isDesktop ? (
        <Dropdown
          className="mr-3"
          button={<ChangeLocaleButton locale={locale} />}
          menu={
            <ul>
              {getAvailableLanguages.map((language) => (
                <Li
                  key={language}
                  role="presentation"
                  onClick={() => setLocale(language)}
                  isBold={language === locale}
                >
                  <Flag
                    src={`https://images.peeranha.io/languages/${language}_language.svg`}
                    alt="language"
                    css={{
                      width: '18px',
                      height: '18px',
                    }}
                  />
                  {t(`common.${language}`)}
                  {language === locale && (
                    <SelectedArrow
                      className="ml-3"
                      css={{ path: { fill: 'none' } }}
                      stroke={
                        graphCommunity
                          ? 'rgba(111, 76, 255, 1)'
                          : colors.linkColor || 'var(--color-blue)'
                      }
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
        <div className="full-width df aic jcsb cup" onClick={() => setOpen(true)}>
          <ChangeLocalePopup
            setLocale={setLocale}
            locale={locale}
            open={open}
            setOpen={setOpen}
            getAvailableLanguages={getAvailableLanguages}
          />
        </div>
      )}
    </>
  );
};

export default ChangeLocale;
