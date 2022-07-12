import React, { useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { css } from '@emotion/react';
import cn from 'classnames';
import useEventListener from 'hooks/useEventListener';
import LargeOutlinedButton from '../../../components/Button/Outlined/InfoLarge';
import { singleCommunityStyles } from '../../../utils/communityManagement';

import commonMessages from '../../../common-messages';
import { styles } from './AskQuestionPopup.styled';

const stylesCommunity = singleCommunityStyles();

const AskQuestionPopup: React.FC = (): JSX.Element => {
  const [enableAnimation, setEnableAnimation] = useState<boolean>(false);
  const [IsAgreeRules, setIsAgreeRules] = useState<boolean>(() =>
    Boolean(localStorage.getItem('agreement with the rules')),
  );
  const popup = useRef();
  useEventListener({
    target: popup.current,
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
        <div
          ref={popup.current}
          className={cn('pf l0 full-width full-height')}
          css={css({
            ...styles.rulesConsent,
            ...(enableAnimation && styles.rulesConsentAnimation),
          })}
        >
          <div className={cn('container')}>
            <div className={cn('df fdc jcsb pt24 pb24 lh')}>
              <div className={cn('pb20 tc')}>Hey there!</div>
              <div>
                Welcome to Peeranha. We're glad you're here and ready to make
                your first publication. There are just a few simple rules we all
                follow around here:
              </div>
              <div>
                1. Make sure your questions are related to a particular
                community.
              </div>
              <div>
                2. Do a bit of research to be sure your question hasn't been
                asked before.
              </div>
              <div>
                3. Answers have to actually answer the question, and not just be
                a comment.
              </div>
              <div>
                4. Be sure your answer provides valuable information and isn't
                just a repeat of what's already been said.
              </div>
              <div>
                And the most important rule is to be polite and friendly to
                other users.
              </div>
              <div className={cn('p20 tc')}>Thank you!</div>
              <LargeOutlinedButton
                onClick={acceptWithRules}
                customStyles={stylesCommunity.headerLoginButtonStyles}
              >
                <FormattedMessage id={commonMessages.gotIt.id} />
              </LargeOutlinedButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AskQuestionPopup;
