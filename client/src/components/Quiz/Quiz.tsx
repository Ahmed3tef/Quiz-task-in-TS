import React, { FC, useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';

const Quiz: FC<{
  data: { id: number; word: string; pos: string }[];
  setScore: React.Dispatch<React.SetStateAction<number>>;
  fetchRankHandler: () => void;
}> = props => {
  const inCorrectMsg = 'Incorrect answer 😔';
  const correctMsg = 'Good job 🎉👏';

  // question number state
  const [qNumber, setQNumber] = useState<number>(1);

  // isSelected to handle showing btns or msg
  const [isSelected, setIsSelected] = useState<boolean>(false);

  // state to show view results btn.
  const [showResults, setShowResults] = useState<boolean>(false);

  // msg state
  const [answerStatus, setAnswerStatus] = useState<string>(inCorrectMsg);

  // correct answers state
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);

  const nextQHandler = () => {
    // to stop increasing number if it reaches the end of qs list.
    if (props.data.length === qNumber) return;

    // increase number and reset other states
    setQNumber(prev => prev + 1);
    setIsSelected(false);
    setAnswerStatus(inCorrectMsg);
  };

  const answerHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    // to show msg instead of btns
    setIsSelected(true);

    // i stored the value of q answer in btn value and here I check for equality
    if (e.currentTarget.value === props.data[qNumber - 1].pos) {
      setAnswerStatus(correctMsg);
      // increase correct answers
      setCorrectAnswers(prev => prev + 1);
    }
  };

  useEffect(() => {
    // when reaches the final q show view results btn
    if (props.data.length === qNumber) {
      setShowResults(true);
    }
  }, [qNumber]);

  useEffect(() => {
    // set score
    props.setScore((correctAnswers / props.data.length) * 100);
  }, [correctAnswers]);

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
