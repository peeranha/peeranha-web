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
    <ul>
      <li>
        <AStyled to={routes.faq()} href={routes.faq()}>
          <FormattedMessage {...messages.whatIsCommunity} />
        </AStyled>
      </li>
      <li>
        <AStyled to={routes.faq()} href={routes.faq()}>
          <FormattedMessage {...messages.whoManagesCommunities} />
        </AStyled>
      </li>
    </ul>
  </BaseStyled>
);

export default React.memo(Tips);
