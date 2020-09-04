import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import styled from 'styled-components';

import { BORDER_SECONDARY } from 'style-constants';

import Label from 'components/FormFields/Label';
import Li from 'components/Li';

import messages from './messages';

const Container = styled.div`
  margin-bottom: 15px;
`;
const Link = styled.a`
  font-weight: normal;
`;
const List = styled.ul`
  border: 1px solid ${BORDER_SECONDARY};
  border-radius: 3px;
`;
const ListItem = styled(Li)`
  border-bottom: 1px solid ${BORDER_SECONDARY};
  cursor: default;
  padding: 6px 16px;

  &:last-child {
    border: none;
  }
`;

const ExistingQuestions = ({ questions, skip, intl }) => (
  <Container>
    <Label>
      {intl.formatMessage(messages.existingQuestionsLabel)}{' '}
      <Link href="#" onClick={skip}>
        {intl.formatMessage(messages.skipExistingQuestions)}
      </Link>
    </Label>
    <List>
      {questions.map(q => (
        <ListItem>
          <a href={q.link}>{q.title}</a>
        </ListItem>
      ))}
    </List>
  </Container>
);

ExistingQuestions.propTypes = {
  questions: PropTypes.array.isRequired,
  skip: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default memo(ExistingQuestions);
