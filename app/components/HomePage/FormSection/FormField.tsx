import React, { useState } from 'react';
import useTrigger from 'hooks/useTrigger';
import { WarningMessage } from 'components/FormFields/WarningMessage';
import { styles } from './FormSection.styled';

type FormFieldProps = {
  input: any;
  label: any;
  disabled: boolean;
  meta: any;
};

const FormField: React.FC<FormFieldProps> = ({
  input,
  label,
  disabled,
  meta,
}): JSX.Element => {
  const [isShow, showTip, hideTip] = useTrigger(true);

  return (
    <div className="mb16" css={styles.field} onFocus={hideTip} onBlur={showTip}>
      <div className="pr full-width df fdc jcc">
        <input
          {...input}
          type="text"
          disabled={disabled}
          className="full-width pl16"
          css={styles.input}
        />
        {isShow && !input.value && (
          <div className="pa fz16" css={styles.label}>
            {label}
          </div>
        )}
      </div>
      <div>
        <WarningMessage {...meta} className="fz12" css={styles.warning} />
      </div>
    </div>
  );
};

export default FormField;
