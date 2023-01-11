import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { Field } from 'redux-form/immutable';
import { requiredPostTypeSelection } from 'components/FormFields/validate';
import { FORM_TYPE } from './constants';
import messages from './messages';
import QuestionTypeField from './QuestionTypeField';
import DescriptionList from 'components/DescriptionList';
import {
  labelConditional,
  listConditional,
} from 'components/QuestionForm/utils';

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
  intl: any;
  change: Function;
  locale: string;
  questionLoading: boolean;
  formValues?: any;
  hasSelectedType: boolean;
  setHasSelectedType: Function;
  isError: boolean;
  setIsError: Function;
  isCommunityModerator: boolean;
  postType?: number;
  isDocumentation: boolean;
  postAnswers?: Array<TypePostAnswers>;
  isHasRole: boolean;
};

const TypeForm: React.FC<TypeFormProps> = ({
  intl,
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
  const onChange = useCallback((val: any[]) => change(FORM_TYPE, val[0]), []);

  const [descriptionListLabel, descriptionListItems] = useMemo(
    () => [
      labelConditional(formValues[FORM_TYPE] || String(postType)),
      listConditional(formValues[FORM_TYPE] || String(postType)),
    ],
    [formValues[FORM_TYPE]],
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
        label={intl.formatMessage(messages.questionType)}
        tip={intl.formatMessage(messages.questionTypeTip)}
        validate={!hasSelectedType && requiredPostTypeSelection}
        splitInHalf
        error={isError}
        isCommunityModerator={isCommunityModerator}
        postType={postType}
        postAnswers={postAnswers}
        locale={locale}
        isHasRole={isHasRole}
      />
      {hasSelectedType && (
        <DescriptionList
          locale={locale}
          label={descriptionListLabel}
          items={descriptionListItems}
        />
      )}
      <br />
    </div>
  );
};

export default memo(TypeForm);
