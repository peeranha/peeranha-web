import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { GENERAL_TAB } from 'containers/EditCommunity/constants';

import Label from 'components/FormFields/Label';
import { Ul } from 'components/TextEditor/Tips';

export const Tips = ({ faqQuestions, tab }) => {
  const { t } = useTranslation();
  const isGeneralTab = useMemo(() => tab === GENERAL_TAB, [tab]);

  return (
    <div>
      <Label className="mb-3">{t('common.tips')}</Label>

      <Ul>
        <li>
          <span>
            {t(
              `createCommunity.${
                isGeneralTab ? 'imageWillBeTheFace' : 'emergencyFreezeImmediately'
              }`,
            )}
          </span>
        </li>
        <li>
          <span>
            {t(
              `createCommunity.${
                isGeneralTab ? 'specifyMemorableTitle' : 'onlyAdministratorsModerators'
              }`,
            )}
          </span>
        </li>
        <li>
          <span>
            {t(
              `createCommunity.${
                isGeneralTab ? 'communityDescriptionShouldBe' : 'allPostsReplies'
              }`,
            )}
          </span>
        </li>
        <li>
          <span>
            {t(`createCommunity.${isGeneralTab ? 'writeWhyDoWeeNeed' : 'anEmergencyFreeze'}`)}
          </span>
        </li>
      </Ul>
    </div>
  );
};

Tips.propTypes = {
  faqQuestions: PropTypes.array,
  tab: PropTypes.string,
};

export default React.memo(Tips);
