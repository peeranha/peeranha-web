import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form/immutable";
import { intlShape } from "react-intl";
import styled from "styled-components";

import { FORM_TYPE } from "./constants";
import messages from "./messages";
import QuestionTypeField from "./QuestionTypeField";
import DescriptionList from "../DescriptionList";
import { PEER_WARNING_COLOR } from "style-constants";

const Warning = styled.h1`
  color: ${PEER_WARNING_COLOR};
`;

const TypeForm = ({
  intl,
  change,
  locale,
  questionLoading,
  formValues,
  isType,
  setIsType,
  isError,
  setIsError,
}) => {
  const onChange = useCallback((val) => change(null, val[0]), []);

  const labelConditional = (n) => {
    if (n === "1") return messages.generalQuestionDescriptionLabel.id;
    if (n === "0") return messages.expertQuestionDescriptionLabel.id;
    if (n === "2") return messages.tutorialQuestionDescriptionLabel.id;
  };

  const listConditional = (n) => {
    if (n === "1") return messages.generalQuestionDescriptionList.id;
    if (n === "0") return messages.expertQuestionDescriptionList.id;
    if (n === "2") return messages.tutorialQuestionDescriptionList.id;
  };

  const [descriptionListLabel, descriptionListItems] = useMemo(
    () => [
      labelConditional(formValues[FORM_TYPE]),
      listConditional(formValues[FORM_TYPE]),
    ],
    [locale, formValues]
  );

  useEffect(() => {
    if (descriptionListLabel && descriptionListItems) {
      setIsType(true);
      setIsError(false);
    }
  }, [descriptionListLabel, descriptionListItems, isError]);

  return (
    <>
      <Field
        name={FORM_TYPE}
        component={QuestionTypeField}
        disabled={questionLoading}
        onChange={onChange}
        label={intl.formatMessage(messages.questionType)}
        tip={intl.formatMessage(messages.questionTypeTip)}
        splitInHalf
      />
      {isType && (
        <DescriptionList
          locale={locale}
          label={descriptionListLabel}
          items={descriptionListItems}
        />
      )}
      {isError && <Warning>You need to select post type</Warning>}
      <br />
    </>
  );
};

TypeForm.propTypes = {
  change: PropTypes.func,
  questionLoading: PropTypes.bool,
  communities: PropTypes.array,
  intl: intlShape.isRequired,
  locale: PropTypes.string,
  formValues: PropTypes.object,
};

export default memo(TypeForm);
