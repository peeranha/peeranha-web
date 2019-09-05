import { SECTION_ID } from 'containers/PrivacyPolicy/constants';

import {
  getPrivacyPolicy,
  getSectionCode,
  getQuestionCode,
  getIndexes,
} from '../privacyPolicyManagement';

jest.mock(
  'privacy-policy/en.md',
  () =>
    `
<h1>H1</h1>
<h2>H2</h2>
<h3>H3</h3>
<p>Prgr</p>
`,
);

describe('getPrivacyPolicy', () => {
  const expected = {
    blocks: [
      {
        blocks: [
          {
            content: '<p>Prgr</p>',
            h3: 'H3',
            questionCode: 0,
          },
        ],
        h2: 'H2',
        sectionCode: 0,
      },
    ],
    h1: 'H1',
  };

  it('test', () => {
    expect(getPrivacyPolicy('en')).toEqual(expected);
  });
});

describe('getSectionCode', () => {
  it('test with params', () => {
    const sectionIndex = 0;
    const sectionCode = getSectionCode(sectionIndex);

    expect(sectionCode).toBe(`${SECTION_ID}_${sectionIndex}`);
  });

  it('test without params', () => {
    const sectionCode = getSectionCode();
    expect(sectionCode).toBe(`${SECTION_ID}_0`);
  });
});

describe('getQuestionCode', () => {
  it('test with params', () => {
    const sectionIndex = 0;
    const questionIndex = 0;
    const questionCode = getQuestionCode(sectionIndex, questionIndex);

    expect(questionCode).toBe(`${SECTION_ID}_${sectionIndex}_${questionIndex}`);
  });

  it('test without params', () => {
    const questionCode = getQuestionCode();
    expect(questionCode).toBe(`${SECTION_ID}_0_0`);
  });
});

describe('getIndexes', () => {
  const sectionIndex = '0';
  const questionIndex = '0';
  const locationHash = `#${SECTION_ID}_${sectionIndex}_${questionIndex}`;

  it('test', () => {
    expect(getIndexes(locationHash)).toEqual([sectionIndex, questionIndex]);
  });
});
