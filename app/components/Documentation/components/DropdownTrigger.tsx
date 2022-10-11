import React from 'react';

const DropdownTrigger: React.FC<any> = ({
  value,
  options,
  placeholder,
  items,
}) => {
  const option = options.find((item) => item.value === value);

  console.log('items', options, option, value, items);

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
