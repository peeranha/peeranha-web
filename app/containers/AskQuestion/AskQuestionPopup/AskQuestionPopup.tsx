import React, { useRef, useState, RefObject } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { css } from '@emotion/react';
import useEventListener from 'hooks/useEventListener';
import { singleCommunityColors } from 'utils/communityManagement';

import LargeButton from 'components/Button/Contained/InfoLarge';
import { FULL_RULES_LINK } from 'app/constants/rules';
import { LINK_COLOR } from 'style-constants';
import { styles } from './AskQuestionPopup.styled';

const colors = singleCommunityColors();

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
                <div
                  css={css`
                    color: #282828;
                    margin-bottom: 24px;
                  `}
                >
                  <span>{t('common.contentPopupBlock_0')}</span>
                  <br />
                  <span>{t('common.contentPopupBlock_1')}</span>
                </div>
                <div
                  css={css`
                    color: #7b7b7b;
                    margin-bottom: 24px;
                  `}
                >
                  <div className="pb16">{t('common.contentPopupBlock_2')}</div>
                  <ol
                    css={css`
                      list-style: decimal;
                      margin-left: 24px;
                      margin-bottom: 16px;
                    `}
                  >
                    <li>{t('common.contentPopupBlock_3')}</li>
                    <li>{t('common.contentPopupBlock_4')}</li>
                    <li>{t('common.contentPopupBlock_5')}</li>
                    <li>{t('common.contentPopupBlock_6')}</li>
                    <li>{t('common.contentPopupBlock_7')}</li>
                  </ol>
                  <Trans
                    i18nKey="common.contentPopupBlock_8"
                    components={[
                      <a
                        href={FULL_RULES_LINK}
                        key="0"
                        target="_blank"
                        css={{
                          color: colors.linkColor || LINK_COLOR,
                          ':hover': { color: colors.linkColor || LINK_COLOR },
                        }}
                      />,
                    ]}
                  />
                  <div
                    css={css`
                      margin-top: 16px;
                    `}
                  >
                    {t('common.contentPopupBlock_9')}
                  </div>
                </div>
                <div css={css(styles.gotItButton)}>
                  <LargeButton
                    onClick={acceptWithRules}
                    css={css`
                      min-width: 69px;
                      height: 30px;
                      background: ${colors.btnHeaderColor};
                      color: ${colors.newPostButtonText};
                      border: 1px solid ${colors.newPostButtonText};
                      :hover {
                        background: ${colors.btnHeaderHoverColor};
                        border: ${colors.btnHeaderHoverBorder};
                        opacity: ${colors.btnHeaderHoverOpacity};
                      }
                    `}
                  >
                    {t('common.gotIt')}
                  </LargeButton>
                </div>
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
