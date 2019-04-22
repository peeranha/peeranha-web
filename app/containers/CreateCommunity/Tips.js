import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import * as routes from 'routes-config';

import commonMessages from 'common-messages';

import Label from 'components/FormFields/Label';
import { BaseStyled, AStyled, Ul } from 'components/TextEditor/Tips';

import messages from './messages';

const Tips = ({ className }) => (
  <div className={className}>
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
  </div>
);

Tips.propTypes = {
  className: PropTypes.string,
};

export default React.memo(Tips);
