import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { keyframes } from '@emotion/react';
import Dropdown from 'common-components/Dropdown';
import Button from 'common-components/Button';
import SaveIcon from 'icons/Save';
import CloseRoundedIcon from 'icons/CloseRounded';
import TextEditor, { TEXT_EDITOR_CLASSNAME } from 'components/TextEditor';
import DropdownTrigger from './DropdownTrigger';
import TextBlock from 'components/FormFields/TextBlock';

const updateMenu = (documentationMenu) =>
  documentationMenu.map((item) => ({
    label: item.title,
    value: item.id,
    items: updateMenu(item.children),
  }));

const DocumentationForm: React.FC<any> = ({
  editArticleId,
  documentationMenu,
  documentationArticle,
}) => {
  const [title, setTitle] = useState<string>('');
  const [bodyText, setBodyText] = useState<string>('');
  const [parentId, setParentId] = useState<string>('');

  console.log('documentationArticle', documentationArticle);

  useEffect(() => {
    if (
      typeof documentationArticle !== 'undefined' &&
      Object.keys(documentationArticle).length > 0
    ) {
      setBodyText(documentationArticle.content);
      setTitle(documentationArticle.title);
      setParentId(documentationArticle.id);
    }
  }, [documentationArticle]);

  const options = updateMenu(documentationMenu);

  const onSelect = (value) => {
    console.log('value', value);
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
            Documentation root
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
        <Button variant="secondary" className="mr16">
          Cancel
        </Button>
        <Button
          variant="primary"
          css={{
            borderWidth: 0,
            '&:hover .icon': { stroke: 'var(--color-white)' },
          }}
        >
          Save to draft
        </Button>
      </div>
    </div>
  );
};

export default DocumentationForm;
