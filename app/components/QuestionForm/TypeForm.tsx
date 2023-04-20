import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { Field } from 'redux-form/immutable';
import { requiredPostTypeSelection } from 'components/FormFields/validate';
import { FORM_TYPE } from './constants';
import { useTranslation } from 'react-i18next';
import QuestionTypeField from './QuestionTypeField';
import DescriptionList from 'components/DescriptionList';
import { labelConditional, listConditional } from 'components/QuestionForm/utils';

type TypePostAnswers = {
  author: string;
  commentCount: number;
  comments?: Array<{
    author: string;
    id: number;
    isDeleted: boolean;
    postTime: number;
    content: string;
    ipfsHash: string;
    propertyCount: number;
    rating: number;
    voitingStatus: {
      isDownVoted: boolean;
      isUpVoted: boolean;
      isVotedToDelete: boolean;
    };
  }>;
  content: string;
  id: number;
  ipfsHash: string;
  isDeleted: boolean;
  isFirstReply: boolean;
  isQuickReply: boolean;
  parentReplyId: number;
  postTime: number;
  propertyCount: number;
  rating: number;
  voitingStatus: {
    isDownVoted: boolean;
    isUpVoted: boolean;
    isVotedToDelete: boolean;
  };
};

type TypeFormProps = {
  change: any;
  locale: string;
  questionLoading: boolean;
  formValues?: any;
  hasSelectedType: boolean;
  setHasSelectedType: any;
  isError: boolean;
  setIsError: any;
  isCommunityModerator: boolean;
  postType?: number;
  isDocumentation: boolean;
  postAnswers?: Array<TypePostAnswers>;
  isHasRole: boolean;
};

const TypeForm: React.FC<TypeFormProps> = ({
  change,
  locale,
  questionLoading,
  formValues,
  hasSelectedType,
  setHasSelectedType,
  isError,
  setIsError,
  isCommunityModerator,
  postType,
  isDocumentation,
  postAnswers,
  isHasRole,
}): JSX.Element | null => {
  const { t } = useTranslation();
  const onChange = useCallback((val: any[]) => change(FORM_TYPE, val[0]), []);
  const formValueId = formValues[FORM_TYPE];
  const isHasPostId = formValueId !== undefined || postType !== undefined;

  const [descriptionListLabel, descriptionListItems] = useMemo(
    () => [
      isHasPostId ? labelConditional(formValueId || String(postType)) : null,
      isHasPostId ? listConditional(formValueId || String(postType)) : null,
    ],
    [formValueId],
  );

  useEffect(() => {
    if ((descriptionListLabel && descriptionListItems) || postType) {
      setHasSelectedType(true);
      setIsError(false);
    }
  }, [descriptionListLabel, descriptionListItems]);

  return (
    <div className={isDocumentation ? 'd-none' : ''}>
      <Field
        name={FORM_TYPE}
        component={QuestionTypeField}
        disabled={questionLoading}
        onChange={onChange}
        label={t('common.questionType')}
        tip={t('common.questionTypeTip')}
        validate={hasSelectedType ? undefined : requiredPostTypeSelection}
        splitInHalf
        error={isError}
        isCommunityModerator={isCommunityModerator}
        postType={postType}
        postAnswers={postAnswers}
        locale={locale}
        isHasRole={isHasRole}
      />
      {hasSelectedType && (
        <DescriptionList label={descriptionListLabel} items={descriptionListItems} />
      )}
      <br />
    </div>
  );
};

export default memo(TypeForm);
