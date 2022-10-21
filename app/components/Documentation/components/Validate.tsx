import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import validationArrowIcon from 'images/validationArrow.svg?inline';
import cn from 'classnames';

type ValidateProps = {
  children: (props: {
    onChange: (data?: any) => void;
    onBlur: () => void;
    isValid: boolean;
  }) => React.ReactNode;
  validate: Array<any>;
  value: string;
  onChange: (data?: any) => void;
  position?: 'left' | 'bottom';
};

const Validate: React.FC<ValidateProps> = ({
  children,
  validate,
  value,
  onChange,
  position = 'left',
}): JSX.Element => {
  const [errorMessages, setErrorMessages] = useState<
    Array<{ id: string; min?: number; max?: number }>
  >([]);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isBlur, setIsBlur] = useState<boolean>(false);

  const onBlur = () => {
    setIsBlur(true);
  };

  useEffect(() => {
    const errors: Array<{ id: string; min?: number; max?: number }> = [];

    validate.forEach((validateFunc: any) => {
      const error = validateFunc(value);

      if (error) {
        errors.push(error);
      }
    });

    if (isBlur && errors.length > 0) {
      setIsValid(false);
      setErrorMessages(errors);
    } else {
      setIsValid(true);
      setErrorMessages([]);
    }
  }, [value, validate, isBlur]);

  return (
    <div className={cn({ df: position === 'left' })}>
      {children({ isValid, onChange, onBlur })}
      {!isValid && (
        <div
          className="df aic fz14"
          css={{
            ...(position === 'left' && { paddingLeft: 30 }),
            ...(position === 'bottom' && { paddingTop: 8 }),
            color: '#7b7b7b',
            fontStyle: 'italic',
          }}
        >
          {position === 'left' && (
            <img src={validationArrowIcon} className="mr12" />
          )}
          <FormattedMessage
            id={errorMessages[0].id}
            values={{
              min: errorMessages[0].min,
              max: errorMessages[0].max,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Validate;
