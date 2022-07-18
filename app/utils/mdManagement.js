import { ApplicationError } from './errors';
import faqEn from '../faq/en.md';
import faqRu from '../faq/ru.md';
import tutorialEn from '../tutorial/en.md';
import tutorialRu from '../tutorial/ru.md';

function parseMD(md) {
  const getRegExp = tag => {
    const str = `<${tag}.*`;
    const regexp = new RegExp(str, 'gim');

    return regexp;
  };

  const getTagText = (txt, tag) => {
    const re = getRegExp(tag);
    const tagText = txt
      .match(re)[0]
      .match(/>(.*?)</gim)[0]
      .replace(/<|>/gim, '');

    return tagText;
  };

  const h1 = getTagText(md, 'h1');

  const getBlocks = (html, level) => {
    const indexes = [];

    const htmlOneLine = html.replace(/(\r\n|\n|\r)/gm, '');

    html.split('').forEach((x, i) => {
      if (
        htmlOneLine[i] === '<' &&
        htmlOneLine[i + 1] === 'h' &&
        +htmlOneLine[i + 2] === +level
      ) {
        indexes.push(i);
      }
    });

    return indexes.map((x, i) =>
      htmlOneLine.slice(indexes[i], indexes[i + 1] || htmlOneLine.length),
    );
  };

  const H2BlocksHTML = getBlocks(md, 2);

  const H2BlocksObject = H2BlocksHTML.map((x, sectionCode) => {
    const h2 = getTagText(x, 'h2');
    const H3BlocksHTML = getBlocks(x, 3);

    const H3BlocksObjects = H3BlocksHTML.map((y, questionCode) => {
      const h3 = getTagText(y, 'h3');
      const H3Html = y.match(/^<h3.+h3>?/)[0];

      const content = y.replace(H3Html, '').trim();

      return { h3, content, questionCode };
    });

    return { h2, blocks: H3BlocksObjects, sectionCode };
  });

  return { h1, blocks: H2BlocksObject };
}

function getMD(prefix, locale) {
  let md = null;

  switch (prefix) {
    case 'faq':
      md = locale === 'en' ? faqEn : faqRu;
      break;
    case 'tutorial':
      md = locale === 'en' ? tutorialEn : tutorialRu;
      break;
    default:
      throw new ApplicationError('There are no passed args');
  }

  return parseMD(md);
}

function getSectionCode(sectionId, sectionIndex = 0) {
  return `${sectionId}_${sectionIndex}`;
}

function getQuestionCode(sectionId, sectionIndex = 0, questionIndex = 0) {
  return `${sectionId}_${sectionIndex}_${questionIndex}`;
}

export { parseMD, getMD, getSectionCode, getQuestionCode };
