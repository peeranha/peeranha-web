import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BG_LIGHT, BORDER_PRIMARY_LIGHT, TEXT_DARK } from 'style-constants';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'common-messages';
import { translationMessages } from 'i18n';

const Base = styled.div`
  position: absolute;
  background-color: ${BG_LIGHT};
  width: 300px;
  z-index: 100;
  height: 183px;
  left: -245px;
  top: 25px;
  border-radius: 5px;
  box-shadow: 0 0 4px 0 rgba(0,0,0,0.3);}
  padding: 15px;
  word-wrap: break-word;

  span {
    color: ${TEXT_DARK};
  }

  > ul {
    li {
      color: ${TEXT_DARK};
      margin-left: 15px;
    }

    li::before {
      content: "\\2022";
      color: ${BORDER_PRIMARY_LIGHT};
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }
  }
`;

const ExpertPopover = ({ locale }) => (
  <Base>
    <FormattedMessage {...commonMessages.expertPopoverText} />
    <br />
    <br />
    <ul>
      {translationMessages[locale][commonMessages.expertPopover.id].map(x => (
        <>
          <li>
            <span>{x}</span>
          </li>
          <br />
        </>
      ))}
    </ul>
  </Base>
);

ExpertPopover.propTypes = {
  locale: PropTypes.string,
};

export default ExpertPopover;
