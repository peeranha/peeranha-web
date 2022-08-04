import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { translationMessages } from 'i18n';
import { useTranslation } from 'react-i18next';

import { BORDER_PRIMARY_LIGHT, TEXT_DARK } from 'style-constants';

const Base = styled.div`
  span {
    color: ${TEXT_DARK};
  }

  > ul {
    margin-top: 15px;

    li {
      color: ${TEXT_DARK};
      margin-left: 25px;

      :not(:last-child) {
        margin-bottom: 7px;
      }
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

export const DescriptionList = ({ label, items }) => {
  const { t } = useTranslation();

  return (
    <Base>
      {t(label)}
      <ul>
        {t(items, { returnObjects: true }).map(item => (
          <li key={item}>
            <span>{t(item)}</span>
          </li>
        ))}
      </ul>
    </Base>
  );
};

DescriptionList.propTypes = {
  label: PropTypes.string,
  locale: PropTypes.string,
  items: PropTypes.string,
};

export default React.memo(DescriptionList);
