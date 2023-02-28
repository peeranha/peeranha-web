import React from 'react';
import { useTranslation } from 'react-i18next';
import { languages } from 'app/i18n';
import Popup from 'common-components/Popup';
import { Flag } from './Styled';
import { styled } from './ChangeLocale.styled';
import { singleCommunityColors } from 'utils/communityManagement';
import ChangeLocaleButton from './ChangeLocaleButton';
import ArrowDownIcon from 'icons/ArrowDown';

const colors = singleCommunityColors();

type ChangeLocalePopupProps = {
  setLocale: () => void;
  locale: string;
  open: boolean;
  setOpen: (isOpen: boolean) => void;
};

const ChangeLocalePopup: React.FC<ChangeLocalePopupProps> = ({
  setLocale,
  locale,
  open,
  setOpen,
}): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <ChangeLocaleButton withTitle locale={locale} />
      <ArrowDownIcon
        className="transform270"
        css={{ color: colors.localeArrowColor || `var(--color-blue)` }}
      />
      {open && (
        <Popup onClose={() => setOpen(false)}>
          <div className="mb-3 df fdc">
            <div className="df aic jcc semi-bold fz24 mb-4">{t(`common.selectLanguage`)}</div>
            {Object.keys(languages).map((item) => (
              <label>
                <input
                  className="dn"
                  type="radio"
                  checked={locale === item}
                  onChange={() => setLocale(item)}
                  css={styled.input}
                />
                <div className="df aic jcsb" css={styled.inputRadio}>
                  <div className="mb-3 df aic ml-3 text-center">
                    <Flag
                      src={`https://images.peeranha.io/languages/${item}_lang.svg`}
                      alt="language"
                    />
                    {t(`common.${item}`)}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </Popup>
      )}
    </>
  );
};
export default ChangeLocalePopup;
