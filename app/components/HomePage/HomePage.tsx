import React from 'react';
import { pageStyles } from './HomePage.styled';
import Header from './Header';
import GetStartedSection from './GetStartedSection';
import ActionsSection from './ActionsSection';
import ServiceSection from './ServiceSection';
import VideoSection from './VideoSection';
import PartnersSection from './PartnersSection';
import FormSection from './FormSection';
import { HomepageProps } from '../../pages/HomePage/types';

const HomePage: React.FC<HomepageProps> = ({
  sendMessageLoading,
  sendMessageDispatch,
}): JSX.Element => {
  return (
    <div css={pageStyles.homePage}>
      <Header />
      <GetStartedSection />
      <ActionsSection />
      <ServiceSection />
      <VideoSection />
      <PartnersSection />
      <FormSection
        sendMessageLoading={sendMessageLoading}
        sendMessageDispatch={sendMessageDispatch}
      />
    </div>
  );
};

export default HomePage;
