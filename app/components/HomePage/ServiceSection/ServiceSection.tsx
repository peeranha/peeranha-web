import React from 'react';
import { FormattedMessage } from 'react-intl';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import service from 'images/ico_service.svg?inline';
import language from 'images/ico_language.svg?inline';
import community from 'images/ico_community.svg?inline';
import faq from 'images/ico_faq.svg?inline';
import profile from 'images/ico_profile.svg?inline';
import discussions from 'images/ico_discussions.svg?inline';

import messages from '../messages';

import { styles } from './ServiceSection.styled';
import { pageStyles } from '../HomePage.styled';

const ServiceSection: React.FC = (): JSX.Element => (
  <section css={styles.container}>
    <div css={pageStyles.container}>
      <div className="df fdc aic" css={styles.wrapper}>
        <div className="df jcc aic bold fz28 tc" css={styles.title}>
          <FormattedMessage id={messages.whiteGloveService.id} />
        </div>
        <div css={styles.content}>
          <div css={styles.contentBlock}>
            <img
              src={discussions}
              alt="knowledge base icon"
              css={styles.image}
            />
            <div>
              <h5 css={styles.header}>
                <FormattedMessage id={messages.knowledgeBase.id} />
              </h5>
              <p css={styles.text}>
                <FormattedMessage id={messages.whiteLabeledCommunity.id} />
              </p>
            </div>
          </div>
          <div css={styles.contentBlock}>
            <img
              src={profile}
              alt="community support icon"
              css={styles.image}
            />
            <div>
              <h5 css={styles.header}>
                <FormattedMessage id={messages.communitySupport.id} />
              </h5>
              <p css={styles.text}>
                <FormattedMessage id={messages.freeSupportSpecialist.id} />
              </p>
            </div>
          </div>
          <div css={styles.contentBlock}>
            <img src={faq} alt="easy work icon" css={styles.image} />
            <div>
              <h5 css={styles.header}>
                <FormattedMessage id={messages.easyWork.id} />
              </h5>
              <p css={styles.text}>
                <FormattedMessage id={messages.scrapeCommunityChannels.id} />
              </p>
            </div>
          </div>
          <div css={styles.contentBlock}>
            <img src={community} alt="community icon" css={styles.image} />
            <div>
              <h5 css={styles.header}>
                <FormattedMessage id={messages.communityChannels.id} />
              </h5>
              <p css={styles.text}>
                <FormattedMessage id={messages.integrationBots.id} />
              </p>
            </div>
          </div>
          <div css={styles.contentBlock}>
            <img src={language} alt="language icon" css={styles.image} />
            <div>
              <h5 css={styles.header}>
                <FormattedMessage id={messages.multiLanguage.id} />
              </h5>
              <p css={styles.text}>
                <FormattedMessage id={messages.supportContributors.id} />
              </p>
            </div>
          </div>
          <div css={styles.contentBlock}>
            <img src={service} alt="knowledge base icon" css={styles.image} />
            <div>
              <h5 css={styles.header}>
                <FormattedMessage id={messages.lifelongService.id} />
              </h5>
              <p css={styles.text}>
                <FormattedMessage id={messages.trackActivity.id} />
              </p>
            </div>
          </div>
        </div>
        <button
          className="df jcc aic fz20"
          css={styles.button}
          onClick={() => createdHistory.push(routes.feed())}
        >
          <FormattedMessage id={messages.startNow.id} />
        </button>
      </div>
    </div>
  </section>
);

export default ServiceSection;
