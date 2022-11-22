/* eslint no-param-reassign: 0 */
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import arrowDownIcon from 'images/arrowDown.svg?inline';
import { Input } from 'components/Input/InputStyled';
import Span from 'components/Span';

import Wrapper from './Wrapper';
import Dropdown, { MenuStyled } from 'components/Dropdown/AllowedClickInside';
import { Select2 } from 'components/FormFields/SelectField';
import { translationMessages } from '../../i18n';
import messages from 'common-messages';
import { css } from '@emotion/react';

const Div = styled.div`
  position: relative;

  ${(props) => Input(props)};

  img[alt='icon'] {
    transition: 0.5s;
    -webkit-transition: 0.5s;
    position: absolute;
    right: 0;
  }
`;

type SubArticleFormProps = {
  input: { value: { toJS: Function }; name: string; onChange: Function };
  locale: string;
  meta: object;
  label: string;
  className: string;
  tip: string;
  disabled: boolean;
  splitInHalf: boolean;
  options: Array<object>;
};

export const SubArticleField: React.FC<SubArticleFormProps> = ({
  input,
  locale,
  meta,
  label,
  tip,
  splitInHalf,
  disabled,
  className,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  if (input) {
    input.value = input.value.toJS ? input.value.toJS() : input.value;
  }

  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [disabled, isOpen]);

  const onSelectChange = useCallback(
    (x: { value: any }) => {
      toggleOpen();
      //
      if (input.onChange) {
        input.onChange(x);
      }
    },
    [toggleOpen, input],
  );

  const Button = ({ title }: { title: string }) => (
    <Div
      className="df aic"
      error={meta.touched && (meta.error || meta.warning)}
      disabled={disabled}
    >
      <Span>{title}</Span>
      <img
        css={css`
          transform: rotate(${isOpen ? '180deg' : '0deg'});
          transition: 0.5s;
        `}
        className="mr-2"
        src={arrowDownIcon}
        alt="icon"
      />
    </Div>
  );

  return (
    <Wrapper
      className={className}
      label={label}
      tip={tip}
      meta={meta}
      splitInHalf={splitInHalf}
      id={input.title}
    >
      <Dropdown
        isOpen={isOpen}
        toggle={toggleOpen}
        target={<Button title={input.value?.label} />}
      >
        <Wrapper>
          <Select2
            input={{
              ...input,
              optionsNumber: 2,
              selectedValue: options.find(
                (option) => input.value?.id === option.id,
              ),
              onChange: onSelectChange,
              onBlur: null,
              value: null,
            }}
            options={options}
            disabled={disabled}
            autoFocus
            menuIsOpen
            isWrapped
            placeholder={
              translationMessages[locale][messages.selectCommunity.id]
            }
          />
        </Wrapper>
      </Dropdown>
    </Wrapper>
  );
};

export default SubArticleField;
