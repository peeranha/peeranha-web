import React, { useEffect, useRef } from 'react';
import ChatFragment from 'containers/AISearch/Components/ChatFragment';
import ScrollContainer from 'components/ScrollContainer';

type Props = {
  questions: string[];
  answers: { answer: string; resources: { url: string; title: string }[] }[];
  answerFinished: boolean;
  onAskInCommunityHandler: () => void;
};

const ChatSection: React.FC<Props> = ({
  questions,
  answers,
  answerFinished,
  onAskInCommunityHandler,
}): JSX.Element => {
  const endOfPageRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (endOfPageRef.current) {
      endOfPageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [questions, answers]);
  return (
    <ScrollContainer preventDefault={false}>
      {questions.map(
        (question: string, index): React.ReactElement => (
          <>
            <ChatFragment
              index={index}
              question={question}
              answer={answers[index]}
              answerNotFinished={!answerFinished && index === questions.length - 1}
              onAskInCommunityHandler={onAskInCommunityHandler}
            />
          </>
        ),
      )}
      <div ref={endOfPageRef} />
    </ScrollContainer>
  );
};

export default ChatSection;
