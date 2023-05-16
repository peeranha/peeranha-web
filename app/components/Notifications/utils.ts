export const titleConverter = (title: string): string => {
  const MAX_LENGTH = 46;
  if (!title) {
    return '....';
  }
  if (title.length <= MAX_LENGTH) {
    return title;
  }
  return `${title.slice(0, MAX_LENGTH - 3).trimRight()}...`;
};

export const titleConverterMapper = ({ data, ...rest }: Notification): Notification => ({
  ...rest,
  data: {
    ...data,
    title: titleConverter(data.title),
  },
});
