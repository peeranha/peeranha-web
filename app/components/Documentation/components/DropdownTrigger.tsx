import React from 'react';

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

const DropdownTrigger: React.FC<any> = ({ value, options, placeholder }) => {
  const option = updateOptions(options).find((item) => item.value === value);

  return (
    <div
      css={{
        height: 40,
        width: 328,
        border: '1px solid #C2C6D8',
        borderRadius: '3px',
        padding: '10px 16px',
        fontSize: 16,
        lineHeight: '20px',
      }}
    >
      {option?.label || placeholder}
    </div>
  );
};

export default DropdownTrigger;
