import React from 'react';
import { FormattedMessage } from 'react-intl';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import intelligentMan from 'images/im.svg?inline';
import arrow from 'images/Arrow.svg?inline';

import messages from '../messages';

import { styles } from './GetStartedSection.styled';
import { pageStyles } from '../HomePage.styled';

const GetStartedSection: React.FC = (): JSX.Element => (
  <section css={pageStyles.container}>
    <div className="df fdc aic" css={styles.wrapper}>
      <div className="df fdc aic" css={styles.sectionContent}>
        <div className="df fdc aic" css={styles.sectionText}>
          <h1 className="bold fz46 tc mb8" css={styles.heading}>
            <FormattedMessage id={messages.moreThan.id} />
          </h1>
          <span className="bold fz16 tc mb32" css={styles.subHeading}>
            <FormattedMessage id={messages.greatCommunity.id} />
          </span>
          <button
            className="df jcc aic fz20"
            css={styles.button}
            onClick={() => createdHistory.push(routes.feed())}
          >
            <FormattedMessage id={messages.getStarted.id} />
          </button>
        </div>
        <img src={intelligentMan} alt="intelligent man" css={styles.manImage} />
      </div>
      <img src={arrow} css={styles.arrowImage} alt="navigation arrow" />
    </div>
  </section>
);

export default GetStartedSection;
