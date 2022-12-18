import React, { useEffect, useState } from 'react';
import { ErrorMsg, Quiz, Rank, Spinner } from '../components';

import { loadRank } from '../store/reducers/rank';
import { loadWords } from '../store/reducers/words';
import { useAppDispatch, useAppSelector } from '../store/store';

const Quizzes = () => {
  const dispatch = useAppDispatch();

  const [score, setScore] = useState<number>(0);
  const [showRank, setShowRank] = useState<boolean>(false);

  const words = useAppSelector(state => state.words.words);
  const wordsError = useAppSelector(state => state.words.error);
  const wordsIsLoading = useAppSelector(state => state.words.isLoading);

  const rank = useAppSelector(state => state.rank.rank);
  const rankError = useAppSelector(state => state.rank.error);
  const rankIsLoading = useAppSelector(state => state.rank.isLoading);

  useEffect(() => {
    dispatch(loadWords());
  }, []);

  const fetchRankHandler = () => {
    setShowRank(true);
    dispatch(loadRank({ score }));
  };

  // console.log(words);

  return (
    <div className='page-layout'>
      {/* quiz */}

      {wordsIsLoading && <Spinner />}

      {!wordsIsLoading && wordsError && <ErrorMsg />}

      {!wordsIsLoading && !wordsError && words && !showRank && (
        <Quiz
          data={words}
          setScore={setScore}
          fetchRankHandler={fetchRankHandler}
        />
      )}

      {/* Rank */}

      {rankIsLoading && <Spinner />}

      {!rankIsLoading && rankError && <ErrorMsg />}

      {!rankIsLoading && !rankError && typeof rank === 'number' && showRank && (
        <Rank rank={rank} />
      )}
    </div>
  );
};

export default Quizzes;
