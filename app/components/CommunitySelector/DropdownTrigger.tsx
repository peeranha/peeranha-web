import { ArrowDown } from 'components/icons';
import useTrigger from 'hooks/useTrigger';
import React, { useEffect } from 'react';
import { BORDER_PRIMARY } from 'style-constants';

import { singleCommunityColors } from 'utils/communityManagement';
import { styles } from './DropdownTrigger.styled';
import CloseRoundedIcon from 'icons/CloseRounded';

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

  useEffect(() => {
    const handleClose = () => {
      if (isOpen) {
        close();
      }
    };

    document.addEventListener('click', handleClose);
    return () => window.removeEventListener('click', handleClose);
  }, []);

  const dropdownListener = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (selectedLanguages.length !== allLanguages.length) {
      isOpen ? close() : open();
    }
  };

  const removeLanguage = (event: React.MouseEvent, language: string) => {
    event.preventDefault();
    removeSelectedLanguage(language);
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
                onClick={(event) => removeLanguage(event, language)}
              >
                <CloseRoundedIcon
                  fill={colors.tagColor || BORDER_PRIMARY}
                  stroke={colors.tagColor || BORDER_PRIMARY}
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
