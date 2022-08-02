import { marked } from 'marked';
import { takeLatest, call, put } from 'redux-saga/effects';
import { getFaqError, getFaqSuccess } from 'containers/Faq/actions';
import { GET_FAQ } from 'containers/Faq/constants';
import { parseMD } from 'utils/mdManagement';

import { getFaqByCommunityId } from 'utils/theGraph';

export function* getFaqWorker({
  communityIdFilter,
}: {
  communityIdFilter: number;
}) {
  try {
    const faqList = yield call(getFaqByCommunityId, communityIdFilter);
    const faqMD = faqList.reduce(
      (acc: string, cur: { title: string; content: string }) => {
        return acc + `\n## ${cur.title}\n` + cur.content;
      },
      '',
    );
    const faq = faqMD.length
      ? parseMD(
          '<h1 id="frequently-asked-questions">Frequently Asked Questions</h1>' +
            marked.parse(faqMD),
        )
      : '';
    faq.blocks = faq.blocks.map((section: { sectionCode: number }) => {
      return {
        ...section,
        faqId: faqList[section.sectionCode].id,
      };
    });
    yield put(getFaqSuccess(faq));
  } catch (err) {
    yield put(getFaqError(err));
  }
}

export default function*() {
  yield takeLatest(GET_FAQ, getFaqWorker);
}
