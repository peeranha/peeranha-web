import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import commonMessages from 'common-messages';
import { FormattedMessage } from 'react-intl';

import Container from 'components/Labels/QuestionType';

import ExpertPopover from './ExpertPopover';

const QuestionType = ({ locale, isGeneral }) => {
  const [visible, changeVisibility] = useState(false);

  const onMouseEnter = useCallback(() => changeVisibility(true), []);
  const onMouseLeave = useCallback(() => changeVisibility(false), []);

  return !isGeneral ? (
    <Container
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      size="sm"
    >
      {visible && <ExpertPopover locale={locale} />}

      <FormattedMessage {...commonMessages.expert} />
    </Container>
  ) : null;
};

QuestionType.propTypes = {
  locale: PropTypes.string,
  isGeneral: PropTypes.bool,
};

export default memo(QuestionType);
