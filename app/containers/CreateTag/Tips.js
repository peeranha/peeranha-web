import React from 'react';
import { FormattedMessage } from 'react-intl';
import * as routes from 'routes-config';

import commonMessages from 'common-messages';

import Label from 'components/FormFields/Label';
import { BaseStyled, AStyled, Ul } from 'components/TextEditor/Tips';

import messages from './messages';

export const Tips = () => (
  <BaseStyled>
    <Label className="mb-3">
      <FormattedMessage {...commonMessages.tips} />
    </Label>

    <Ul>
      <li>
        <FormattedMessage {...messages.tagIsKeyword} />
      </li>
      <li>
        <FormattedMessage {...messages.usingTheRightTags} />
      </li>
    </Ul>

    <ul>
      <li>
        <AStyled to={routes.faq()} href={routes.faq()}>
          <FormattedMessage {...messages.whatIsTag} />
        </AStyled>
      </li>
      <li>
        <AStyled to={routes.faq()} href={routes.faq()}>
          <FormattedMessage {...messages.howToUseIt} />
        </AStyled>
      </li>
    </ul>
  </BaseStyled>
);

export default React.memo(Tips);
