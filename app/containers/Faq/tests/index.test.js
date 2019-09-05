import { Faq } from '../index';

const faq = {
  h1: 'h1',
  blocks: [
    {
      h2: 'h2',
      blocks: [
        {
          h3: 'h3',
          content: 'content',
        },
      ],
    },
  ],
};

describe('<Faq />', () => {
  it('test', () => {
    expect(Faq({ locale: 'en', faq })).toMatchSnapshot();
  });
});
