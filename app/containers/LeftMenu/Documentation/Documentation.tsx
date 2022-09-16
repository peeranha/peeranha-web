import { css } from '@emotion/react';
import { styles } from 'containers/LeftMenu/MainLinks.styled';
import messages from 'common-messages';
import Icon from 'components/Icon';
import { PEER_PRIMARY_COLOR } from 'style-constants';
import DocumentationMenu from 'containers/LeftMenu/Documentation/DocumentationMenu';
import React, { useState } from 'react';
// @ts-ignore
import dotsIcon from 'images/dots.svg?external';
// @ts-ignore
import { FormattedMessage } from 'react-intl';
import { DocumentationSection } from 'containers/DocumentationPage/types';

type DocumentationMenuSectionProps = {
  documentationMenu: Array<DocumentationSection>;
  isModeratorModeSingleCommunity: boolean;
  redirectToPostDocumentationPage: Function;
  redirectToEditQuestionPage: Function;
  deleteQuestion: Function;
};

const Documentation: React.FC<DocumentationMenuSectionProps> = ({
 documentationMenu,
 isModeratorModeSingleCommunity,
 redirectToPostDocumentationPage,
 redirectToEditQuestionPage,
 deleteQuestion,
}) => {
  const [activeNodes, setActiveNodes] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showOtherDropdown, changeFocusedDropdown] = useState(
    () => setShowDropdown,
  );
  return (
    <>
      <div css={css(styles.divider)} />
      <div id="documentationSection" className="mt28">
        <div className="df jcsb" css={css(styles.menuSectionTitle)}>
          <FormattedMessage {...messages.documentation} />
          {Boolean(isModeratorModeSingleCommunity) && (
            <div
              css={css`
                #dots-icon {
                  visibility: hidden;
                }
                :hover #dots-icon {
                  visibility: visible;
                }
              `}
            >
              <div id="dots-icon">
                <Icon
                  className="mr-3 ml-2"
                  icon={dotsIcon}
                  width="20"
                  fill={PEER_PRIMARY_COLOR}
                  isColorImportant={true}
                  onClick={event => {
                    document.addEventListener(
                      'click',
                      function(event) {
                        const element = document.getElementById(
                          `dropdown-menu`,
                        );
                        // @ts-ignore
                        if (!element?.contains(event.target))
                          setShowDropdown(false);
                      },
                      { once: true },
                    );
                    if (!showDropdown) {
                      showOtherDropdown(false);
                      changeFocusedDropdown(() => setShowDropdown);
                    }
                    setShowDropdown(!showDropdown);
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                />
              </div>
              <div
                className="dropdownMenu"
                id="dropdown-menu"
                css={css`
                  position: absolute;
                  ${styles.dropdownMenu}
                  display: ${showDropdown ? 'block' : 'none'};
                `}
              >
                <div
                  css={css(styles.dropdownMenuItem)}
                  onClick={event => {
                    redirectToPostDocumentationPage(event, true);
                    setShowDropdown(false);
                  }}
                >
                  Add new article
                </div>
                <div css={css(styles.dropdownMenuItem)}>Edit order</div>
              </div>
            </div>
          )}
        </div>

        <div>
          {Boolean(documentationMenu) &&
            documentationMenu.map(documentationSection => (
              <DocumentationMenu
                key={documentationSection.id}
                nestingLevel={1}
                menu={documentationSection}
                path={[]}
                activeNodes={activeNodes}//Menu items to display nesting path
                setActiveNodes={setActiveNodes}
                redirectToEditQuestionPage={redirectToEditQuestionPage}
                redirectToPostDocumentationPage={
                  redirectToPostDocumentationPage
                }
                deleteQuestion={deleteQuestion}
                dropdownController={[
                  showOtherDropdown,
                  changeFocusedDropdown,
                ]}//Functions to close previous dropdown
                isModeratorModeSingleCommunity={
                  isModeratorModeSingleCommunity
                }
              />
            ))}
        </div>
      </div>
    </>
  )
}

export default Documentation;
