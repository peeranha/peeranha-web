import React, { memo } from 'react';
import { Field } from 'redux-form/immutable';

import { requiredForObjectField } from 'components/FormFields/validate';

import { FORM_SUB_ARTICLE } from './constants';

import messages from './messages';
import SubArticleField from 'components/FormFields/SubArticleField';

type DocumentationSection = {
  id: string;
  title: string;
  children: Array<DocumentationSection>;
};

type SubArticleFormProps = {
  questionLoading: boolean;
  disableCommForm: boolean;
  communities: Array<object>;
  intl: { formatMessage: Function };
  locale: string;
  isDocumentation: boolean;
  documentationMenu: Array<DocumentationSection>;
};

const SubArticleForm: React.FC<SubArticleFormProps> = ({
  intl,
  locale,
  isDocumentation,
  documentationMenu,
}) => {
  const options = documentationMenu.reduce(
    (acc: Array<any>, documentationSection) => {
      return [
        ...acc,
        documentationSection,
        ...(documentationSection.children || []),
      ];
    },
    [],
  );
  return (
    <Field
      className={!isDocumentation ? 'd-none' : ''}
      name={FORM_SUB_ARTICLE}
      component={SubArticleField}
      locale={locale}
      label={intl.formatMessage(messages.rootLabel)}
      options={options.map(doc => ({
        label: doc.title,
        value: Number(doc.id),
      }))}
      validate={[requiredForObjectField]}
      warn={[requiredForObjectField]}
      splitInHalf
    />
  );
};

export default memo(SubArticleForm);
