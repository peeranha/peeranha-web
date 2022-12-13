import React, { useEffect, useState } from 'react';
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
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setSticky(window.scrollY > 0);
    });
  }, []);

  return (
    <div css={pageStyles.homePage}>
      <Header sticky={sticky} />
      {sticky && <div css={pageStyles.sticky}></div>}
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
