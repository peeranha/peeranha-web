import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PartnersImg from 'images/partners.svg?inline';

export const ImgContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0 115px 80px;

  @media (max-width: 756px) {
    padding: 0 50px 50px;
  }
`;

const ImgAdaptive = styled.img`
  width: 100%;
  min-width: 200px;
  height: 100%;
`;

const Partners = () => (
  <ImgContainer>
    <ImgAdaptive src={PartnersImg} alt="Partners" />
  </ImgContainer>
);

export default Partners;
