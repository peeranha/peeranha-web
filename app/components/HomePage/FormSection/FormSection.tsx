import React, { useEffect, useRef, useState } from 'react';
import { scrollTrigger } from 'utils/animation';
import letterSmile from 'images/letter-smile.svg?inline';
import { styles } from './FormSection.styled';
import SendMessageForm from './SendMessageForm';
import { pageStyles } from '../HomePage.styled';
import { HomepageProps } from '../../../pages/HomePage/types';
import { SEND_MESSAGE_FORM } from '../../../pages/HomePage/constants';

const FormSection: React.FC<HomepageProps> = ({
  sendMessageLoading,
  sendMessageDispatch,
}): JSX.Element => {
  const letterBlock = useRef(null);

  const [startLetterAnimation, setStartLetterAnimation] = useState<boolean>(false);

  useEffect(() => {
    scrollTrigger(letterBlock.current, () => setStartLetterAnimation(true));
  }, []);

  return (
    <section css={pageStyles.container}>
      <div css={styles.container}>
        <div
          ref={letterBlock}
          className="df jcc op0"
          css={{
            ...styles.image,
            ...(startLetterAnimation && styles.letterAnimation),
          }}
        >
          <img src={letterSmile} alt="letter image" className="full-width" />
        </div>
        <div>
          <SendMessageForm
            form={SEND_MESSAGE_FORM}
            sendMessage={sendMessageDispatch}
            sendMessageLoading={sendMessageLoading}
          />
        </div>
      </div>
    </section>
  );
};

export default FormSection;
