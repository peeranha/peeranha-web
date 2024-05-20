import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import * as routes from 'routes-config';
import { Link } from 'react-router-dom';
import { isSingleCommunityWebsite } from 'utils/communityManagement';

import {
  imageValidation,
  required,
  strLength3x20,
  strLength15x250,
  strLength100Max,
  validateURL,
  withoutDoubleSpace,
} from 'components/FormFields/validate';

import FormBox from 'components/Form';
import LargeButton from 'components/Button/Contained/InfoLarge';
import { ExtendedBase } from 'components/Base/AvatarBase';
import AvatarField from 'components/FormFields/AvatarField';
import TextInputField from 'components/FormFields/TextInputField';
import TextareaField from 'components/FormFields/TextareaField';
import TranslationsField from 'components/FormFields/TranslationsField';
import ScrollContainer from 'components/common/ScrollContainer';

import { scrollToErrorField } from 'utils/animation';
import { isSuiBlockchain } from 'utils/constants';

import WarningFreezeCommunityModal from './WarningFreezeCommunityModal';
import {
  COMM_AUTOTRANSLATIONS_FIELD,
  COMM_AVATAR_FIELD,
  COMM_NAME_FIELD,
  COMM_OFFICIAL_SITE_FIELD,
  COMM_PEERANHA_SITE_FIELD,
  COMM_SHORT_DESCRIPTION_FIELD,
  COMM_TRANSLATIONS_DESCRIPTION_FIELD,
  COMM_TRANSLATIONS_FIELD,
  COMM_TRANSLATIONS_TITLE_FIELD,
  EDIT_COMMUNITY_BUTTON,
  FREEZE_COMMUNITY_BUTTON,
  EDIT_COMMUNITY_FORM,
  GENERAL_TAB,
  TRANSLATIONS_TAB,
  ADVANCED_TAB,
} from './constants';
import { COMMUNITY_TYPE } from '../CreateCommunity/constants';
import styles from './Form.styled';

const isSingleCommunityMode = isSingleCommunityWebsite();

const EditCommunityForm = ({
  community,
  communityId,
  communityLoading,
  editCommunityDispatch,
  freezeCommunityLoading,
  freezeCommunityDispatch,
  handleSubmit,
  tab,
  setTab,
}) => {
  const { t } = useTranslation();
  const nextRoute = isSingleCommunityMode ? routes.feed : routes.communities;
  const commId = isSuiBlockchain ? community?.id : communityId;
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const editCommunity = useCallback(
    (values) => {
      const communityData = {
        avatar: values.get(COMM_AVATAR_FIELD),
        name: values.get(COMM_NAME_FIELD),
        description: values.get(COMM_SHORT_DESCRIPTION_FIELD),
        website: values.get(COMM_OFFICIAL_SITE_FIELD),
        communitySite: values.get(COMM_PEERANHA_SITE_FIELD),
        isBlogger: false,
        translations: selectedLanguages.map((language) => ({
          communityId: commId,
          id: `${commId}-${language}`,
          description: values.get(`${COMM_TRANSLATIONS_DESCRIPTION_FIELD}-${commId}-${language}`),
          enableAutotranslation: values.get(`${COMM_AUTOTRANSLATIONS_FIELD}-${commId}-${language}`),
          language,
          name: values.get(`${COMM_TRANSLATIONS_TITLE_FIELD}-${commId}-${language}`),
        })),
      };

      editCommunityDispatch(communityId, communityData);
    },
    [commId, editCommunityDispatch, selectedLanguages],
  );

  const setGeneralTab = (event) => {
    event.preventDefault();
    setTab(GENERAL_TAB);
  };
  const setTranslationsTab = (event) => {
    event.preventDefault();
    setTab(TRANSLATIONS_TAB);
  };
  const setAdvancedTab = (event) => {
    event.preventDefault();
    setTab(ADVANCED_TAB);
  };

  return (
    <FormBox onSubmit={handleSubmit(editCommunity)}>
      <ExtendedBase
        css={{
          ...styles.mainBlock,
          ...(tab === ADVANCED_TAB && {
            '@media (min-width: 577px)': {
              borderBottom: 'none',
            },
          }),
        }}
      >
        <Field
          name={COMM_AVATAR_FIELD}
          component={AvatarField}
          validate={[imageValidation, required]}
          warn={[imageValidation, required]}
          disabled={communityLoading}
        />
        <div>
          <div className="mb24" css={styles.tabsBlock}>
            <ScrollContainer>
              <div className="mb12">
                <button
                  css={{
                    ...styles.button,
                    ...(tab === GENERAL_TAB && styles.activeTab),
                  }}
                  onClick={setGeneralTab}
                >
                  {t('common.editCommunityDesc.general')}
                </button>
                <button
                  css={{
                    ...styles.button,
                    ...(tab === TRANSLATIONS_TAB && styles.activeTab),
                  }}
                  onClick={setTranslationsTab}
                >
                  {t('common.editCommunityDesc.translations')}
                </button>
                <button
                  css={{
                    ...styles.button,
                    ...(tab === ADVANCED_TAB && styles.activeTab),
                  }}
                  onClick={setAdvancedTab}
                >
                  {t('common.editCommunityDesc.advanced')}
                </button>
              </div>
            </ScrollContainer>
          </div>
          <div>
            <div className={tab !== GENERAL_TAB ? 'dn' : ''}>
              <Field
                name={COMM_NAME_FIELD}
                component={TextInputField}
                validate={[withoutDoubleSpace, strLength3x20, required]}
                warn={[strLength3x20, required]}
                disabled={communityLoading}
                label={t('createCommunity.communityTitle')}
                splitInHalf
                tip={t('createCommunity.communityTitleTip')}
              />

              <Field
                name={COMM_SHORT_DESCRIPTION_FIELD}
                component={TextareaField}
                validate={[withoutDoubleSpace, strLength15x250, required]}
                warn={[strLength15x250, required]}
                disabled={communityLoading}
                label={t('createCommunity.shortDescription')}
                splitInHalf
                tip={t('createCommunity.shortDescriptionTip')}
              />

              <Field
                name={COMM_OFFICIAL_SITE_FIELD}
                component={TextInputField}
                validate={[withoutDoubleSpace, validateURL, strLength100Max]}
                warn={[validateURL]}
                disabled={communityLoading}
                label={t('createCommunity.website')}
                placeholder="https://example.com"
                splitInHalf
                tip={t('createCommunity.websiteTip')}
              />

              <Field
                disabled={communityLoading}
                name={COMM_PEERANHA_SITE_FIELD}
                component={TextInputField}
                label={t('createCommunity.communityWebsite')}
                validate={[withoutDoubleSpace, strLength100Max]}
                warn={[strLength100Max]}
                placeholder="subdomain.peeranha.io"
                tip={t('createCommunity.communityWebsiteTip')}
                splitInHalf
              />
            </div>
            <div className={tab !== TRANSLATIONS_TAB ? 'dn' : ''}>
              <span className="fz16 semi-bold pb8" css={styles.translationsTitle}>
                {t('common.editCommunityDesc.interfaceLanguages')}
              </span>
              <p className="fz16 mb12" css={styles.translationsText}>
                {t('common.editCommunityDesc.interfaceTranslation')}
              </p>

              <Field
                disabled={communityLoading}
                name={COMM_TRANSLATIONS_FIELD}
                component={TranslationsField}
                translations={community?.translations}
                communityId={communityId}
                selectedLanguages={selectedLanguages}
                setSelectedLanguages={setSelectedLanguages}
              />
            </div>
            <div className={isSuiBlockchain || tab !== ADVANCED_TAB ? 'dn' : ''}>
              <span className="fz16 semi-bold pb8" css={styles.translationsTitle}>
                {t('common.editCommunityDesc.emergencyFreeze')}
              </span>
              <WarningFreezeCommunityModal
                isFrozen={community?.isFrozen}
                submitAction={() => freezeCommunityDispatch(community?.isFrozen, communityId)}
                Button={({ onClick }) => (
                  <LargeButton
                    id={FREEZE_COMMUNITY_BUTTON}
                    onClick={(e) => {
                      e.preventDefault();
                      onClick();
                    }}
                    disabled={freezeCommunityLoading}
                    block={freezeCommunityLoading}
                    css={styles.freezeButton}
                  >
                    {t(
                      `common.editCommunityDesc.${
                        community?.isFrozen ? 'unfreezeCommunity' : 'freezeCommunity'
                      }`,
                    )}
                  </LargeButton>
                )}
              />
            </div>
          </div>
        </div>
      </ExtendedBase>
      {tab !== ADVANCED_TAB && (
        <LargeButton
          id={EDIT_COMMUNITY_BUTTON}
          type="submit"
          disabled={communityLoading}
          css={styles.saveButton}
        >
          {t('common.editCommunityDesc.editCommunity')}
        </LargeButton>
      )}
      <div
        className={`${tab === ADVANCED_TAB ? 'dn' : 'pf b0 l0 full-width'}`}
        css={styles.popupMenu}
      >
        <div className="df jcsb pr16 pl16 pt8 pb8">
          <Link to={nextRoute()}>
            <button css={styles.popupMenuCloseButton}>{t('common.close')}</button>
          </Link>
          <button css={styles.popupMenuSaveButton} type="submit" disabled={communityLoading}>
            {t('common.editCommunityDesc.editCommunity')}
          </button>
        </div>
      </div>
    </FormBox>
  );
};

EditCommunityForm.propTypes = {
  communityId: PropTypes.number.isRequired,
  communityLoading: PropTypes.bool.isRequired,
  editCommunityDispatch: PropTypes.func.isRequired,
  freezeCommunityLoading: PropTypes.bool.isRequired,
  freezeCommunityDispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const FormClone = reduxForm({
  enableReinitialize: true,
  form: EDIT_COMMUNITY_FORM,
  onSubmitFail: (errors) => {
    scrollToErrorField(errors);
  },
})(EditCommunityForm);

export default connect((state, { community }) => {
  const translationsFields = {};
  if (community) {
    for (let i = 0; i < community.translations.length; i++) {
      translationsFields[`${COMM_TRANSLATIONS_TITLE_FIELD}-${community.translations[i].id}`] =
        community.translations[i].name;
      translationsFields[`${COMM_TRANSLATIONS_DESCRIPTION_FIELD}-${community.translations[i].id}`] =
        community.translations[i].description;
      translationsFields[`${COMM_AUTOTRANSLATIONS_FIELD}-${community.translations[i].id}`] =
        community.translations[i].enableAutotranslation;
    }
  }

  return {
    formValues: state.toJS()?.form[EDIT_COMMUNITY_FORM]?.values ?? {},
    initialValues: community
      ? {
          [COMM_AVATAR_FIELD]: community.avatar,
          [COMM_AVATAR_FIELD]: community.avatar,
          [COMM_NAME_FIELD]: community.name,
          [COMM_SHORT_DESCRIPTION_FIELD]: community.description,
          [COMM_OFFICIAL_SITE_FIELD]: community.website,
          [COMM_PEERANHA_SITE_FIELD]: community.communitySite,
          [COMMUNITY_TYPE]: 0,
          ...translationsFields,
        }
      : {},
  };
})(FormClone);
