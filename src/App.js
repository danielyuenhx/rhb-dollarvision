import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Overview from './pages/overview/overview';
import PiggyBank from './pages/piggyBank/piggyBank';
import Wrapper from './components/wrapper';
import { Box } from '@chakra-ui/react';
import Wallet from './pages/wallet/wallet';
import Budget from './pages/budget/budget';
import Gamification from './pages/gamification/gamification';
import Profile from './pages/profile/profile';
import Dashboard from './pages/dashboard/dashboard';

function App() {
  return (
    <Box bgColor="backgroundColor">
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Wrapper />}>
          <Route index element={<Dashboard />} />
          <Route path="overview" element={<Overview />} />
          <Route path="piggybank" element={<PiggyBank />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="budget" element={<Budget />} />
          {/* <Route path="rewards" element={<Gamification />} /> */}
          <Route path="summary" element={<Profile />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
