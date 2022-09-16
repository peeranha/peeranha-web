import { css } from '@emotion/react';
import Icon from 'components/Icon';
import { MAX_NESTING_LEVEL } from 'containers/LeftMenu/constants';
import { styles } from 'containers/LeftMenu/MainLinks.styled';
import AreYouSure from 'containers/ViewQuestion/AreYouSure';
// @ts-ignore
import dotsIcon from 'images/dots.svg?external';
import React, { MouseEventHandler, SyntheticEvent, useState } from 'react';
import { PEER_PRIMARY_COLOR } from 'style-constants';

type DocumentationDropdownProps = {
  id: string;
  dropdownController: Array<Function>;
  redirectToPostDocumentationPage: Function;
  redirectToEditQuestionPage: Function;
  deleteQuestion: Function;
  level: number;
};

const DocumentationDropdown: React.FC<DocumentationDropdownProps> = ({
   id,
   redirectToEditQuestionPage,
   redirectToPostDocumentationPage,
   deleteQuestion,
   dropdownController,
   level,
 }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownOpen = (event: SyntheticEvent) => {
    document.addEventListener(
      'click',
      function() {
        const element = document.getElementById(`dropdown-menu-${id}`);
        // @ts-ignore
        if (!element?.contains(event.target)) setShowDropdown(false);
      },
      { once: true },
    );
    if (!showDropdown) {
      dropdownController[0](false);
      dropdownController[1](() => setShowDropdown);
    }
    setShowDropdown(!showDropdown);
    event.preventDefault();
    event.stopPropagation();
  }

  const newDocumentationOnClick = (event: SyntheticEvent) => {
    redirectToPostDocumentationPage(event, true, id);
    setShowDropdown(false);
    event.preventDefault();
    event.stopPropagation();
  }

  const editDocumentationOnClick = (event: SyntheticEvent) => {
    redirectToEditQuestionPage(
      {
        currentTarget: {
          id: `redirect-to-edit-documentation-${id}`,
          dataset: {
            link: `/documentation/${id}/edit`,
          },
        },
      },
      true,
    );
    setShowDropdown(false);
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <div>
      <div id={`dots-icon`}>
        <Icon
          className="mr-3 ml-2 df aic jsc"
          icon={dotsIcon}
          isTransition={false}
          width="20"
          fill={PEER_PRIMARY_COLOR}
          isColorImportant={true}
          onClick={dropdownOpen}
        />
      </div>

      <div
        id={`dropdown-menu-${id}`}
        className="dropdownMenu"
        css={css`
          position: absolute;
          ${styles.dropdownMenu};
          display: ${showDropdown ? 'block' : 'none'};
        `}
      >
        {Boolean(level < MAX_NESTING_LEVEL) && (
          <div
            id={`redirect-to-create-sub-documentation-${id}`}
            css={css(styles.dropdownMenuItem)}
            onClick={newDocumentationOnClick}
          >
            Add a new sub-article
          </div>
        )}

        <div
          id={`redirect-to-edit-documentation-${id}`}
          css={css(styles.dropdownMenuItem)}
          onClick={editDocumentationOnClick}
        >
          Edit content
        </div>

        {level === MAX_NESTING_LEVEL && (
          <AreYouSure
            submitAction={deleteQuestion.bind(null, id, true)}
            Button={({ onClick }: {onClick: MouseEventHandler<HTMLDivElement>}) => (
              <div
                id={`delete-documentation-${id}`}
                css={css(styles.dropdownMenuItem)}
                onClick={onClick}
              >
                Delete
              </div>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default DocumentationDropdown;
