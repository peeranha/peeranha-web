import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { languages } from 'app/i18n';

import { setCookie, getCookie } from 'utils/cookie';

import { APP_LOCALE } from 'containers/LanguageProvider/constants';

import ChangeLocalePopup from './ChangeLocalePopup';
import ChangeLocaleButton from './ChangeLocaleButton';

import Dropdown from 'components/Dropdown';

import { Flag, Li } from './Styled';
import SelectedArrow from 'icons/SelectedArrow';
import useMediaQuery from 'hooks/useMediaQuery';
import {
  isSingleCommunityWebsite,
  singleCommunityColors,
} from 'utils/communityManagement';

const colors = singleCommunityColors();
const singleCommunityId = isSingleCommunityWebsite();

export const ChangeLocale = ({
  withTitle,
  changeLocale,
  locale,
  communities,
}) => {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const isDesktop = useMediaQuery('(min-width: 992px)');

  const getAvailableLanguages = () => {
    const communityTranslations = communities?.find(
      (community) => community.id === singleCommunityId,
    )?.translations;

    if (singleCommunityId) {
      return communityTranslations?.length
        ? {
            en: 'en',
            ...communityTranslations
              .map((translation) => translation.language)
              .reduce((acc, value) => ({ ...acc, [value]: value }), {}),
          }
        : languages;
    }
    return languages;
  };

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
              {Object.keys(getAvailableLanguages()).map((item) => (
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
