import React from 'react';
import { useTranslation } from 'react-i18next';
import { css } from '@emotion/react';

import { BORDER_PRIMARY } from 'style-constants';

import { LANGUAGES_MAP } from 'utils/constants';
import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

type imageByLanguageType = {
  [key: string]: any;
};

const imageByLanguage: imageByLanguageType = {
  0: 'https://images.peeranha.io/languages/en_language.svg',
  1: 'https://images.peeranha.io/languages/de_language.svg',
  2: 'https://images.peeranha.io/languages/es_language.svg',
  3: 'https://images.peeranha.io/languages/fr_language.svg',
  4: 'https://images.peeranha.io/languages/ru_language.svg',
  5: 'https://images.peeranha.io/languages/uk_language.svg',
  6: 'https://images.peeranha.io/languages/vi_language.svg',
  7: 'https://images.peeranha.io/languages/zh_language.svg',
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
  color: colors.btnColor || BORDER_PRIMARY,
  cursor: 'pointer',
};

const flagImageStyles = {
  marginRight: '10px',
  borderRadius: '50%',
  width: '18px',
  height: '18px',
};

const showOriginalSpanStyles = {
  '@media (max-width: 480px)': {
    display: 'none',
  },
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
    Number(language) === LANGUAGES_MAP[locale as keyof typeof LANGUAGES_MAP];

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
            ? imageByLanguage[LANGUAGES_MAP[locale as keyof typeof LANGUAGES_MAP]]
            : imageByLanguage[language]
        }
        alt="language"
        css={css(flagImageStyles)}
      />
      <span css={css(showOriginalSpanStyles)}>
        {showOriginal ? t('common.seeTranslation') : t('common.seeOriginal')}
      </span>
    </div>
  ) : null;
};

export default SeeOriginal;
