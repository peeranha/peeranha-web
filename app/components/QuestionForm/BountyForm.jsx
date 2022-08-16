import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import {
  valueHasToBeLessThan,
  bountyCannotBeLessThenPrev,
} from 'components/FormFields/validate';

import NumberInputField from '../FormFields/NumberInputField';

import { FORM_BOUNTY, FORM_COMMUNITY } from './constants';

const BountyContainer = styled.div`
  margin-top: 20px;
`;

const BountyForm = ({ questionLoading, formValues }) => {
  const { t } = useTranslation();
  const bountyDisabled = useMemo(
    () => questionLoading || !formValues?.[FORM_COMMUNITY]?.value,
    [formValues, questionLoading],
  );

  return (
    <BountyContainer>
      <Field
        name={FORM_BOUNTY}
        label={t('common.bountyLabel')}
        tip={t('common.bountyTip')}
        placeholder="0"
        dotRestriction={0}
        component={NumberInputField}
        disabled={bountyDisabled}
        validate={[valueHasToBeLessThan, bountyCannotBeLessThenPrev]}
        warn={[valueHasToBeLessThan, bountyCannotBeLessThenPrev]}
        splitInHalf
      />
    </BountyContainer>
  );
};

BountyForm.propTypes = {
  questionLoading: PropTypes.bool,
  formValues: PropTypes.object,
};

export default memo(BountyForm);
