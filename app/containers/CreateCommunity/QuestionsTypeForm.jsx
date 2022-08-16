import React, { memo, useCallback, useMemo } from 'react';
import { Field } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import QuestionTypeField from './QuestionsTypeField';
import DescriptionList from '../../components/DescriptionList';
import { ANY_TYPE, EXPERT_TYPE, FORM_TYPE, GENERAL_TYPE } from './constants';

const QuestionsTypeForm = ({ change, locale, formValues }) => {
  const { t } = useTranslation();
  const onChange = useCallback(val => change(FORM_TYPE, val[0]), []);
  const [descriptionListLabel, descriptionListItems] = useMemo(
    () => {
      let label;
      let items;
      switch (+formValues[FORM_TYPE]) {
        case ANY_TYPE:
          label = 'createCommunity.anyQuestionDescriptionLabel';
          items = 'createCommunity.anyQuestionDescriptionList';
          break;
        case GENERAL_TYPE:
          label = 'common.generalQuestionDescriptionLabel';
          items = 'common.generalQuestionDescriptionList';
          break;
        case EXPERT_TYPE:
          label = 'common.expertQuestionDescriptionLabel';
          items = 'common.expertQuestionDescriptionList';
          break;
        default:
          label = 'createCommunity.anyQuestionDescriptionLabel';
          items = 'createCommunity.anyQuestionDescriptionList';
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
        label={t('createCommunity.questionsType')}
        tip={t('createCommunity.questionsTypeTip')}
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
  locale: PropTypes.string,
  formValues: PropTypes.object,
};

export default memo(QuestionsTypeForm);
