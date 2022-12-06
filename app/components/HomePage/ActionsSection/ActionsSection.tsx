import React from 'react';
import { FormattedMessage } from 'react-intl';
import { css } from '@emotion/react';
import screen_1 from 'images/scr_1.jpg';
import screen_2 from 'images/scr_2.jpg';
import screen_3 from 'images/scr_3.jpg';
import screen_4 from 'images/scr_4.jpg';
import messages from '../messages';

import { styles } from './ActionsSection.styled';
import { pageStyles } from '../HomePage.styled';

const ActionsSection: React.FC = (): JSX.Element => (
  <section css={pageStyles.container}>
    <div className="df fdc aic" css={styles.wrapper}>
      <div css={css({ ...styles.action, ...styles.reverse })}>
        <div css={styles.textBlock}>
          <h3 css={styles.header}>
            <FormattedMessage id={messages.focusBigPicture.id} />
          </h3>
          <span css={styles.text}>
            <FormattedMessage id={messages.newStandard.id} />
          </span>
        </div>
        <img src={screen_1} alt="experts posts" css={styles.image} />
      </div>
      <div css={styles.action}>
        <div css={styles.textBlock}>
          <h3 css={styles.header}>
            <FormattedMessage id={messages.askAndAnswer.id} />
          </h3>
          <span css={styles.text}>
            <FormattedMessage id={messages.createDiscussBreeze.id} />
          </span>
        </div>
        <img src={screen_2} alt="new post creation" css={styles.image} />
      </div>
      <div css={css({ ...styles.action, ...styles.reverse })}>
        <div css={styles.textBlock}>
          <h3 css={styles.header}>
            <FormattedMessage id={messages.trackRoad.id} />
          </h3>
          <span css={styles.text}>
            <FormattedMessage id={messages.seeInformation.id} />
          </span>
        </div>
        <img src={screen_3} alt="profile" css={styles.image} />
      </div>
      <div css={styles.action}>
        <div css={styles.textBlock}>
          <h3 css={styles.header}>
            <FormattedMessage id={messages.makeItYours.id} />
          </h3>
          <span css={styles.text}>
            <FormattedMessage id={messages.rewardedForContributions.id} />
          </span>
        </div>
        <img src={screen_4} alt="nfts" css={styles.image} />
      </div>
    </div>
  </section>
);

export default ActionsSection;
