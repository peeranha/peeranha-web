import React, { useRef, useState, RefObject } from 'react';
import { FormattedMessage } from 'react-intl';
import { css } from '@emotion/react';
import useEventListener from 'hooks/useEventListener';
import LargeOutlinedButton from 'components/Button/Outlined/InfoLarge';
import { singleCommunityStyles } from '../../../utils/communityManagement';

import commonMessages from '../../../common-messages';
import { styles } from './AskQuestionPopup.styled';

const stylesCommunity = singleCommunityStyles();

const AskQuestionPopup: React.FC = (): JSX.Element => {
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
                <div className="pb20 tc">
                  <FormattedMessage
                    id={commonMessages.rulesAskQuestionPopupBlock_1.id}
                  />
                </div>
                <div>
                  <FormattedMessage
                    id={commonMessages.rulesAskQuestionPopupBlock_2.id}
                  />
                </div>
                <div>
                  <FormattedMessage
                    id={commonMessages.rulesAskQuestionPopupBlock_3.id}
                  />
                </div>
                <div>
                  <FormattedMessage
                    id={commonMessages.rulesAskQuestionPopupBlock_4.id}
                  />
                </div>
                <div>
                  <FormattedMessage
                    id={commonMessages.rulesAskQuestionPopupBlock_5.id}
                  />
                </div>
                <div>
                  <FormattedMessage
                    id={commonMessages.rulesAskQuestionPopupBlock_6.id}
                  />
                </div>
                <div>
                  <FormattedMessage
                    id={commonMessages.rulesAskQuestionPopupBlock_7.id}
                  />
                </div>
                <div className="p20 tc">
                  <FormattedMessage
                    id={commonMessages.rulesAskQuestionPopupBlock_8.id}
                  />
                </div>
                <LargeOutlinedButton
                  onClick={acceptWithRules}
                  customStyles={stylesCommunity.headerLoginButtonStyles}
                >
                  <FormattedMessage id={commonMessages.gotIt.id} />
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
