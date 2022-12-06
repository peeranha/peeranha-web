import React from 'react';
import letterSmile from 'images/letter-smile.svg?inline';
import { styles } from './FormSection.styled';
import SendMessageForm from './SendMessageForm';
import { pageStyles } from '../HomePage.styled';
import { HomepageProps } from '../../../pages/HomePage/types';
import { SEND_MESSAGE_FORM } from '../../../pages/HomePage/constants';

const FormSection: React.FC<HomepageProps> = ({
  sendMessageLoading,
  sendMessageDispatch,
}): JSX.Element => (
  <section css={styles.container}>
    <div css={pageStyles.container}>
      <div className="df jcc" css={styles.image}>
        <img src={letterSmile} alt="" className="full-width" />
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

export default FormSection;
