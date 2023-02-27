import React from 'react';
import { useTranslation } from 'react-i18next';
import { css } from '@emotion/react';

import { BORDER_PRIMARY } from 'style-constants';

import { LANGUAGES_MAP } from 'utils/constants';

import enLang from 'images/en_lang.png';
import esLang from 'images/es_lang.png';
import viLang from 'images/vi_lang.png';
import zhLang from 'images/zh_lang.png';

type imageByLanguageType = {
  [key: string]: any;
};

const imageByLanguage: imageByLanguageType = {
  0: enLang,
  1: zhLang,
  2: esLang,
  3: viLang,
};

type SeeOriginalProps = {
  locale: string;
  language: string;
  showOriginal: boolean;
  setShowOriginal: (showOriginal: boolean) => void;
  translation: object;
};

const containerStyles = {
  fontSize: '16px',
  display: 'flex',
  alignItems: 'center',
  color: BORDER_PRIMARY,
  cursor: 'pointer',
};

const flagImageStyles = {
  marginRight: '10px',
  borderRadius: '50%',
  width: '18px',
  height: '18px',
};

const SeeOriginal: React.FC<SeeOriginalProps> = ({
  locale,
  language,
  showOriginal,
  setShowOriginal,
  translation,
}): JSX.Element | null => {
  const { t } = useTranslation();
  const isOriginalLanguage =
    +language === LANGUAGES_MAP[locale as keyof typeof LANGUAGES_MAP];

  return (!isOriginalLanguage || showOriginal) && !!translation ? (
    <div
      onClick={() => {
        setShowOriginal(!showOriginal);
      }}
      css={css(containerStyles)}
    >
      <img
        src={
          showOriginal
            ? imageByLanguage[
                LANGUAGES_MAP[locale as keyof typeof LANGUAGES_MAP]
              ]
            : imageByLanguage[language]
        }
        alt="language"
        css={css(flagImageStyles)}
      />
      <span>
        {showOriginal ? t('common.seeTranslation') : t('common.seeOriginal')}
      </span>
    </div>
  ) : null;
};

export default SeeOriginal;
