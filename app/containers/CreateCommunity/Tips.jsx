import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import commonMessages from 'common-messages';

import Label from 'components/FormFields/Label';
import { BaseStyled, Li, Ul } from 'components/TextEditor/Tips';

import messages from './messages';

export const Tips = /* istanbul ignore next */ ({ faqQuestions }) => (
  <BaseStyled>
    <Label className="mb-3">
      <FormattedMessage {...commonMessages.tips} />
    </Label>
    <Ul>
      <li>
        <FormattedMessage {...messages.imageWillBeTheFace} />
      </li>
      <li>
        <FormattedMessage {...messages.specifyMemorableTitle} />
      </li>
      <li>
        <FormattedMessage {...messages.communityDescriptionShouldBe} />
      </li>
      <li>
        <FormattedMessage {...messages.writeWhyDoWeeNeed} />
      </li>
    </Ul>

    {faqQuestions && <ul>{faqQuestions.map(x => <Li>{x}</Li>)}</ul>}
  </BaseStyled>
);

Tips.propTypes = {
  faqQuestions: PropTypes.array,
};

export default React.memo(Tips);
