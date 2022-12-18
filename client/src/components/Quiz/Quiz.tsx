import React, { FC, useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';

const Quiz: FC<{
  data: { id: number; word: string; pos: string }[];
  setScore: React.Dispatch<React.SetStateAction<number>>;
  fetchRankHandler: () => void;
}> = props => {
  const inCorrectMsg = 'Incorrect answer 😔';
  const correctMsg = 'Good job 🎉👏';

  const [qNumber, setQNumber] = useState<number>(1);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);

  const [answerStatus, setAnswerStatus] = useState<string>(inCorrectMsg);

  const nextQHandler = () => {
    if (props.data.length === qNumber) return;

    setQNumber(prev => prev + 1);
    setIsSelected(false);
    setAnswerStatus(inCorrectMsg);
  };

  const answerHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsSelected(true);

    if (e.currentTarget.value === props.data[qNumber - 1].pos) {
      setAnswerStatus(correctMsg);
      props.setScore(prev => prev + 10);
      return;
    }
  };

  useEffect(() => {
    if (props.data.length === qNumber) {
      setShowResults(true);
    }
  }, [qNumber]);

  return (
    <div className='questions-container'>
      <div className='q-title'>What is the type of this word?</div>

      <div className='q-body'>
        <p className='q-word'>{props.data[qNumber - 1]?.word}</p>
        <div className='flex gap-8'>
          {!isSelected &&
            ['Noun', 'Adverb', 'Adjective', 'Verb'].map((e, i) => (
              <button
                type='button'
                key={i}
                className='q-answer'
                value={e.toLowerCase()}
                onClick={answerHandler}>
                {e}
              </button>
            ))}
          {isSelected && <p>{answerStatus}</p>}
        </div>
      </div>
      <ProgressBar progress={qNumber} />
      <div className='q-footer'>
        <div className='q-number'>
          Q {qNumber} / {props.data.length || 10}
        </div>
        {!showResults && (
          <button type='button' className='q-cta ' onClick={nextQHandler}>
            Next
          </button>
        )}
        {showResults && (
          <button
            type='button'
            className='q-cta '
            onClick={props.fetchRankHandler}>
            View results
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
