import React from 'react';
import { Field } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';

import { BORDER_PRIMARY } from 'style-constants';

import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';
import useTrigger from 'hooks/useTrigger';

import { styles } from 'containers/EditCommunity/TranslationSettings.styled';

import {
  COMM_AUTOTRANSLATIONS_FIELD,
  COMM_TRANSLATIONS_DESCRIPTION_FIELD,
  COMM_TRANSLATIONS_TITLE_FIELD,
} from 'containers/EditCommunity/constants';
import TextInputField from 'components/FormFields/TextInputField';
import {
  required,
  strLength250Max,
  strLength3x20,
  strLength20Max,
  withoutDoubleSpace,
} from 'components/FormFields/validate';
import TextareaField from 'components/FormFields/TextareaField';
import ToggleSwitchField from 'components/FormFields/ToggleSwitchField';
import Popover from 'components/common/Popover';
import { InfoGraph, CaretDownGraph, TrashGraph } from 'components/icons';
import InformationIcon from 'icons/Information';
import DeleteIcon from 'icons/Delete';
import { ArrowDown } from 'icons/index';

import { CHINESE_LANG } from './constants';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

type TranslationSettingsProps = {
  label: string;
  id: string;
  removeSelectedLanguage: (removedLanguage: string) => void;
  value: string;
};

const TranslationSettings: React.FC<TranslationSettingsProps> = ({
  label,
  id,
  removeSelectedLanguage,
  value,
}): JSX.Element => {
  const { t } = useTranslation();
  const [isOpen, open, close] = useTrigger(true);
  const isChineseLang = CHINESE_LANG.includes(label);
  const removeLanguage = () => {
    removeSelectedLanguage(value);
  };

  return (
    <div>
      <button
        className="df full-width mt24"
        type="button"
        css={{
          ...styles.collapsibleContainer,
          ...(isOpen && styles.containerWithContent),
        }}
        onClick={isOpen ? close : open}
      >
        <div
          className="df fz18 mr16 ml16 pb16 pt16 semi-bold jcsb full-width"
          css={{ ...(isOpen && styles.collapsible) }}
        >
          <span>{label}</span>
          {graphCommunity ? (
            <CaretDownGraph
              css={isOpen && { transform: 'rotate(180deg)' }}
              fill="#6F4CFF"
              size={[24, 24]}
            />
          ) : (
            <ArrowDown
              css={{
                ...styles.arrow,
                ...(isOpen && { transform: 'rotate(180deg)' }),
              }}
            />
          )}
        </div>
      </button>
      <div
        className="p16 dn"
        css={{
          ...styles.content,
          ...(isOpen && styles.showContent),
        }}
      >
        <div className="df jcsb aic mb24">
          <div className="df aic">
            <p className="fz14 semi-bold" css={styles.toggleText}>
              {t('common.editCommunityDesc.enableAutotranslations')}
            </p>
            <Popover event="hover" placement="top">
              <Popover.Trigger>
                {graphCommunity ? (
                  <InfoGraph className="ml8" fill="#6F4CFF" size={[24, 24]} />
                ) : (
                  <InformationIcon
                    className="ml8"
                    stroke={colors.tagColor || BORDER_PRIMARY}
                    fill={colors.tagColor || BORDER_PRIMARY}
                  />
                )}
              </Popover.Trigger>
              <Popover.Content>
                <div className="p16" css={styles.tooltip}>
                  <p>{t('common.editCommunityDesc.translationsTooltip')}</p>
                </div>
              </Popover.Content>
            </Popover>
          </div>
          <Field
            name={`${COMM_AUTOTRANSLATIONS_FIELD}-${id}`}
            type="checkbox"
            component={ToggleSwitchField}
          />
        </div>
        <Field
          name={`${COMM_TRANSLATIONS_TITLE_FIELD}-${id}`}
          component={TextInputField}
          validate={[withoutDoubleSpace, isChineseLang ? strLength20Max : strLength3x20, required]}
          warn={[isChineseLang ? strLength20Max : strLength3x20, required]}
          label={t('createCommunity.communityTitle')}
          splitInHalf
          tip={t('createCommunity.communityTitleTip')}
        />

        <Field
          name={`${COMM_TRANSLATIONS_DESCRIPTION_FIELD}-${id}`}
          component={TextareaField}
          validate={[withoutDoubleSpace, strLength250Max]}
          warn={[strLength250Max]}
          label={t('common.description')}
          splitInHalf
          tip={t('createCommunity.shortDescriptionTip')}
        />
        <button onClick={removeLanguage} type="button" className="df aic">
          {graphCommunity ? (
            <TrashGraph fill="#6F4CFF" size={[24, 24]} />
          ) : (
            <DeleteIcon
              stroke={colors.tagColor || BORDER_PRIMARY}
              fill={colors.tagColor || BORDER_PRIMARY}
            />
          )}
          <span className="ml8 fz16 light" css={styles.deleteButton}>
            {t('common.editCommunityDesc.deleteLanguage')}
          </span>
        </button>
      </div>
    </div>
  );
};

export default TranslationSettings;
