import React from 'react';
import styled from 'styled-components';

import PartnersImg from 'images/partners.svg?inline';
import { useTranslation } from 'react-i18next';

const PartnersHeader = styled.h3`
  display: flex;
  justify-content: center;
  font-weight: 700;
  font-size: 50px;
  line-height: 38px;

  @media (max-width: 1130px) {
    font-size: 40px;
  }

  @media (max-width: 940px) {
    font-size: 32px;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 53px 115px 80px;

  @media (max-width: 756px) {
    padding: 20px 30px 50px;
  }
`;

const ImgAdaptive = styled.img`
  min-width: 200px;
  max-width: 1200px;
  height: 100%;
`;

const Partners = () => {
  const { t } = useTranslation();

  return (
    <>
      <PartnersHeader>{t('common.partners')}</PartnersHeader>
      <ImgContainer>
        <ImgAdaptive src={PartnersImg} alt="Partners" />
      </ImgContainer>
    </>
  );
};

export default Partners;
