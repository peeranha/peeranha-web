import React from 'react';

import Box from './Box';
import Question from './Question';

const ViewQuestionForm = props => (
  <Box>
    <Question {...props} />
  </Box>
);

export default ViewQuestionForm;
