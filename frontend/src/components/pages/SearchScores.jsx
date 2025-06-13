import { useState } from 'react';
import Sidebar from '../layouts/Sidebar';
import Header from '../layouts/Header';
import UserRegistration from '../UserRegistration';
import DetailedScores from '../DetailedScores';
import MainLayout from '../layouts/MainLayout';

const SearchScores = () => {
  const [scoreData, setScoreData] = useState(null);

  return (
    <MainLayout>
      <UserRegistration setScoreData={setScoreData} />
      <DetailedScores scoreData={scoreData} />
    </MainLayout>
  );
};

export default SearchScores;
