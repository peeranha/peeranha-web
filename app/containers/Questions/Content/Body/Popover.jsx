import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DescriptionList from 'components/DescriptionList';
import { BG_LIGHT, BORDER_PRIMARY_LIGHT, TEXT_DARK } from 'style-constants';
import { useTranslation } from 'react-i18next';

const Base = styled.div`
  position: absolute;
  background-color: ${BG_LIGHT};
  width: 290px;
  z-index: 100;
  left: -235px;
  top: 25px;
  border-radius: 5px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
  padding: 15px;
  text-align: left;

  span {
    color: ${TEXT_DARK};
  }

  strong {
    display: inline-block;
    margin-bottom: 10px;
  }

  > ul {
    li {
      color: ${TEXT_DARK};
      margin-left: 15px;
    }

    li::before {
      content: '\\2022';
      color: ${BORDER_PRIMARY_LIGHT};
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }
  }
`;

const Popover = ({ title, label, items }) => {
  const { t } = useTranslation();

  return (
    <Base>
      <strong>{t(title)}</strong>
      <DescriptionList label={label} items={items} />
    </Base>
  );
};

Popover.propTypes = {
  locale: PropTypes.string,
  title: PropTypes.string,
  label: PropTypes.string,
  items: PropTypes.string,
};

export default memo(Popover);
