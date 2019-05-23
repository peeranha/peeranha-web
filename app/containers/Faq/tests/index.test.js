import { Faq } from '../index';

jest.mock('utils/faqManagement', () => ({
  getFAQ: jest.fn().mockImplementation(() => ({
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
  })),
}));

describe('<Faq />', () => {
  it('test', () => {
    expect(Faq({ locale: 'en' })).toMatchSnapshot();
  });
});
