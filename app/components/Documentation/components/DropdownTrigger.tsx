import React from 'react';
import { graphCommunityColors } from 'utils/communityManagement';

const graphCommunity = graphCommunityColors();

const updateOptions = (options) => {
  const arrayOptions = [];

  options.forEach((item) => {
    arrayOptions.push({
      label: item.label,
      value: item.value,
    });

    if (item.items.length > 0) {
      arrayOptions.push(...updateOptions(item.items));
    }
  });

  return arrayOptions;
};

const DropdownTrigger: React.FC<any> = ({ value, options, placeholder, isDisabled }) => {
  const option = updateOptions(options).find((item) => item.value === value);

  return (
    <button
      className="text-ellipsis"
      css={{
        height: 40,
        width: 328,
        border: `1px solid ${graphCommunity ? '#E1E1E4' : '#C2C6D8'} `,
        borderRadius: '3px',
        padding: '10px 16px',
        fontSize: 16,
        lineHeight: '20px',
        textAlign: 'left',
        '&:disabled': {
          cursor: 'not-allowed',
          backgroundColor: 'rgba(63, 78, 93, 0.02)',
          borderColor: `${graphCommunity ? '#E1E1E4' : 'rgba(0, 0, 0, 0.06)'}`,
          color: `${graphCommunity ? '#E1E1E4' : 'rgba(0, 0, 0, 0.35)'}`,
        },
      }}
      disabled={isDisabled}
    >
      {option?.label || placeholder}
    </button>
  );
};

export default DropdownTrigger;
