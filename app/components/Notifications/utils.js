export const titleConverter = (title) => {
  if (title.length < 46) {
    return title;
  }
  let k = 45;
  switch (title.length) {
    case 46:
      k = 42;
      break;
    case 47:
      k = 43;
      break;
    case 48:
      k = 44;
      break;

    default:
      break;
  }
  const newTitle = title.split('').splice(0, k).join('').trimRight();

  return `${newTitle}....`;
};

export const titleConverterMapper = ({ data, ...rest }) => ({
  ...rest,
  data: {
    ...data,
    title: titleConverter(data.title),
  },
});
