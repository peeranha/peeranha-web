import React from 'react';
import { BORDER_PRIMARY, BORDER_RADIUS_S, TEXT_PRIMARY } from 'style-constants';

import styled from 'styled-components';

import closeIcon from 'images/closeCircle.svg?external';

import { Input } from 'components/Input/InputStyled';
import { IconMd } from 'components/Icon/IconWithSizes';
import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

const TagsContainer = styled.ul`
  ${(props) => Input(props)};

  cursor: pointer;
  height: auto !important;
`;

const RemoveTagIcon = styled.button`
  display: inline-flex;
  padding: 0 0 0 10px;
`;

const Tag = styled.li`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: ${colors.tagColor || TEXT_PRIMARY};
  padding: 2px 8px;
  margin: 5px 10px 5px 0;
  border: 1px solid ${colors.tagColor || BORDER_PRIMARY};
  border-radius: ${BORDER_RADIUS_S};
`;

type DropdownTriggerProps = {
  value: Array<string>;
  options: Array<{ id: string }>;
  onClick: Function;
  disabled: boolean;
  error: unknown;
};

const DropdownTrigger: React.FC<DropdownTriggerProps> = ({
  value,
  options,
  onClick,
  disabled,
  error,
}): JSX.Element => (
  <div className="df aic full-width">
    <TagsContainer disabled={disabled} error={error}>
      {value.map((id) => {
        const valueLabel = options?.find(
          (tag: { id: string }) => tag.id === id,
        ).label;
        return (
          <Tag key={valueLabel}>
            <span>{valueLabel}</span>
            <RemoveTagIcon type="button" onClick={(e) => onClick(e, id)}>
              <IconMd
                icon={closeIcon}
                fill={colors.tagColor || BORDER_PRIMARY}
                color={colors.tagColor || BORDER_PRIMARY}
              />
            </RemoveTagIcon>
          </Tag>
        );
      })}
    </TagsContainer>
  </div>
);

export default DropdownTrigger;
