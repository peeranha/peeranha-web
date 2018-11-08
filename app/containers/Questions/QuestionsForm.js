import React from 'react';

import Box from './Box';
import QuestionsHeader from './QuestionsHeader';
import QuestionsContent from './QuestionsContent';

const QuestionsForm = props => (
  <Box>
    <QuestionsHeader {...props} />
    <QuestionsContent {...props} />
  </Box>
);

export default QuestionsForm;
