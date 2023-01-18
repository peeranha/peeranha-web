import React from 'react';

import { translationMessages, appLocales } from 'i18n';

import commonMessages from 'common-messages';

import { Flag } from './Styled';
import Span from 'components/Span';
import SelectedArrow from 'icons/SelectedArrow';

import Dropdown from 'components/common/Dropdown';
import { singleCommunityColors } from 'utils/communityManagement';

import ChangeLocale from './ChangeLocale';

const colors = singleCommunityColors();

type ChangeLocaleDropdownProps = {
  setLocale: () => void;
  locale: string;
};

const ChangeLocaleDropdown: React.FC<ChangeLocaleDropdownProps> = ({
  setLocale,
  locale,
}): JSX.Element => {
  const optionsType = appLocales.map((item) => {
    const isChecked = item === locale;
    return {
      label: (
        <Span
          className="ds aic jcsb"
          css={{
            color: isChecked && (colors.linkColor || 'var(--color-blue)'),
          }}
        >
          {translationMessages[item][commonMessages[item].id]}
          <SelectedArrow
            className="ml-2"
            css={{ path: { fill: 'none' } }}
            stroke={isChecked ? 'var(--color-blue)' : 'none'}
          />
        </Span>
      ),
      value: item,
      icon: (
        <Flag
          css={{
            width: '18px',
            height: '18px',
            border: '1px solid var(--color-black)',
          }}
          src={require(`images/Language/${[item]}_lang.svg?inline`)}
          alt="country"
        />
      ),
    };
  });
  return (
    <Dropdown
      trigger={<ChangeLocale locale={locale} />}
      options={optionsType}
      isMultiple={false}
      isEqualWidth={false}
      onSelect={(value) => setLocale(value)}
    />
  );
};
export default ChangeLocaleDropdown;
