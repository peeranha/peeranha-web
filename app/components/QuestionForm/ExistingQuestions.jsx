import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { BORDER_SECONDARY } from 'style-constants';
import { graphCommunityColors } from 'utils/communityManagement';

import Label from 'components/FormFields/Label';
import Li from 'components/Li';

import { questionView } from '../../routes-config';

const graphCommunity = graphCommunityColors();

const Container = styled.div`
  margin-bottom: 15px;
`;
const Link = styled.a`
  font-weight: normal;
`;

const Span = styled.span`
  font-weight: normal;
  color: var(--color-blue);
`;

const Button = styled.p`
  padding: 6px 16px;
`;
const List = styled.ul`
  border: 1px solid ${graphCommunity ? '#3d3d54' : BORDER_SECONDARY};
  border-radius: 3px;
`;
const ListItem = styled(Li)`
  border-bottom: 1px solid ${graphCommunity ? '#3d3d54' : BORDER_SECONDARY};
  cursor: default;
  padding: 6px 16px;

  &:last-child {
    border: none;
  }
`;

const getQuestionTitleWithoutCommunity = (str, communities) => {
  const titleWords = str ? str.split(' ') : [];
  return titleWords.length >= 3 &&
    communities.includes(titleWords[titleWords.length - 1]) &&
    titleWords[titleWords.length - 2] === '-'
    ? str.substring(
        0,
        str.length -
          (titleWords[titleWords.length - 1].length + titleWords[titleWords.length - 2].length + 2),
      )
    : str;
};

const ExistingQuestions = ({ questions, skip, show, communities }) => {
  const { t } = useTranslation();
  const commNames = communities.map((comm) => comm.name);
  const findQuestions = questions.slice(0, 4);

  return (
    <Container>
      <Label>
        {t('common.existingQuestionsLabel')}{' '}
        <Span onClick={skip} css={graphCommunity && { color: '#6F4CFF' }}>
          {t('common.skip')}
        </Span>
      </Label>
      <List>
        {findQuestions.map((q) => (
          <ListItem key={questionView(q.id, q.title)}>
            <a
              href={questionView(q.id, q.title)}
              target={'_blank'}
              css={graphCommunity && { color: '#6F4CFF' }}
            >
              {getQuestionTitleWithoutCommunity(q.title, commNames)}
            </a>
          </ListItem>
        ))}
      </List>
      {questions.length > 4 && (
        <Link href="#" onClick={show}>
          <Button>{t('common.showMoreQuestions')}</Button>
        </Link>
      )}
    </Container>
  );
};

ExistingQuestions.propTypes = {
  questions: PropTypes.array.isRequired,
  skip: PropTypes.func.isRequired,
};

export default memo(ExistingQuestions);
