import React from 'react';

import { Navigate, Route, Routes } from 'react-router';
import { Quizzes } from './pages';

const App = () => {
  return (
    <main>
      <Routes>
        <Route path='/' element={<Navigate to='/quizzes' />} />
        <Route path='/quizzes' element={<Quizzes />} />
      </Routes>
    </main>
  );
};

export default App;
