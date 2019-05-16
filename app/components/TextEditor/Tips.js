import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import * as routes from 'routes-config';

import {
  BG_SECONDARY_LIGHT,
  BORDER_SECONDARY,
  TEXT_PRIMARY,
  BG_PRIMARY,
} from 'style-constants';

import A from 'components/A';
import Base from 'components/Base';
import Label from 'components/FormFields/Label';

import messages from './messages';

const BaseStyled = Base.extend`
  background: ${BG_SECONDARY_LIGHT}50;
  word-break: break-word;
  height: 100%;
`;

const AStyled = A.extend`
  color: ${TEXT_PRIMARY};
  font-size: 14px;
  margin-bottom: 10px;
  display: inline-block;
`;

const Ul = styled.ul`
  border-bottom: 1px solid ${BORDER_SECONDARY}75;
  padding-bottom: 20px;
  margin-bottom: 20px;

  li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 14px;

    :before {
      content: '';
      flex-basis: 5px;
      height: 5px;
      border-radius: 50%;
      background: ${BG_PRIMARY};
      margin-right: 10px;
      display: inline-flex;
    }

    span {
      flex: 1;
    }
  }
`;

const Tips = /* istanbul ignore next */ ({ className }) => (
  <div className={className}>
    <BaseStyled>
      <Label className="mb-3">
        <FormattedMessage {...messages.tips} />:
      </Label>
      <Ul>
        <li>
          <FormattedMessage {...messages.putReturnsBetweenParagraphs} />
        </li>
        <li>
          <FormattedMessage {...messages.addForLineBreaks} />
        </li>
        <li>
          <FormattedMessage {...messages.italicAndBold} />
        </li>
        <li>
          <FormattedMessage {...messages.indentCode} />
        </li>
        <li>
          <FormattedMessage {...messages.backtipEscapes} />
        </li>
        <li>
          <FormattedMessage {...messages.quoteByPlacing} />
        </li>
      </Ul>
      <ul>
        <li>
          <AStyled to={routes.faq()} href={routes.faq()}>
            <FormattedMessage {...messages.howToAsk} />
          </AStyled>
        </li>
        <li>
          <AStyled to={routes.faq()} href={routes.faq()}>
            <FormattedMessage {...messages.howToFormat} />
          </AStyled>
        </li>
        <li>
          <AStyled to={routes.faq()} href={routes.faq()}>
            <FormattedMessage {...messages.howToTag} />
          </AStyled>
        </li>
      </ul>
    </BaseStyled>
  </div>
);

Tips.propTypes = {
  className: PropTypes.string,
};

export { BaseStyled, AStyled, Ul };
export default React.memo(Tips);
