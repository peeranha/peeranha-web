import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import arrowDownIcon from 'images/arrowDown.svg?inline';
import polygonLogo from 'app/images/polygonLogo.png?inline';
import edgewareLogo from 'app/images/edgewareLogo.png?inline';

import { Select2 } from 'components/FormFields/SelectField';
import Dropdown from 'components/Dropdown/AllowedClickInside';
import Wrapper from 'components/FormFields/Wrapper';
import { Input } from 'components/Input/InputStyled';
import Img from 'components/Img';
import Span from 'components/Span';
import { css } from '@emotion/react';
import CustomOption from 'components/CommunitySelector/CustomOption';
import Group from 'components/CommunitySelector/Group';
import { styles } from './BlockchainSelector.styled';

const Div = styled.div`
  position: relative;

  ${(props) => Input(props)};

  img[alt='icon'] {
    position: absolute;
    right: 0;
  }
`;

type IconComponentProps = {
  input: {
    value: {
      value: number;
      avatar: string;
      label: string;
      toJS: () => any;
    };
    name: string;
    type: string;
    id?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  meta: {
    active: boolean;
    asyncValidating: boolean;
    autofilled: boolean;
    dirty: boolean;
    dispatch: () => void;
    error: undefined | string;
    form: string;
    initial: undefined;
    invalid: boolean;
    pristine: boolean;
    submitFailed: boolean;
    submitting: boolean;
    touched: boolean;
    valid: boolean;
    visited: boolean;
    warning: undefined | string;
  };
  label: string;
  tip: string;
  disabled: boolean;
  splitInHalf: boolean;
  warningStyle: string;
  insideOfSection: boolean;
};

const chainsList = [
  {
    value: 1,
    id: 1,
    label: 'Polygon blockchain',
    avatar: polygonLogo,
  },
  { value: 2, id: 2, label: 'Edgeware blockchain', avatar: edgewareLogo },
];

export const BlockchainSelector: React.FC<IconComponentProps> = ({
  input,
  meta,
  label,
  tip,
  disabled,
  splitInHalf,
  warningStyle,
  insideOfSection,
}) => {
  if (input) {
    input.value = input.value.toJS ? input.value.toJS() : input.value;
  }
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const onSelectChange = useCallback(
    (x: any) => {
      toggleOpen();
      if (input.onChange) {
        input.onChange(x);
      }
    },
    [toggleOpen, input],
  );
  const blockchainIcon = input.value.avatar;
  return (
    <Wrapper
      label={label}
      tip={tip}
      meta={meta}
      splitInHalf={splitInHalf}
      disabled={disabled}
      id={input.name}
      insideOfSection={insideOfSection}
      warningStyle={warningStyle}
    >
      <Dropdown
        isOpen={isOpen}
        toggle={toggleOpen}
        target={
          <Div
            css={styles.container}
            error={meta.visited && (meta.error || meta.warning)}
            disabled={disabled}
          >
            {blockchainIcon && <Img src={blockchainIcon} alt="comm_img" />}
            <Span>{input.value.label}</Span>
            <img
              css={css`
                transform: rotate(${isOpen ? '180deg' : '0deg'});
                transition: 0.5s;
              `}
              src={arrowDownIcon}
              alt="icon"
            />
          </Div>
        }
      >
        <div className="pb4">
          <Select2
            input={{
              ...input,
              optionsNumber: 2,
              selectedValue: chainsList.find((chain) => chain.value === input.value.value),
              onChange: onSelectChange,
              onBlur: null,
              value: null,
            }}
            options={[{ options: chainsList }]}
            disabled={disabled}
            Group={Group}
            CustomOption={CustomOption}
            autoFocus
            menuIsOpen
            isWrapped
          />
        </div>
      </Dropdown>
    </Wrapper>
  );
};

export default BlockchainSelector;
