import React from 'react';
import Button from 'components/common/Button';
import SaveIcon from 'icons/Save';
import CloseRoundedIcon from 'icons/CloseRounded';
import Popup from 'common-components/Popup';
import useTrigger from 'hooks/useTrigger';
import { singleCommunityDocumentation } from 'utils/communityManagement';

const documentationColors = singleCommunityDocumentation();

const Header: React.FC<any> = ({
  toggleEditDocumentation,
  saveDocumentationMenu,
  discardDrafts,
}) => {
  const [isOpen, open, close] = useTrigger(false);

  const discardDraftsHandler = () => {
    discardDrafts();
    close();
  };

  return (
    <div
      className="df jcsb aic pl32 pr32 pt12 pb12"
      css={{
        height: 72,
        background: documentationColors.headerBackground || '#A5BCFF',
        color: documentationColors.headerText || 'var(--color-white)',
        fontWeight: 600,
        fontSize: 38,
        lineHeight: '48px',
      }}
    >
      <div>Edit documentation</div>
      <div className="df aic">
        <Button
          variant="third"
          css={{
            background: documentationColors.buttonBackground || 'transparent',
            color: documentationColors.buttonText || 'var(--color-white)',
            borderColor:
              documentationColors.buttonBorder || 'var(--color-white)',
          }}
          icon={
            <CloseRoundedIcon
              className="icon"
              stroke={documentationColors.buttonText}
              css={{ width: 18, height: 18, fill: 'transparent' }}
            />
          }
          className="mr16"
          onClick={toggleEditDocumentation}
        >
          Close
        </Button>
        <Button
          variant="third"
          css={{
            background: documentationColors.buttonBackground || 'transparent',
            color: documentationColors.buttonText || 'var(--color-white)',
            borderColor:
              documentationColors.buttonBorder || 'var(--color-white)',
          }}
          icon={
            <CloseRoundedIcon
              className="icon"
              stroke={documentationColors.buttonText}
              css={{ width: 18, height: 18, fill: 'transparent' }}
            />
          }
          className="mr16"
          onClick={open}
        >
          Discard drafts and close
        </Button>
        <Button
          variant="secondary"
          css={{
            background: documentationColors.publishBackground || 'transparent',
            color: documentationColors.publishText || 'transparent',
            borderWidth: 0,
            '&:hover': {
              background:
                documentationColors.publishBackgroundHover ||
                'var(--color-button-secondary)',
              color:
                documentationColors.publishTextHover || 'var(--color-white)',
              '.icon': {
                stroke:
                  documentationColors.publishTextHover || 'var(--color-white)',
              },
            },
          }}
          icon={
            <SaveIcon
              className="icon"
              css={{
                color: 'transparent',
                stroke: documentationColors.publishText || '#F76F60',
                width: 18,
                height: 18,
              }}
            />
          }
          onClick={saveDocumentationMenu}
        >
          Publish
        </Button>
      </div>
      {isOpen && (
        <Popup size="atom" onClose={close} title="Discard drafts">
          <p
            className="tc"
            css={{
              lineHeight: '20px',
            }}
          >
            If you leave before saving, your changes will not be saved.
          </p>
          <div className="df jcc mt16">
            <Button
              variant="secondary"
              css={{ width: 'calc(50% - 8px) !important' }}
              onClick={close}
            >
              No
            </Button>
            <Button
              css={{ marginLeft: 16, width: 'calc(50% - 8px) !important' }}
              onClick={discardDraftsHandler}
            >
              Yes
            </Button>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default Header;
