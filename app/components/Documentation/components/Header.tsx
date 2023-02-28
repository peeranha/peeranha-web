import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
      <div>{t('common.editDocumentation')}</div>
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
          {t('common.close')}
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
          {t('common.discardDraftsAndClose')}
        </Button>
        <Button
          variant="secondary"
          css={{
            background: documentationColors.publishBackground || 'white',
            color:
              documentationColors.publishText ||
              'var(--color-button-secondary)',
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
          {t('common.publish')}
        </Button>
      </div>
      {isOpen && (
        <Popup size="atom" onClose={close} title={t('common.discardDrafts')}>
          <p
            className="tc"
            css={{
              lineHeight: '20px',
            }}
          >
            {t('common.discardDraftsText')}
          </p>
          <div className="df jcc mt16">
            <Button
              variant="secondary"
              css={{ width: 'calc(50% - 8px) !important' }}
              onClick={close}
            >
              {t('common.no')}
            </Button>
            <Button
              css={{ marginLeft: 16, width: 'calc(50% - 8px) !important' }}
              onClick={discardDraftsHandler}
            >
              {t('common.yes')}
            </Button>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default Header;
