import { getFAQ } from '../faqManagement';

jest.mock(
  'faq/en.md',
  () =>
    `
<h1>H1</h1>
<h2>H2</h2>
<h3>H3</h3>
<p>Prgr</p>
`,
);

describe('getFaq', () => {
  const expected = {
    blocks: [{ blocks: [{ content: '<p>Prgr</p>', h3: 'H3' }], h2: 'H2' }],
    h1: 'H1',
  };

  it('test', () => {
    expect(getFAQ('en')).toEqual(expected);
  });
});
