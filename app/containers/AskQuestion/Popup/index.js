import React, { useState } from 'react';
import styled from 'styled-components';
import LargeOutlinedButton from '../../../components/Button/Outlined/InfoLarge';
import { FormattedMessage } from 'react-intl';
import commonMessages from '../../../common-messages';
import { wait } from '../../../utils/wait';

const ModalWindow = styled.div`
  background-color: #b3d4fc;
  position: fixed;
  top: 10%;
  left: 25%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  width: 50%;
  z-index: 9999;
  padding: 20px;
  border-radius: 30px;
  animation: animation 1s forwards;
  @keyframes animation {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
    }
  }
  @media (max-width: 990px) {
    width: 100%;
    height: 100%;
    left: 0;
    top: 6%;
    border-radius: 0;
    justify-content: start;
    padding-top: 0;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  padding: 24px 0;
  line-height: 1.5;
`;
const Text = styled.div`
  padding: 10px;
`;

const Popup = () => {
  const [IsAgreeRules, setIsAgreeRules] = useState(() =>
    Boolean(localStorage.getItem('agreement with the rules')),
  );
  const acceptWithRules = () => {
    localStorage.setItem('agreement with the rules', 'true');
    wait(1000).then(() => setIsAgreeRules(true));
  };

  return (
    <>
      {!IsAgreeRules && (
        <ModalWindow>
          <Content>
            <Text>Hey there!</Text>
            <Text>
              Welcome to Peeranha. We're glad you're here and ready to make your
              first publication. There are just a few simple rules we all follow
              around here:
            </Text>
            <Text>
              1. Make sure your questions are related to a particular community.
            </Text>
            <Text>
              2. Do a bit of research to be sure your question hasn't been asked
              before.
            </Text>
            <Text>
              3. Answers have to actually answer the question, and not just be a
              comment.
            </Text>
            <Text>
              4. Be sure your answer provides valuable information and isn't
              just a repeat of what's already been said.
            </Text>
            <Text>
              And the most important rule is to be polite and friendly to other
              users.
            </Text>
            <Text>Thank you!</Text>
          </Content>
          <LargeOutlinedButton onClick={acceptWithRules}>
            <FormattedMessage id={commonMessages.gotIt.id} />
          </LargeOutlinedButton>
        </ModalWindow>
      )}
    </>
  );
};

export default Popup;
