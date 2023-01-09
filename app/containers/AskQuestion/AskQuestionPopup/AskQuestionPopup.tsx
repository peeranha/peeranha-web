import React, { useRef, useState, RefObject } from 'react';
import { FormattedMessage } from 'react-intl';
import { css } from '@emotion/react';
import useEventListener from 'hooks/useEventListener';
import { singleCommunityColors } from 'utils/communityManagement';

import commonMessages from '../../../common-messages';
import { styles } from './AskQuestionPopup.styled';
import LargeButton from 'components/Button/Contained/InfoLarge';

const colors = singleCommunityColors();

const Button = LargeButton.extend`
  min-width: 69px;
  height: 30px;
`;

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
              <div1111 className="df fdc jcsb pt24 pb24 lh1-5">
                <div>
                  <FormattedMessage
                    id={commonMessages.rulesAskQuestionPopupBlock_0.id}
                  />
                </div>
                <div className="pb24">
                  <FormattedMessage
                    id={commonMessages.rulesAskQuestionPopupBlock_1.id}
                  />
                </div>

                <div
                  css={css`
                    color: #7b7b7b;
                  `}
                >
                  <div className="pb16">
                    <FormattedMessage
                      id={commonMessages.rulesAskQuestionPopupBlock_2.id}
                    />
                  </div>
                  <ul className="pb16 ml4">
                    <li>
                      <FormattedMessage
                        id={commonMessages.rulesAskQuestionPopupBlock_3.id}
                      />
                    </li>
                    <li>
                      <FormattedMessage
                        id={commonMessages.rulesAskQuestionPopupBlock_4.id}
                      />
                    </li>
                    <li>
                      <FormattedMessage
                        id={commonMessages.rulesAskQuestionPopupBlock_5.id}
                      />
                    </li>
                    <li>
                      <FormattedMessage
                        id={commonMessages.rulesAskQuestionPopupBlock_6.id}
                      />
                    </li>
                    <li>
                      <FormattedMessage
                        id={commonMessages.rulesAskQuestionPopupBlock_7.id}
                      />
                    </li>
                  </ul>

                  <div>
                    <FormattedMessage
                      id={commonMessages.rulesAskQuestionPopupBlock_8.id}
                    />
                  </div>
                </div>
              </div1111>
              <div css={css(styles.gotItButton)}>
                <Button
                  onClick={acceptWithRules}
                  css={css`
                    background: ${colors.btnHeaderColor};
                    color: ${colors.newPostButtonText};
                    border: 1px solid ${colors.newPostButtonText};
                    :hover {
                      background: ${colors.btnHeaderHoverColor};
                      border: ${colors.btnHeaderHoverBorder};
                      opacity: ${colors.btnHeaderHoverOpacity};
                    }
                  `}
                  className="mb24"
                >
                  <FormattedMessage id={commonMessages.gotIt.id} />
                </Button>
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
