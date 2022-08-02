type FaqQuestion = {
  content: string;
  h3: string;
  questionCode: number;
};

type FaqBlock = {
  blocks: Array<FaqQuestion>;
  faqId: string;
  h2: string;
  sectionCode: number;
};

type FaqList = Array<{ blocks: Array<FaqBlock>; h1: string }>;

export default FaqList;
