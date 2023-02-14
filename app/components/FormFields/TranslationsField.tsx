import Dropdown from 'components/common/Dropdown/Dropdown';
import React, { useEffect } from 'react';
import { languagesWithDescriptions } from 'app/i18n';
import TranslationSettings from 'containers/EditCommunity/TranslationSettings';
import DropdownTrigger from 'components/CommunitySelector/DropdownTrigger';
import { useTranslation } from 'react-i18next';
import { styles } from './TranslationsField.styled';

type TranslationsFieldProps = {
  translations: Translation[];
  communityId: number;
  selectedLanguages: string[];
  setSelectedLanguages: (languages: string[]) => void;
};

type Translation = {
  communityId: string;
  description: string;
  enableAutotranslation: boolean;
  id: string;
  language: string;
  name: string;
};

const TranslationsField: React.FC<TranslationsFieldProps> = ({
  translations,
  communityId,
  selectedLanguages,
  setSelectedLanguages,
}): JSX.Element => {
  const { t } = useTranslation();

  const removeSelectedLanguage = (removedLanguage: string) => {
    setSelectedLanguages(
      selectedLanguages.filter((language) => language !== removedLanguage),
    );
  };

  useEffect(() => {
    if (translations) {
      setSelectedLanguages(
        translations.map((translation) => translation.language),
      );
    }
  }, [translations]);

  const allLanguages = languagesWithDescriptions
    .filter((language) => language.language !== 'en')
    .map((language) => ({
      value: language.language,
      label: t(`common.${language.description}`),
    }));

  const optionsLanguages = allLanguages.filter(
    (language) => selectedLanguages.indexOf(language.value) === -1,
  );

  return (
    <div css={styles.container}>
      <Dropdown
        options={optionsLanguages.map((language) => ({
          label: language.label,
          value: language.value,
          render: (
            <div
              className="full-width df aic fz16 light full-height"
              css={styles.option}
              onClick={() => {
                setSelectedLanguages([...selectedLanguages, language.value]);
              }}
            >
              {language.label}
            </div>
          ),
        }))}
        value={selectedLanguages}
        trigger={
          <DropdownTrigger
            selectedLanguages={selectedLanguages}
            allLanguages={allLanguages}
            removeSelectedLanguage={removeSelectedLanguage}
            placeholder={t('common.editCommunityDesc.selectLanguages')}
          />
        }
      />
      <div>
        {allLanguages
          .filter((language) => selectedLanguages.includes(language.value))
          .map((language) => (
            <TranslationSettings
              key={language.value}
              label={language.label}
              id={`${communityId}-${language.value}`}
              value={language.value}
              removeSelectedLanguage={removeSelectedLanguage}
            />
          ))}
      </div>
    </div>
  );
};

export default TranslationsField;
