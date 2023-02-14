import { ArrowDown } from 'components/icons';
import useTrigger from 'hooks/useTrigger';
import React from 'react';
import { BORDER_PRIMARY } from 'style-constants';

import { singleCommunityColors } from 'utils/communityManagement';
import { IconMd } from 'components/Icon/IconWithSizes';
import closeIcon from 'images/closeCircle.svg?external';
import { styles } from './DropdownTrigger.styled';

const colors = singleCommunityColors();

type DropdownTriggerProps = {
  selectedLanguages: string[];
  allLanguages: Language[];
  removeSelectedLanguage: (removedLanguage: string) => void;
  placeholder: string;
};

type Language = {
  value: string;
  label: string;
};

const DropdownTrigger: React.FC<DropdownTriggerProps> = ({
  selectedLanguages,
  allLanguages,
  removeSelectedLanguage,
  placeholder,
}): JSX.Element => {
  const [isOpen, open, close] = useTrigger(false);

  document.addEventListener('click', () => {
    if (isOpen) {
      close();
    }
  });

  const dropdownListener = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedLanguages.length !== allLanguages.length) {
      isOpen ? close() : open();
    }
  };

  return (
    <div
      className="df jcsb aic"
      css={styles.container}
      onClick={dropdownListener}
    >
      <div>
        {selectedLanguages.length === 0 && (
          <span css={styles.placeholder}>{placeholder}</span>
        )}
        {selectedLanguages.map((language) => {
          const selectedLanguage = allLanguages.find(
            (languageWithDescription) =>
              languageWithDescription.value === language,
          );
          const removeLanguage = (e) => {
            e.preventDefault();
            removeSelectedLanguage(language);
          };

          return (
            <div
              className="dif aic jcc fz14"
              css={styles.language}
              key={language}
            >
              {selectedLanguage?.label}
              <button
                type="button"
                className="dif"
                css={styles.closeIcon}
                onClick={removeLanguage}
              >
                <IconMd
                  icon={closeIcon}
                  fill={colors.tagColor || BORDER_PRIMARY}
                  color={colors.tagColor || BORDER_PRIMARY}
                />
              </button>
            </div>
          );
        })}
      </div>
      <ArrowDown
        css={{
          ...styles.arrow,
          ...(isOpen && { transform: 'rotate(180deg)' }),
        }}
      />
    </div>
  );
};

export default DropdownTrigger;
