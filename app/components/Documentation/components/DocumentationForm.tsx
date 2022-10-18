import React, { useRef, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Dropdown from 'common-components/Dropdown';
import Button from 'common-components/Button';
import TextEditor from 'components/TextEditor';
import DropdownTrigger from './DropdownTrigger';
import TextBlock from 'components/FormFields/TextBlock';
import { saveText, getText } from 'utils/ipfs';
import {
  saveDraft,
  initMenu,
  getSavedDraft,
  addArticle,
  getSavedDrafts,
  updateMenuDraft,
} from '../helpers';

const DocumentationForm: React.FC<any> = ({
  documentationMenu,
  documentationArticle,
  articleParentId,
  updateDocumentationMenuDraft,
  setEditDocumentation,
  setEditArticle,
}) => {
  const [title, setTitle] = useState<string>('');
  const [bodyText, setBodyText] = useState<string>('');
  const [parentId, setParentId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log('documentationArticle', documentationArticle);

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

  const onChangeTitle = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(value);
  };

  const onChangeBody = (value: string) => {
    setBodyText(value);
  };

  const onClickSaveDraft = () => {
    setIsLoading(true);

    saveText(JSON.stringify({ title, content: bodyText }))
      .then((ipfsHash) => {
        const isEdit =
          typeof documentationArticle !== 'undefined' &&
          documentationArticle.id !== '';
        let updatedMenu;

        // saveDraft({
        //   id: ipfsHash,
        //   prevId: documentationArticle?.id || ipfsHash,
        //   parentId,
        //   title,
        //   isEdit,
        // });

        console.log('documentationArticle', documentationArticle);

        if (!documentationArticle) {
          console.log('addArticle');
          updatedMenu = addArticle(documentationMenu, {
            id: ipfsHash,
            parentId,
            title,
          });
        }

        if (isEdit) {
          console.log('updateMenuDraft');
          updatedMenu = updateMenuDraft(documentationMenu, {
            id: ipfsHash,
            parentId,
            title,
            prevId: documentationArticle?.id,
          });
        }

        saveDraft(updatedMenu);

        updateDocumentationMenuDraft(updatedMenu);
        setEditDocumentation({ id: ipfsHash, parentId: '' });
        setEditArticle(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onClickCancel = () => {
    setEditDocumentation(documentationArticle.id, '');
    setEditArticle(false);
  };

  return (
    <div className="p32">
      <div
        className="mb24"
        css={{
          fontWeight: 700,
          fontSize: 24,
          lineHeight: '30px',
        }}
      >
        Entering data
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
            Sub-article of
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
            Title
          </div>
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
            }}
            placeholder="Title"
            onChange={onChangeTitle}
            value={title}
          />
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
            Body
          </div>
          <TextEditor locale="en" onChange={onChangeBody} value={bodyText} />
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
            Preview
          </div>
          <div
            css={{
              borderTop: '1px dashed #DCDCDC',
              borderBottom: '1px dashed #DCDCDC',
              padding: '11px 0',
            }}
          >
            {bodyText !== '' ? (
              <TextBlock className="my-2" content={bodyText} />
            ) : (
              <div
                className="fz14"
                css={{
                  lineHeight: '18px',
                  color: '#7B7B7B',
                }}
              >
                Nothting to see yet
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="df pt24">
        <Button
          variant="secondary"
          className="mr16"
          onClick={onClickCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          css={{
            borderWidth: 0,
            '&:hover .icon': { stroke: 'var(--color-white)' },
          }}
          onClick={onClickSaveDraft}
          disabled={isLoading}
        >
          Save to draft
        </Button>
      </div>
    </div>
  );
};

export default DocumentationForm;
