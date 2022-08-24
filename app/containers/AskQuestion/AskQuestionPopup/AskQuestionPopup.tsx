import React, { useRef, useState, RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import { css } from '@emotion/react';
import useEventListener from 'hooks/useEventListener';
import LargeOutlinedButton from 'components/Button/Outlined/InfoLarge';
import { singleCommunityStyles } from '../../../utils/communityManagement';

import { styles } from './AskQuestionPopup.styled';

const stylesCommunity = singleCommunityStyles();

const AskQuestionPopup: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const [enableAnimation, setEnableAnimation] = useState<boolean>(false);
  const [IsAgreeRules, setIsAgreeRules] = useState<boolean>(() =>
    Boolean(localStorage.getItem('agreement with the rules')),
  );
  const popupRef = useRef<RefObject<HTMLDivElement> | null>(null);

  useEventListener({
    target: popupRef,
    event: 'animationend',
    handler: () => setIsAgreeRules(true),
  });

  const acceptWithRules = () => {
    localStorage.setItem('agreement with the rules', 'true');
    setEnableAnimation(true);
  };

  return (
    <>
      {!IsAgreeRules && (
        <div>
          <div
            ref={popupRef}
            className="pf l0 full-width full-height"
            css={css({
              ...styles.rulesConsent,
              ...(enableAnimation && styles.rulesConsentAnimation),
            })}
          >
            <div className="container">
              <div className="df fdc jcsb pt24 pb24 lh1-5">
                <div className="pb20 tc">{t('common.contentPopupBlock_1')}</div>
                <div>{t('common.contentPopupBlock_2')}</div>
                <div>{t('common.contentPopupBlock_3')}</div>
                <div>{t('common.contentPopupBlock_4')}</div>
                <div>{t('common.contentPopupBlock_5')}</div>
                <div>{t('common.contentPopupBlock_6')}</div>
                <div>{t('common.contentPopupBlock_7')}</div>
                <div className="p20 tc">{t('common.contentPopupBlock_8')}</div>
                <LargeOutlinedButton
                  onClick={acceptWithRules}
                  customStyles={stylesCommunity.headerLoginButtonStyles}
                >
                  {t('common.gotIt')}
                </LargeOutlinedButton>
              </div>
            </div>
          </div>
          <div
            className="pa t0 l0 full-width full-height"
            css={css({
              ...styles.modalOpen,
              ...(enableAnimation && styles.modalClose),
            })}
          />
        </div>
      )}
    </>
  );
};

export default AskQuestionPopup;
