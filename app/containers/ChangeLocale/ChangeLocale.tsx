import React from 'react';

import { translationMessages } from 'i18n';

import commonMessages from 'common-messages';
import useTrigger from 'hooks/useTrigger';
import { Flag } from './Styled';
import Span from 'components/Span';
import ArrowDownIcon from 'icons/ArrowDown';

import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

type ChangeLocaleProps = {
  locale: string;
  setOpen?: () => void;
};

const ChangeLocale: React.FC<ChangeLocaleProps> = ({
  locale,
  setOpen,
}): JSX.Element => {
  const [isOpen, open, close] = useTrigger(false);
  document.addEventListener('click', () => {
    if (isOpen) {
      close();
    }
  });
  return (
    <Span
      className="df aic"
      color={colors.linkColor || 'var(--color-gray-dark)'}
      onClick={(event) => {
        event.stopPropagation();
        isOpen ? close() : open();
        setOpen(true);
      }}
    >
      <Flag
        src={require(`images/Language/${[locale]}_lang.svg?inline`)}
        alt="country"
      />
      {translationMessages[locale][commonMessages[locale].id]}
      <ArrowDownIcon
        css={{
          width: 16,
          height: 16,
          transition: 'transform 0.5s',
          ...(isOpen && { transform: 'rotate(180deg)' }),
        }}
        className="ml-1"
      />
    </Span>
  );
};
export default ChangeLocale;
