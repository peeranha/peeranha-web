import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import {
  required,
  number1x168,
  hoursCannotBeLessThenPrev,
} from 'components/FormFields/validate';

import NumberInputField from 'components/FormFields/NumberInputField';

import { FORM_BOUNTY, FORM_BOUNTY_HOURS, FORM_COMMUNITY } from './constants';

const BountyContainer = styled.div`
  margin-top: 20px;
`;

const BountyDateForm = ({ questionLoading, formValues }) => {
  const { t } = useTranslation();
  const bountyDisabled = useMemo(
    () => questionLoading || !formValues?.[FORM_COMMUNITY]?.value,
    [formValues, questionLoading],
  );
  const bountyValue = formValues[FORM_BOUNTY];
  const show = !!bountyValue && Number(bountyValue) > 0;
  return show ? (
    <BountyContainer>
      <Field
        name={FORM_BOUNTY_HOURS}
        label={t('common.bountyHoursLabel')}
        tip={t('common.bountyHoursTip')}
        placeholder={t('common.hoursPlaceholder')}
        component={NumberInputField}
        dotRestriction={0}
        disabled={bountyDisabled}
        validate={[required, number1x168, hoursCannotBeLessThenPrev]}
        warn={[required, number1x168, hoursCannotBeLessThenPrev]}
        splitInHalf
      />
    </BountyContainer>
  ) : null;
};

BountyDateForm.propTypes = {
  questionLoading: PropTypes.bool,
  formValues: PropTypes.object,
};

export default memo(BountyDateForm);
