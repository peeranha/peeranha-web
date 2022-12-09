import { useState } from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';

const EditOrder = ({ documentationMenuDraft }) => {
  const [documentationEditOrder, setDocumentationEditOrder] = useState<any>(
    documentationMenuDraft,
  );

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
          }}
        >
          <div
            className="uppercase"
            css={{
              color: '#7B7B7B',
            }}
          >
            Documentation
          </div>
          <div
            className="pl8 pr8"
            css={{
              color: 'var(--color-white)',
              backgroundColor: '#7699FF',
              borderRadius: '20px',
            }}
          >
            Editing
          </div>
        </div>
        <SortableTree
          treeData={documentationEditOrder}
          onChange={(treeData: any) => setDocumentationEditOrder(treeData)}
          isVirtualized={false}
          getNodeKey={({ node }) => node.id}
          style={{
            width: 262,
            height: '100%',
          }}
          rowHeight={34}
          className="edit-order-documentation"
        />
      </div>
    </div>
  );
};

export default EditOrder;
