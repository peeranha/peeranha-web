import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SortableTree from 'react-sortable-tree';
import NodeRenderer from './NodeRenderer';
import Button from 'common-components/Button';
import { DocumentationItemMenuType } from 'pages/Documentation/types';
import { singleCommunityDocumentation } from 'utils/communityManagement';
import { styled } from 'components/Documentation/EditDocumentation.styled';

const documentationColors = singleCommunityDocumentation();

type EditOrderProps = {
  documentationMenuDraft: Array<DocumentationItemMenuType>;
  editOrder: () => void;
  saveMenuDraft: (data: Array<DocumentationItemMenuType>) => void;
};

const EditOrder: React.FC<EditOrderProps> = ({
  documentationMenuDraft,
  editOrder,
  saveMenuDraft,
}): JSX.Element => {
  const { t } = useTranslation();
  const [documentationEditOrder, setDocumentationEditOrder] =
    useState<Array<DocumentationItemMenuType>>(documentationMenuDraft);

  const onClickSave = () => {
    saveMenuDraft(documentationEditOrder);
    editOrder();
  };

  return (
    <div
      className="pa full-width full-height"
      css={{
        top: 72,
        left: 0,
        background: 'rgba(0, 0, 0, 0.4)',
        zIndex: 100,

        '& .edit-order-documentation': {
          '& .rst__nodeContent > div > div:first-child': {
            right: 0,
          },

          '& .rst__row': {
            position: 'relative',
            height: 34,
          },

          '& .rst__moveHandle': {
            width: '100%',
            height: 34,
            position: 'absolute',
            top: 0,
            left: 0,
            background: 'transparent',
            border: 0,
            boxShadow: 'none',
          },

          '& .rst__rowContents': {
            border: 0,
            boxShadow: 'none',
          },

          '& .rst__nodeContent': {
            position: 'absolute',
            width: 238,
          },
        },
      }}
    >
      <div
        css={{
          backgroundColor: 'var(--color-white)',
          width: 262,
          height: '100%',
        }}
      >
        <div
          className="df jcsb pt12 pb12 pl16 pr8 fz14"
          css={{
            borderBottom: '1px solid #D8D8D8',
            lineHeight: '18px',
            marginBottom: 10,
          }}
        >
          <div
            className="uppercase"
            css={{
              color: '#7B7B7B',
            }}
          >
            {t('common.documentation')}
          </div>
          <div
            className="pl8 pr8"
            css={{
              color: documentationColors.headerText || 'var(--color-white)',
              backgroundColor: documentationColors.headerBackground || '#7699FF',
              borderRadius: '20px',
            }}
          >
            {t('common.editing')}
          </div>
        </div>
        <SortableTree
          treeData={documentationEditOrder}
          onChange={(treeData: any) => setDocumentationEditOrder(treeData)}
          isVirtualized={false}
          getNodeKey={({ node }) => node.id}
          style={{
            width: 262,
            height: 'calc(100% - 200px)',
          }}
          rowHeight={34}
          className="edit-order-documentation"
          nodeContentRenderer={NodeRenderer}
          scaffoldBlockPxWidth={16}
          maxDepth={3}
        />
        <div
          className="df jcsb p16"
          css={{
            borderTop: '1px solid #D8D8D8',
          }}
        >
          <Button
            variant="secondary"
            className="mr16"
            onClick={editOrder}
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
            onClick={onClickSave}
          >
            {t('common.editQuestion.submitButtonName')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditOrder;
