import React from 'react';

import styled from 'styled-components';

import { useTranslation } from 'react-i18next';

import { BORDER_PRIMARY_LIGHT, TEXT_DARK } from 'style-constants';
import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

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
      color: ${colors.textColor || BORDER_PRIMARY_LIGHT};
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }
  }
`;

type DescriptionListProps = {
  label: string;
  items?: string;
};

export const DescriptionList: React.FC<DescriptionListProps> = ({
  label,
  items,
}): JSX.Element | null => {
  const { t } = useTranslation();

  if (!items) {
    return null;
  }

  return (
    <Base>
      {t(label)}
      <ul>
        {t(items, { returnObjects: true }).map((item) => (
          <li key={item}>
            <span>{t(item)}</span>
          </li>
        ))}
      </ul>
    </Base>
  );
};

export default DescriptionList;
