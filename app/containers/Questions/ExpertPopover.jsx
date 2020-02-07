import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import commonMessages from 'common-messages';
import DescriptionList from 'components/DescriptionList';
import { BG_LIGHT, BORDER_PRIMARY_LIGHT, TEXT_DARK } from 'style-constants';

const Base = styled.div`
  position: absolute;
  background-color: ${BG_LIGHT};
  width: 290px;
  z-index: 100;
  height: 170px;
  left: -235px;
  top: 25px;
  border-radius: 5px;
  box-shadow: 0 0 4px 0 rgba(0,0,0,0.3);}
  padding: 15px;

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
    <DescriptionList
      locale={locale}
      label={commonMessages.expertPopoverLabel.id}
      items={commonMessages.expertPopoverList.id}
    />
  </Base>
);

ExpertPopover.propTypes = {
  locale: PropTypes.string,
};

export default ExpertPopover;
