import { SECTION_ID } from 'containers/PrivacyPolicy/constants';
import { parseMD } from './mdManagement';

/* eslint global-require: 0 */
const getPrivacyPolicy = locale => {
  let md = null;

  try {
    md = require(`privacy-policy/${locale}.md`);
  } catch (err) {
    md = require(`privacy-policy/en.md`);
  }

  return parseMD(md);
};

const getSectionCode = (sectionIndex = 0) => `${SECTION_ID}_${sectionIndex}`;

const getQuestionCode = (sectionIndex = 0, questionIndex = 0) =>
  `${SECTION_ID}_${sectionIndex}_${questionIndex}`;

const getIndexes = locationHash =>
  locationHash.replace(`#${SECTION_ID}_`, '').split('_');

export { getPrivacyPolicy, getQuestionCode, getSectionCode, getIndexes };
