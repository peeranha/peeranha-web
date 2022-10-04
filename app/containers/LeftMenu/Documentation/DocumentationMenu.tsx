import React, { useEffect, useState } from 'react';
import * as routes from 'routes-config';
import { css } from '@emotion/react';
import { PEER_PRIMARY_COLOR } from 'style-constants';
import DocumentationDropdown from './DocumentationDropdown'
import { DOCUMENTATION_PADDING } from 'containers/LeftMenu/constants';
// @ts-ignore
import arrowDownIcon from 'images/arrowDown.svg?external';
import Icon from 'components/Icon';
import { A1 } from 'containers/LeftMenu/MainLinks';
import { DocumentationSection } from 'pages/Documentation/types';

type DocumentationMenuProps = {
  nestingLevel: number;
  menu: DocumentationSection;
  path: Array<string>;
  activeNodes: Array<string>;
  setActiveNodes: Function;
  redirectToEditQuestionPage: Function;
  redirectToPostDocumentationPage: Function;
  deleteQuestion: Function;
  dropdownController: Array<Function>;
  isModeratorModeSingleCommunity: boolean;
};

// Recursion to the menu structure rendering
const DocumentationMenu: React.FC<DocumentationMenuProps> = ({
 nestingLevel,
 menu,
 path,
 activeNodes,// Menu items to display nesting path
 setActiveNodes,
 redirectToEditQuestionPage,
 redirectToPostDocumentationPage,
 deleteQuestion,
 dropdownController,// Functions to close previous dropdown
 isModeratorModeSingleCommunity,
}) => {
  const [visibleSection, setVisibleSection] = useState(false);

  const { pathname } = window.location;
  const routeArray = pathname.split('/').filter(x => x);
  const pageRoute = routeArray[0];
  const sectionRoute = `${routeArray[0]}/${routeArray[1]}`;
  useEffect(
    () => {
      if (`documentation/${menu.id}` === sectionRoute) {
        setActiveNodes([...path, menu.id]);
      }
      if (
        pageRoute !== 'documentation' ||
        `/${sectionRoute}` === routes.documentationCreate()
      ) {
        setActiveNodes([]);
      }
    },
    [pathname, menu.id],
  );

  if (menu?.children.length) {
    // Documentation item with submenu
    return (
      <div>
        <A1
          to={routes.documentation(menu.id)}
          // @ts-ignore
          name={`documentation/${menu.id}`}
          route={sectionRoute}
          className="df jcsb"
          css={css`
            line-height: 130%;
            padding-left: ${DOCUMENTATION_PADDING * nestingLevel}px;
            font-weight: ${activeNodes.includes(menu.id) ? 'bold' : 'normal'};
            color: ${nestingLevel > 1 &&
          !activeNodes.includes(menu.id)
            ? '#7B7B7B'
            : '#282828'};
            font-size: ${nestingLevel > 1 ? '14px' : '16px'};
          `}
          onClick={() => {
            setVisibleSection(true);
          }}
        >
          <div>{menu.title}</div>
          <div className="df">
            {Boolean(isModeratorModeSingleCommunity) && (
              <DocumentationDropdown
                id={menu.id}
                redirectToEditQuestionPage={redirectToEditQuestionPage}
                redirectToPostDocumentationPage={
                  redirectToPostDocumentationPage
                }
                deleteQuestion={deleteQuestion}
                dropdownController={dropdownController}
                level={nestingLevel}
              />
            )}
            <div
className='df jcc aic' css={css`width: 20px;`} onClick={event => {
              setVisibleSection(!visibleSection);
              event.preventDefault();
              event.stopPropagation();
            }}>
              <Icon
                className="mr-3"
                icon={arrowDownIcon}
                width="16"
                rotate={visibleSection}
                fill={PEER_PRIMARY_COLOR}
                isColorImportant={true}
              />
            </div>

          </div>
        </A1>
        {visibleSection && (
          <div>
            {menu?.children.map(children => (
              <DocumentationMenu
                key={children.id}
                nestingLevel={nestingLevel + 1}
                menu={children}
                path={[...path, menu.id]}
                activeNodes={activeNodes}
                setActiveNodes={setActiveNodes}
                redirectToEditQuestionPage={redirectToEditQuestionPage}
                redirectToPostDocumentationPage={
                  redirectToPostDocumentationPage
                }
                deleteQuestion={deleteQuestion}
                dropdownController={dropdownController}
                isModeratorModeSingleCommunity={isModeratorModeSingleCommunity}
              />
            ))}
          </div>
        )}
      </div>
    );
  } return (
      <div>
        <A1
          to={routes.documentation(menu.id)}
          // @ts-ignore
          name={`documentation/${menu.id}`}
          route={sectionRoute}
          className="df jcsb"
          css={css`
            line-height: 130%;
            padding-left: ${DOCUMENTATION_PADDING * nestingLevel}px;
            font-weight: ${activeNodes.includes(menu.id) ? 'bold' : 'normal'};
            color: ${nestingLevel > 1 &&
          !activeNodes.includes(menu.id)
            ? '#7B7B7B'
            : '#282828'};
            font-size: ${nestingLevel > 1 ? '14px' : '16px'};
          `}
        >
          <div>{menu.title}</div>

          {Boolean(isModeratorModeSingleCommunity) && (
            <DocumentationDropdown
              id={menu.id}
              redirectToEditQuestionPage={redirectToEditQuestionPage}
              redirectToPostDocumentationPage={redirectToPostDocumentationPage}
              deleteQuestion={deleteQuestion}
              dropdownController={dropdownController}
              level={nestingLevel}
            />
          )}
        </A1>
      </div>
    );
};

export default DocumentationMenu;
