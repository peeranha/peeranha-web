import React, { memo, useCallback, useMemo } from 'react';
import { ANY_TYPE, EXPERT_TYPE, FORM_TYPE, GENERAL_TYPE } from './constants';
import messages from './messages';
import { Field } from 'redux-form/immutable';
import QuestionTypeField from './QuestionsTypeField';
import DescriptionList from '../../components/DescriptionList';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';

const QuestionsTypeForm = ({
  change,
  locale,
  formValues,
  intl,
  initialValue = 0,
}) => {
  const onChange = useCallback(val => {
    return change(FORM_TYPE, val[0]);
  }, []);
  const [descriptionListLabel, descriptionListItems] = useMemo(
    () => {
      let label;
      let items;
      switch (+formValues[FORM_TYPE]) {
        case ANY_TYPE:
          label = messages.anyQuestionDescriptionLabel.id;
          items = messages.anyQuestionDescriptionList.id;
          break;
        case GENERAL_TYPE:
          label = messages.generalQuestionDescriptionLabel.id;
          items = messages.generalQuestionDescriptionList.id;
          break;
        case EXPERT_TYPE:
          label = messages.expertQuestionDescriptionLabel.id;
          items = messages.expertQuestionDescriptionList.id;
          break;
        default:
          label = messages.anyQuestionDescriptionLabel.id;
          items = messages.anyQuestionDescriptionList.id;
          break;
      }
      return [label, items];
    },
    [formValues],
  );
  return (
    <>
      <Field
        name={FORM_TYPE}
        component={QuestionTypeField}
        disabled={false}
        onChange={onChange}
        label={intl.formatMessage(messages.questionsType)}
        tip={intl.formatMessage(messages.questionsTypeTip)}
        splitInHalf
      />

      <DescriptionList
        locale={locale}
        label={descriptionListLabel}
        items={descriptionListItems}
      />
      <br />
    </>
  );
};

QuestionsTypeForm.propTypes = {
  change: PropTypes.func,
  questionLoading: PropTypes.bool,
  communities: PropTypes.array,
  intl: intlShape.isRequired,
  locale: PropTypes.string,
  formValues: PropTypes.object,
};

export default memo(QuestionsTypeForm);
