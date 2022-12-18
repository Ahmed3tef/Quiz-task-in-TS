import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Rank: FC<{
  rank: number;
}> = props => {
  const [msg, setMsg] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    if (props.rank > 70) return setMsg('Well Done 👌');
    if (props.rank < 70 && props.rank > 50)
      return setMsg('Good Job, you can do better next time😉');
    setMsg('you can do better next time 🙁');
  }, [props.rank]);

  return (
    <div className='rank-container'>
      <p>{msg}</p>
      <p className='flex items-center gap-6'>
        Rank: <span className='text-[3.2rem]'>{+props.rank}%</span>
      </p>
      <button type='button' className='q-cta' onClick={() => navigate('/')}>
        Try Again
      </button>
    </div>
  );
};

export default Rank;
