import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Dropdown from 'common-components/Dropdown';
import Button from 'common-components/Button';
import TextEditor from 'components/TextEditor';
import DropdownTrigger from './DropdownTrigger';
import LoaderDocumentation from './Loader';
import Validate from './Validate';
import { saveText, getBytes32FromIpfsHash } from 'utils/ipfs';
import { saveDraft, initMenu, addArticle, updateMenuDraft, saveDraftsIds } from '../helpers';
import { strLength3x100, required, strLength25x30000 } from 'components/FormFields/validate';
import { DocumentationFormProps } from '../types';
import { DocumentationItemMenuType } from 'pages/Documentation/types';
import { singleCommunityDocumentation } from 'utils/communityManagement';
import { styled } from 'components/Documentation/EditDocumentation.styled';

const documentationColors = singleCommunityDocumentation();

const DocumentationForm: React.FC<DocumentationFormProps> = ({
  documentationMenu,
  documentationArticle,
  articleParentId,
  updateDocumentationMenuDraft,
  setViewArticle,
  setEditArticle,
  isEditArticle,
  updateDraftsIds,
  setSaveToDraft,
}): JSX.Element => {
  const { t } = useTranslation();
  const [title, setTitle] = useState<string>('');
  const [bodyText, setBodyText] = useState<string>('');
  const [parentId, setParentId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isValidTitle, setIsValidTitle] = useState<boolean>(false);
  const [isValidContent, setIsValidContent] = useState<boolean>(false);

  useEffect(() => {
    if (
      typeof documentationArticle !== 'undefined' &&
      Object.keys(documentationArticle).length > 0
    ) {
      setIsLoading(true);
      setParentId(articleParentId);
      setBodyText(documentationArticle.content);
      setTitle(documentationArticle.title);
      setIsLoading(false);
    } else {
      setBodyText('');
      setTitle('');
      setParentId(articleParentId);
    }
  }, [documentationArticle, articleParentId]);

  const options = initMenu(documentationMenu);

  const onSelect = (value: string) => {
    setParentId(value);
  };

  const onChangeTitle = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(value);
  };

  const onChangeBody = (value: string) => {
    setBodyText(value);
  };

  const onClickSaveDraft = async () => {
    if (!isValidTitle || !isValidContent) {
      return;
    }

    setIsLoading(true);

    return saveText(JSON.stringify({ title, content: bodyText }))
      .then((ipfsHash) => {
        const ipfsHashBytes32 = getBytes32FromIpfsHash(ipfsHash);
        const isEdit =
          typeof documentationArticle !== 'undefined' && documentationArticle.id !== '';
        let updatedMenu: Array<DocumentationItemMenuType> = [];

        if (!documentationArticle) {
          updatedMenu = addArticle(documentationMenu, {
            id: ipfsHashBytes32,
            parentId,
            title,
          });
        }

        if (isEdit) {
          updatedMenu = updateMenuDraft(documentationMenu, {
            id: ipfsHashBytes32,
            parentId,
            title,
            prevId: documentationArticle?.id,
          });
        }

        saveDraft(updatedMenu);
        const updatedDraftsIds = saveDraftsIds(ipfsHashBytes32);

        updateDraftsIds(updatedDraftsIds);
        updateDocumentationMenuDraft(updatedMenu);
        setEditArticle({
          id: ipfsHashBytes32,
          parentId: '',
          isEditArticle: false,
        });
        setViewArticle(ipfsHashBytes32);
        return updatedMenu;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setSaveToDraft(() => onClickSaveDraft);
  }, [title, bodyText]);

  const onClickCancel = () => {
    setEditArticle({
      id: '',
      parentId: '',
      isEditArticle: false,
    });
  };

  return isLoading ? (
    <LoaderDocumentation />
  ) : (
    <div className="p32">
      <div
        className="mb24"
        css={{
          fontWeight: 700,
          fontSize: 24,
          lineHeight: '30px',
        }}
      >
        {t('common.enteringData')}
      </div>
      <div className="dg" css={{ gridRowGap: '16px' }}>
        <div>
          <div
            className="mb12"
            css={{
              fontWeight: 700,
              fontSize: 16,
              lineHeight: '20px',
            }}
          >
            {t('common.subArticleOf')}
          </div>
          <Dropdown
            trigger={
              <DropdownTrigger
                value={parentId}
                options={options}
                placeholder="Select parent directory"
              />
            }
            options={options}
            isMultiple={false}
            isEqualWidth={false}
            value={parentId}
            onSelect={onSelect}
            isDisabled={isEditArticle}
          />
        </div>
        <div>
          <div
            className="mb12"
            css={{
              fontWeight: 700,
              fontSize: 16,
              lineHeight: '20px',
            }}
          >
            {t('common.titleLabel')}
          </div>
          <Validate validate={[strLength3x100, required]} value={title} onChange={onChangeTitle}>
            {({ onChange, onBlur, isValid }) => {
              setIsValidTitle(title.length > 2);

              return (
                <input
                  type="text"
                  css={{
                    height: 40,
                    width: 328,
                    border: '1px solid #C2C6D8',
                    borderRadius: '3px',
                    padding: '10px 16px',
                    fontSize: 16,
                    lineHeight: '20px',
                    outline: 0,

                    '&:placeholder': {
                      color: '#7B7B7B',
                    },

                    ...(!isValid && {
                      border: '1px solid rgb(252,102,85)',
                      boxShadow: '0 0 0 3px rgb(252 102 85 / 40%)',
                    }),
                  }}
                  placeholder={t('common.titleLabel')}
                  onChange={onChange}
                  value={title}
                  onBlur={onBlur}
                />
              );
            }}
          </Validate>
        </div>
        <div
          css={{
            '& .editor-toolbar': {
              background: '#FAFAFA',
            },
          }}
        >
          <div
            className="mb12"
            css={{
              fontWeight: 700,
              fontSize: 16,
              lineHeight: '20px',
            }}
          >
            {t('common.questionBodyLabel')}
          </div>
          <Validate
            validate={[strLength25x30000, required]}
            value={bodyText}
            onChange={onChangeBody}
            position="bottom"
          >
            {({ onChange, onBlur, isValid }) => {
              setIsValidContent(bodyText.length > 24);

              return (
                <div
                  css={{
                    ...(!isValid && {
                      '& .component-text-editor': {
                        border: '1px solid rgb(252,102,85)',
                        boxShadow: '0 0 0 3px rgb(252 102 85 / 40%)',
                      },
                    }),
                  }}
                >
                  <TextEditor locale="en" onChange={onChange} value={bodyText} onBlur={onBlur} />
                </div>
              );
            }}
          </Validate>
        </div>
      </div>
      <div className="df pt24">
        <Button
          variant="secondary"
          className="mr16"
          onClick={onClickCancel}
          disabled={isLoading}
          css={styled.cancelButton}
        >
          {t('common.cancel')}
        </Button>
        <Button
          variant="primary"
          css={{
            background:
              documentationColors.saveDraftButtonBackground || 'var(--color-button-primary)',
            color: documentationColors.saveDraftButtonColor || 'var(--color-white)',
            borderWidth: 0,
            '&:hover .icon': { stroke: 'var(--color-white)' },
          }}
          onClick={onClickSaveDraft}
          disabled={isLoading || !isValidTitle || !isValidContent}
        >
          {t('common.saveToDraft')}
        </Button>
      </div>
    </div>
  );
};

export default DocumentationForm;
