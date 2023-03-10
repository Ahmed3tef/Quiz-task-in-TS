import React, { FC } from 'react';

const ProgressBar: FC<{
  progress: number;
}> = props => {
  return (
    <div className='text-start w-full'>
      <div className='w-full relative h-[1.3rem] bg-progressGray'>
        <span
          className='bar absolute top-0 left-0 bg-alt h-full'
          style={{
            width: props.progress * 10 + '%',
          }}></span>
      </div>
    </div>
  );
};

export default ProgressBar;
