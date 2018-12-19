import React from 'react';
import styled from 'styled-components';

import Header from './Header';
import FaqMain from './FaqMain';
import Footer from './Footer';

const Box = styled.div`
  .get-more-answers {
    display: none;
  }
`;

const FaqFull = () => (
  <Box>
    <Header />
    <FaqMain />
    <Footer />
  </Box>
);

export default FaqFull;
