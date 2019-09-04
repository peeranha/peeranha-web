import { SECTION_ID } from 'containers/Faq/constants';
import { parseMD } from './mdManagement';

/* eslint global-require: 0 */
const getFAQ = locale => {
  let md = null;

  try {
    md = require(`faq/${locale}.md`);
  } catch (err) {
    md = require(`faq/en.md`);
  }

  return parseMD(md);
};

const getSectionCode = sectionIndex => `${SECTION_ID}_${sectionIndex}`;

const getQuestionCode = (sectionIndex, questionIndex) =>
  `${SECTION_ID}_${sectionIndex}_${questionIndex}`;

export { getFAQ, getQuestionCode, getSectionCode };
