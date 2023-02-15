import React, { memo } from 'react';
import { Field } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';

import { DocumentationSection } from 'pages/Documentation/types';
import SubArticleField from 'components/FormFields/SubArticleField';

import { requiredForObjectField } from 'components/FormFields/validate';

import { FORM_SUB_ARTICLE } from './constants';

type SubArticleFormProps = {
  questionLoading: boolean;
  disableCommForm: boolean;
  communities: Array<object>;
  locale: string;
  isDocumentation: boolean;
  documentationMenu: Array<DocumentationSection>;
};

const SubArticleForm: React.FC<SubArticleFormProps> = ({
  locale,
  isDocumentation,
  documentationMenu,
}) => {
  const { t } = useTranslation();

  return (
    <Field
      className={!isDocumentation ? 'd-none' : ''}
      name={FORM_SUB_ARTICLE}
      component={SubArticleField}
      locale={locale}
      label={t('post.rootLabel')}
      options={documentationMenu.map((documentationSection) => ({
        label: documentationSection.title,
        value: Number(documentationSection.id),
      }))}
      validate={[requiredForObjectField]}
      warn={[requiredForObjectField]}
      splitInHalf
    />
  );
};

export default memo(SubArticleForm);
