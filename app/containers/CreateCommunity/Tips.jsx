import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import commonMessages from 'common-messages';

import Label from 'components/FormFields/Label';
import { Li, Ul } from 'components/TextEditor/Tips';

import messages from './messages';

export const Tips = ({ faqQuestions }) => (
  <div>
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

    {faqQuestions && (
      <ul>{faqQuestions.map(x => <Li key={x.props.children}>{x}</Li>)}</ul>
    )}
  </div>
);

Tips.propTypes = {
  faqQuestions: PropTypes.array,
};

export default React.memo(Tips);
