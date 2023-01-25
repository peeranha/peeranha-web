import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { TEXT_SECONDARY } from 'style-constants';

import H4 from 'components/H4';
import Span from 'components/Span';

export const AnswersTitle = ({ answersNum }) => {
  const { t } = useTranslation();

  return (
    <H4 className="text-capitalize" isHeader>
      {t('post.answers')}{' '}
      <Span color={TEXT_SECONDARY} fontSize="30" bold>
        {answersNum}
      </Span>
    </H4>
  );
};

AnswersTitle.propTypes = {
  answersNum: PropTypes.number,
};

export default React.memo(AnswersTitle);
